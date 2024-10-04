let array = [];
let steps = []; // Store each step of the sorting process
let currentStep = 0;
let interval = null;
let isPlaying = false;
const arrayContainer = document.getElementById('array');
let sortedIndicesPerStep = []; // Store indices that are sorted

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
    steps = [];
    currentStep = 0;
    clearInterval(interval);
    isPlaying = false;
    document.getElementById('play-pause-btn').innerText = 'Play';

    // Determine the selected sorting algorithm and compute steps accordingly
    let selectedSort = document.getElementById('sort-algorithm').value;
    if (selectedSort === 'bubble') {
        computeBubbleSortSteps();
    } else if (selectedSort === 'selection') {
        computeSelectionSortSteps();
    } else if (selectedSort === 'insertion') {
        computeInsertionSortSteps();
    }
    else if (selectedSort === 'quick') {
        ;
    }
    else if (selectedSort === 'merge') {
        ;
    }
}

// Bubble Sort Steps
function computeBubbleSortSteps() {
    let tempArray = [...array];
    let elements = [];
    let sortedAtThisStep = new Set();

    for (let i = 0; i < tempArray.length - 1; i++) {
        for (let j = 0; j < tempArray.length - i - 1; j++) {
            // Save the step (comparison)
            elements.push({ type: 'compare', indexes: [j, j + 1], array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });

            if (tempArray[j] > tempArray[j + 1]) {
                // Swap in the array and save the swap step
                let temp = tempArray[j];
                tempArray[j] = tempArray[j + 1];
                tempArray[j + 1] = temp;

                elements.push({ type: 'swap', indexes: [j, j + 1], array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });
            }
        }
        // Mark the current last unsorted element as sorted
        sortedAtThisStep.add(tempArray.length - i - 1);
        elements.push({ type: 'sorted', index: tempArray.length - i - 1, array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });
    }
    steps = elements;
}

// Selection Sort Steps
function computeSelectionSortSteps() {
    let tempArray = [...array];
    let elements = [];
    let sortedAtThisStep = new Set();

    for (let i = 0; i < tempArray.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < tempArray.length; j++) {
            elements.push({ type: 'compare', indexes: [j, minIndex], array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });

            if (tempArray[j] < tempArray[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            let temp = tempArray[i];
            tempArray[i] = tempArray[minIndex];
            tempArray[minIndex] = temp;

            elements.push({ type: 'swap', indexes: [i, minIndex], array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });
        }

        sortedAtThisStep.add(i);
        elements.push({ type: 'sorted', index: i, array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });
    }
    steps = elements;
}

// Insertion Sort Steps
function computeInsertionSortSteps() {
    let tempArray = [...array];
    let elements = [];
    let sortedAtThisStep = new Set();

    for (let i = 1; i < tempArray.length; i++) {
        let key = tempArray[i];
        let j = i - 1;

        elements.push({ type: 'compare', indexes: [i, j], array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });

        while (j >= 0 && tempArray[j] > key) {
            tempArray[j + 1] = tempArray[j];
            elements.push({ type: 'swap', indexes: [j, j + 1], array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });
            j--;
        }
        tempArray[j + 1] = key;

        sortedAtThisStep.add(i-1);
        elements.push({ type: 'sorted', index: i-1, array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });
        if (i+1 === tempArray.length){
            sortedAtThisStep.add(i);
            elements.push({ type: 'sorted', index: i, array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });
        }
    }
    steps = elements;
}

// Display the current state of the array
function displayStep(step) {
    let elements = document.getElementsByClassName('num');
    let stepInfo = steps[step];
    
    // Reset all elements' styles
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected', 'swapped', 'sorted');
    }

    // Reapply sorted styling based on the current step
    stepInfo.sortedIndices.forEach(index => {
        elements[index].classList.add('sorted');
    });

    // Update the display based on the type of the step
    if (stepInfo.type === 'compare') {
        let [i, j] = stepInfo.indexes;
        elements[i].classList.add('selected');
        elements[j].classList.add('selected');
    } else if (stepInfo.type === 'swap') {
        let [i, j] = stepInfo.indexes;
        elements[i].classList.add('swapped');
        elements[j].classList.add('swapped');
    } else if (stepInfo.type === 'sorted') {
        let index = stepInfo.index;
        elements[index].classList.add('sorted');
        if (index == 1) {
            elements[index - 1].classList.add('sorted');
        }
    }

    // Update the numbers in the DOM to reflect the array
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = stepInfo.array[i];
    }

    // Update the step counter
    document.getElementById('step-counter').innerText = `Step ${currentStep + 1} of ${steps.length}`;
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

// Generate the array and prepare the steps on page load
generateArray();