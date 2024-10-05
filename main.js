// main.js
let array = [];
let steps = []; // Store each step of the sorting process
let currentStep = 0;
let interval = null;
let isPlaying = false;
const arrayContainer = document.getElementById('array');
let selectedSortAlgorithm = 'bubble'; // Default sorting algorithm

function generateArray(size = 5) {
    array = [];
    arrayContainer.innerHTML = '';
    sortedIndicesPerStep = []; // Clear sorted indices per step when resetting array

    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 100) + 1;
        array.push(value);

        let numberElement = document.createElement('span');
        numberElement.classList.add('num');
        numberElement.innerText = value;
        arrayContainer.appendChild(numberElement);
    }

    // Reset sorting steps and state
    steps = []; // Clear steps on new array generation
    currentStep = 0;
    clearInterval(interval);
    isPlaying = false;
    document.getElementById('play-pause-btn').innerText = 'Play';

    // Call the selected sorting algorithm to compute steps
    selectSort(selectedSortAlgorithm);
}

// Handle the sorting algorithm selection from the dropdown
function selectSort(algorithm) {
    selectedSortAlgorithm = algorithm; // Update the selected algorithm
    clearInterval(interval); // Stop any ongoing animation
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

    displayStep(0); // Display the first step
}

// Play the animation automatically
function play() {
    if (currentStep < steps.length) {
        interval = setInterval(() => {
            displayStep(currentStep);
            currentStep++;
            if (currentStep >= steps.length) {
                clearInterval(interval);
                document.getElementById('play-pause-btn').innerText = 'Play';
                isPlaying = false;
            }
        }, 500);
    }
}

// Toggle between Play and Pause
function togglePlayPause() {
    if (isPlaying) {
        clearInterval(interval);
        document.getElementById('play-pause-btn').innerText = 'Play';
        isPlaying = false;
    } else {
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
    generateArray(); // Generate a new array
    selectSort(selectedSortAlgorithm); // Automatically select Bubble Sort
};
