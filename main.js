// main.js
let array = [];
let steps = [];
let currentStep = 0;
let interval = null;
let isPlaying = false;
let selectedAlgorithm = 'bubble';
let speed = 1;
let isSearchAlgorithm = false;

const arrayContainer = document.getElementById('array');
const currentAlgorithmDisplay = document.getElementById('current-algorithm');
const speedSlider = document.getElementById('speed-slider');
const speedValueDisplay = document.getElementById('speed-value');
const playPauseButton = document.getElementById('play-pause-btn');

function generateArray(size = 5) {
    array = [];
    arrayContainer.innerHTML = '';
    sortedIndicesPerStep = [];
    steps = [];
    currentStep = 0;

    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 100) + 1;
        array.push(value);

        let numberElement = document.createElement('span');
        numberElement.classList.add('num');
        numberElement.innerText = value;
        arrayContainer.appendChild(numberElement);
    }

    resetPlayState();

    // After generating the array, determine if it's a search or sort algorithm to run
    (isSearchAlgorithm ? selectSearch : selectSort)(selectedAlgorithm);
}

// Reset the play state
function resetPlayState() {
    clearInterval(interval);
    isPlaying = false;
    playPauseButton.innerText = 'Play';
}

function selectAlgorithm(algorithm, type) {
    isSearchAlgorithm = (type === 'search');
    selectedAlgorithm = algorithm;

    // Update display
    const formattedAlgorithm = algorithm.charAt(0).toUpperCase() + algorithm.slice(1).replace('-', ' ');
    currentAlgorithmDisplay.innerText = `Current Algorithm: ${formattedAlgorithm}`;

    // Stop any ongoing animation and reset steps
    resetPlayState();
    steps = [];
    currentStep = 0;

    // Compute the steps based on the algorithm type
    if (type === 'sort') {
        switch (algorithm) {
            case 'bubble':
                computeBubbleSortSteps(array);
                break;
            case 'selection':
                computeSelectionSortSteps(array);
                break;
            case 'insertion':
                computeInsertionSortSteps(array);
                break;
            case 'merge':
                computeMergeSortSteps(array);
                break;
            default:
                console.log('Sorting algorithm not implemented');
        }

        // Display the first sorting step (if any)
        if (steps.length > 0) {
            if (algorithm != 'merge'){
                displayStep(0);
            }
            else {
                displayMergeSortStep(0);
            }
        }
    } else if (type === 'search') {
        switch (algorithm) {
            case 'linear':
                computeLinearSearchSteps(array);
                break;
            default:
                console.log('Search algorithm not implemented');
        }

        // Display the first search step (if any)
        if (steps.length > 0) {
            displaySearchStep(0);
        }
    }
}

function selectSort(algorithm) {
    selectAlgorithm(algorithm, 'sort');
}

function selectSearch(algorithm) {
    selectAlgorithm(algorithm, 'search');
}

// Update the speed of the animation based on the slider value
function updateSpeed(value) {
    speed = parseFloat(value);
    speedValueDisplay.innerText = `Speed: ${speed}x`;
    if (speed === 0) {
        resetPlayState();
    } else if (isPlaying) {
        clearInterval(interval);
        play();
    }
}

// Play the animation automatically
function play() {
    if (steps.length > 0 && currentStep < steps.length) {
        let displayFunction;

        if (isSearchAlgorithm) {
            displayFunction = displaySearchStep;
        } else if (selectedAlgorithm === 'merge') {
            displayFunction = displayMergeSortStep;
        } else {
            displayFunction = displayStep;
        }

        interval = setInterval(() => {
            displayFunction(currentStep);
            currentStep++;
            if (currentStep >= steps.length) {
                resetPlayState();
            }
        }, 500 / speed);
    }
}

// Toggle between Play and Pause
function togglePlayPause() {
    if (isPlaying) {
        resetPlayState();
    } else {
        if (speed === 0) {
            speed = 0.5;
            speedSlider.value = speed;
            speedValueDisplay.innerText = `Speed: ${speed}x`;
        }

        playPauseButton.innerText = 'Pause';
        isPlaying = true;
        play();
    }
}

// Go to the previous step
function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        let displayFunction;
        
        if (isSearchAlgorithm) {
            displayFunction = displaySearchStep;
        } else if (selectedAlgorithm === 'merge') {
            displayFunction = displayMergeSortStep;
        } else {
            displayFunction = displayStep;
        }
        displayFunction(currentStep);

        if (isPlaying) {
            resetPlayState();
        }
    }
}

// Go to the next step
function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        let displayFunction;
        
        if (isSearchAlgorithm) {
            displayFunction = displaySearchStep;
        } else if (selectedAlgorithm === 'merge') {
            displayFunction = displayMergeSortStep;
        } else {
            displayFunction = displayStep;
        }
        displayFunction(currentStep);

        if (isPlaying) {
            resetPlayState();
        }
    }
}

// Initialize the array and sorting steps on page load
window.onload = generateArray();
