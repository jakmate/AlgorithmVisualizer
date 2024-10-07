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

function generateArray(size = 5) {
    array = [];
    arrayContainer.innerHTML = '';
    sortedIndicesPerStep = [];

    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 100) + 1;
        array.push(value);

        let numberElement = document.createElement('span');
        numberElement.classList.add('num');
        numberElement.innerText = value;
        arrayContainer.appendChild(numberElement);
    }

    steps = [];
    currentStep = 0;
    clearInterval(interval);
    isPlaying = false;
    document.getElementById('play-pause-btn').innerText = 'Play';

    // After generating the array, determine if it's a search or sort algorithm to run
    if (isSearchAlgorithm) {
        selectSearch(selectedAlgorithm);
    } else {
        selectSort(selectedAlgorithm);
    }
}

function selectSort(algorithm) {
    isSearchAlgorithm = false;
    selectedAlgorithm = algorithm;

    // Update display
    currentAlgorithmDisplay.innerText = `Current Algorithm: ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1).replace('-', ' ')}`;

    // Stop any ongoing animation
    clearInterval(interval);
    isPlaying = false;
    document.getElementById('play-pause-btn').innerText = 'Play';

    // Clear existing sorting steps
    steps = [];
    currentStep = 0;

    // Compute sorting steps for the selected algorithm
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
        // Add quick sort and merge sort if needed
        default:
            console.log('Algorithm not implemented');
    }

    // Display the first sorting step
    if (steps.length > 0) {
        displayStep(0);
    }
}

function selectSearch(algorithm) {
    isSearchAlgorithm = true;
    selectedAlgorithm = algorithm;

    // Update display
    currentAlgorithmDisplay.innerText = `Current Algorithm: ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1).replace('-', ' ')}`;

    // Stop ongoing animation and reset search steps
    clearInterval(interval);
    isPlaying = false;
    document.getElementById('play-pause-btn').innerText = 'Play';
    steps = [];
    currentStep = 0;

    // Determine the selected search algorithm and compute steps
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

// Update the speed of the animation based on the slider value
function updateSpeed(value) {
    speed = parseFloat(value);
    speedValueDisplay.innerText = `Speed: ${speed}x`;
    if (speed === 0) {
        clearInterval(interval);
        isPlaying = false;
        document.getElementById('play-pause-btn').innerText = 'Play';
    } else if (isPlaying) {
        clearInterval(interval);
        play();
    }
}

// Play the animation automatically
function play() {
    if (isSearchAlgorithm && steps.length > 0) {
        if (currentStep < steps.length) {
            interval = setInterval(() => {
                displaySearchStep(currentStep);
                currentStep++;
                if (currentStep >= steps.length) {
                    clearInterval(interval);
                    document.getElementById('play-pause-btn').innerText = 'Play';
                    isPlaying = false;
                }
            }, 500 / speed);
        }
    } else if (!isSearchAlgorithm && steps.length > 0) {
        if (currentStep < steps.length) {
            interval = setInterval(() => {
                displayStep(currentStep);
                currentStep++;
                if (currentStep >= steps.length) {
                    clearInterval(interval);
                    document.getElementById('play-pause-btn').innerText = 'Play';
                    isPlaying = false;
                }
            }, 500 / speed);
        }
    }
}

// Toggle between Play and Pause
function togglePlayPause() {
    if (isPlaying) {
        clearInterval(interval);
        document.getElementById('play-pause-btn').innerText = 'Play';
        isPlaying = false;
    } else {
        if (speed === 0) {
            speed = 0.5;
            document.getElementById('speed-slider').value = speed;
            speedValueDisplay.innerText = `Speed: ${speed}x`;
        }

        document.getElementById('play-pause-btn').innerText = 'Pause';
        isPlaying = true;
        play();
    }
}

// Go to the previous step
function previousStep() {
    if (isSearchAlgorithm && currentStep > 0) {
        currentStep--;
        displaySearchStep(currentStep);
        if (isPlaying) {
            clearInterval(interval);
            document.getElementById('play-pause-btn').innerText = 'Play';
            isPlaying = false;
        }
    } else if (!isSearchAlgorithm && currentStep > 0) {
        currentStep--;
        displayStep(currentStep);
        if (isPlaying) {
            clearInterval(interval);
            document.getElementById('play-pause-btn').innerText = 'Play';
            isPlaying = false;
        }
    }
}

// Go to the next step
function nextStep() {
    if (isSearchAlgorithm && currentStep < steps.length - 1) {
        currentStep++;
        displaySearchStep(currentStep);
        if (isPlaying) {
            clearInterval(interval);
            document.getElementById('play-pause-btn').innerText = 'Play';
            isPlaying = false;
        }
    } else if (!isSearchAlgorithm && currentStep < steps.length - 1) {
        currentStep++;
        displayStep(currentStep);
        if (isPlaying) {
            clearInterval(interval);
            document.getElementById('play-pause-btn').innerText = 'Play';
            isPlaying = false;
        }
    }
}

// Initialize the array and sorting steps on page load
window.onload = function () {
    generateArray();
    if (isSearchAlgorithm) {
        selectSearch(selectedAlgorithm);
    } else {
        selectSort(selectedAlgorithm);
    }
};
