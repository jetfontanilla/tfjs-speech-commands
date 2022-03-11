import { h } from 'preact';
import style from './style.css';
import { useEffect, useState } from "preact/hooks";
import Grid from "../../components/grid";
const tf = require('@tensorflow/tfjs');
const speechCommands = require('@tensorflow-models/speech-commands');

const Home = () => {
	const GRID_SIZE = 5;

	const [isRecording, setRecording] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [position, setPosition] = useState([2, 2]);

	// When calling `create()`, you must provide the type of the audio input.
	// The two available options are `BROWSER_FFT` and `SOFT_FFT`.
	// - BROWSER_FFT uses the browser's native Fourier transform.
	// - SOFT_FFT uses JavaScript implementations of Fourier transform
	//   (not implemented yet).
	const recognizer = speechCommands.create('BROWSER_FFT');

	let wordLabels = [];
	const loadRecognizer = async() => {
		// Make sure that the underlying model and metadata are loaded via HTTPS
		// requests.
		await recognizer.ensureModelLoaded();

		// See the array of words that the recognizer is trained to recognize.
		wordLabels = recognizer.wordLabels();
	}

	const startRecording = () => {
		setRecording(true);
		// `listen()` takes two arguments:
		// 1. A callback function that is invoked anytime a word is recognized.
		// 2. A configuration object with adjustable fields such a
		//    - includeSpectrogram
		//    - probabilityThreshold
		//    - includeEmbedding
		recognizer.listen(result => {
			// - result.scores contains the probability scores that correspond to
			//   recognizer.wordLabels().
			// - result.spectrogram contains the spectrogram of the recognized word.
			const max = Math.max(...result.scores);
			const wordIndex = result.scores.indexOf(max);

			let [x, y] = position;
			switch(wordLabels[wordIndex]) {
				case "left":
					if (x > 0) {
						x -= 1;
					}
					break;
				case "right":
					if (x < GRID_SIZE - 1) {
						x += 1;
					}
					break;
				case "up":
					if (y < GRID_SIZE - 1) {
						y += 1;
					}
					break;
				case "down":
					if (y > 0) {
						y -= 1;
					}
					break;
			}
			setPosition([x, y]);
		}, {
			includeSpectrogram: false,
			probabilityThreshold: 0.75
		});
	}

	const stopRecording = () => {
		recognizer.stopListening();
		setRecording(false);
	};

	useEffect(async () => {
		await loadRecognizer();
		setLoading(false);
	}, []);

	return (
		<div class={style.home}>
			{isLoading && <span>Loading...</span>}
			<Grid size={GRID_SIZE}></Grid>
		</div>
	);
}

export default Home;
