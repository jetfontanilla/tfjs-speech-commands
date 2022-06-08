import style from "./style.css";
import { useEffect, useState } from "preact/hooks";
import Grid from "../../components/grid";

const tf = require("@tensorflow/tfjs");
const speechCommands = require("@tensorflow-models/speech-commands");

const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";
const DIRECTION_LEFT = "left";
const DIRECTION_RIGHT = "right";

const Home = () => {
    const GRID_SIZE = 5;

    const [isRecording, setRecording] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [position, setPosition] = useState([2, 2]);
    const [wordLabels, setWordlabels] = useState([]);

    // When calling `create()`, you must provide the type of the audio input.
    // The two available options are `BROWSER_FFT` and `SOFT_FFT`.
    // - BROWSER_FFT uses the browser's native Fourier transform.
    // - SOFT_FFT uses JavaScript implementations of Fourier transform
    //   (not implemented yet).
    const [recognizer, setRecognizer] = useState(speechCommands.create("BROWSER_FFT"))

    let [x, y] = position;

    const loadRecognizer = async() => {
        // Make sure that the underlying model and metadata are loaded via HTTPS
        // requests.
        await recognizer.ensureModelLoaded();

        // See the array of words that the recognizer is trained to recognize.
        setWordlabels(recognizer.wordLabels());
    };

    const startRecording = () => {
        setRecording(true);

        if (recognizer.isListening()) {
            return;
        }

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

            console.log("Recognized Word:", wordLabels[wordIndex]);
            console.log("current position:", [x, y]);

            switch (wordLabels[wordIndex]) {
                case DIRECTION_LEFT:
                    if (x > 0) {
                        x -= 1;
                    }
                    break;
                case DIRECTION_RIGHT:
                    if (x < GRID_SIZE - 1) {
                        x += 1;
                    }
                    break;
                case DIRECTION_UP:
                    if (y > 0) {
                        y -= 1;
                    }
                    break;
                case DIRECTION_DOWN:
                    if (y < GRID_SIZE - 1) {
                        y += 1;
                    }
                    break;
            }
            setPosition([x, y]);
            console.log("next position:", [x, y]);
        }, {
            includeSpectrogram: false,
            probabilityThreshold: 0.75
        });
    };

    const stopRecording = () => {
        if (recognizer.isListening()) {
            recognizer.stopListening();
        }
        setRecording(false);
    };

    useEffect(async() => {
        await loadRecognizer();
        setLoading(false);
    }, [position]);


    return (
        <div class={style.home}>
            {isLoading && <span>Loading...</span>}
            {!isLoading && <p style={{marginBottom: "3em"}}>Click on "Start Recording" and begin speaking the commands. Recognized commands = <em>UP</em>, <em>DOWN</em>, <em>LEFT</em>, <em>RIGHT</em> </p>}
            {!isLoading && <Grid size={GRID_SIZE} position={position}></Grid>}
            {!isLoading && !isRecording &&
            <span class={style.recording} onClick={() => startRecording()}>Start Recording</span>}
            {!isLoading && isRecording &&
            <span class={style.recording + " " + style.stop} onClick={() => stopRecording()}>Stop Recording</span>}
        </div>
    );
};

export default Home;
