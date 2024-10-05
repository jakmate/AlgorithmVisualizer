// main.js
let array = [];
let steps = [];
let currentStep = 0;
let interval = null;
let isPlaying = false;
const arrayContainer = document.getElementById('array');
// Reference to the current algorithm display
const currentAlgorithmDisplay = document.getElementById('current-algorithm');
// Reference to the speed slider
const speedSlider = document.getElementById('speed-slider');
// Reference to the speed value display
const speedValueDisplay = document.getElementById('speed-value');
// Default sorting algorithm
let selectedSortAlgorithm = 'bubble';
// Initial speed
let speed = parseFloat(speedSlider.value);

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

    // Reset sorting steps and state
    steps = [];
    currentStep = 0;
    clearInterval(interval);
    isPlaying = false;
    document.getElementById('play-pause-btn').innerText = 'Play';

    // Call the selected sorting algorithm to compute steps
    selectSort(selectedSortAlgorithm);
}

// Handle the sorting algorithm selection from the dropdown
function selectSort(algorithm) {
    selectedSortAlgorithm = algorithm;
    // Update display
    currentAlgorithmDisplay.innerText = `Current Algorithm: ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1).replace('-', ' ')}`; // Update display
    // Stop any ongoing animation
    clearInterval(interval);
    isPlaying = false;
    document.getElementById('play-pause-btn').innerText = 'Play';

    // Clear existing steps
    steps = [];
    currentStep = 0;

    // Determine the selected sorting algorithm and compute steps accordingly
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
        // Add quick sort and merge sort in the future
        default:
            console.log('Algorithm not implemented');
    }

    // Display the first step
    displayStep(0);
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
    if (currentStep < steps.length) {
        // If speed is zero, stop the animation
        if (speed === 0) {
            clearInterval(interval);
            document.getElementById('play-pause-btn').innerText = 'Play';
            isPlaying = false;
            return;
        }

        interval = setInterval(() => {
            displayStep(currentStep);
            currentStep++;
            if (currentStep >= steps.length) {
                clearInterval(interval);
                document.getElementById('play-pause-btn').innerText = 'Play';
                isPlaying = false;
            }
        }, 500/speed);
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
            // Update slider position
            document.getElementById('speed-slider').value = speed;
            // Update displayed speed
            speedValueDisplay.innerText = `Speed: ${speed}x`;
        }

        document.getElementById('play-pause-btn').innerText = 'Pause';
        isPlaying = true;
        play();
    }
}

// Go to the previous step
function previousStep() {
    if (currentStep > 0) {
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
    if (currentStep < steps.length - 1) {
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
    selectSort(selectedSortAlgorithm);
};
