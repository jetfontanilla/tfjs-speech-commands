import { h } from 'preact';
import style from './style.css';
const tf = require('@tensorflow/tfjs');
const speechCommands = require('@tensorflow-models/speech-commands');

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

loadRecognizer();
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
	console.log(wordLabels[wordIndex]);
}, {
	includeSpectrogram: false,
	probabilityThreshold: 0.75
});

// Stop the recognition in 10 seconds.
setTimeout(() => recognizer.stopListening(), 10e3);

const Home = () => (
	<div class={style.home}>
		<h1>Home</h1>
		<p>This is the Home component.</p>
	</div>
);

export default Home;
