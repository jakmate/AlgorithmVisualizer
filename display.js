// display.js
// Reset all elements' styles
function resetElements(elements) {
    for (let element of elements) {
        element.classList.remove('selected', 'swapped', 'sorted');
    }
}

// Update the numbers in the DOM to reflect the array
function updateNumsInDOM(elements, stepInfo){
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = stepInfo.array[i];
    }
}

function displayStep(step) {
    let elements = document.getElementsByClassName('num');
    let stepInfo = steps[step];

    resetElements(elements);

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

    updateNumsInDOM(elements, stepInfo);

    // Update the step counter
    document.getElementById('step-counter').innerText = `Step ${currentStep + 1} of ${steps.length}`;
}

function displaySearchStep(step) {
    let elements = document.getElementsByClassName('num');
    let stepInfo = steps[step];

    resetElements(elements);

    if (selectedAlgorithm === 'binary') {
        document.getElementById('current-algorithm').innerText = `Current Algorithm: Binary Search (Target: ${stepInfo.target})`;

        if (stepInfo.type === 'binary-compare') {
            // Highlight the current subarray from left to right
            for (let i = stepInfo.left; i <= stepInfo.right; i++) {
                elements[i].classList.add('selected');
            }
            // Highlight the mid element
            elements[stepInfo.mid].classList.add('swapped');
        } else if (stepInfo.type === 'found') {
            elements[stepInfo.index].classList.add('sorted');
        }
    } else {
        document.getElementById('current-algorithm').innerText = `Current Algorithm: Linear Search (Target: ${stepInfo.target})`;

        if (stepInfo.type === 'compare') {
            let currentIndex = stepInfo.index;
            elements[currentIndex].classList.add('swapped');
            for (let i = 0; i < step; i++) {
                if (steps[i].type === 'compare' && steps[i].index !== currentIndex) {
                    elements[steps[i].index].classList.add('selected');
                }
            }
        } else if (stepInfo.type === 'found') {
            elements[stepInfo.index].classList.add('sorted');
        }
    }

    updateNumsInDOM(elements, stepInfo);
    document.getElementById('step-counter').innerText = `Step ${currentStep + 1} of ${steps.length}`;
}

function displayMergeSortStep(step) {
    let elements = document.getElementsByClassName('num');
    let stepInfo = steps[step];

    resetElements(elements);
    updateNumsInDOM(elements, stepInfo);

    document.getElementById('step-counter').innerText = `Step ${currentStep + 1} of ${steps.length}`;

    if (stepInfo.type === 'split') {
        const [left, mid, right] = stepInfo.indexes;
        highlightSubarrays(elements, left, mid, right);
    } else if (stepInfo.type === 'merge') {
        const [start, end] = stepInfo.indexes;
        highlightSubarrays(elements, start, end, end);
    } else if (stepInfo.type === 'sorted') {
        // Mark all elements as sorted
        Array.from(elements).forEach(el => el.classList.add('sorted'));
    }
}

function highlightSubarrays(elements, left, mid, right) {
    for (let i = left; i <= mid; i++) {
        elements[i].classList.add('selected');
    }
    for (let i = mid + 1; i <= right; i++) {
        elements[i].classList.add('swapped');
    }
}

function displayQuickSortStep(step) {
    let elements = document.getElementsByClassName('num');
    let stepInfo = steps[step];

    resetElements(elements);

    // Reapply sorted styling
    stepInfo.sortedIndices.forEach(index => {
        elements[index].classList.add('sorted');
    });

    // Handle different step types
    switch(stepInfo.type) {
        case 'compare':
            elements[stepInfo.indexes[0]].classList.add('selected');
            elements[stepInfo.indexes[1]].classList.add('selected');
            break;
            
        case 'swap':
            elements[stepInfo.indexes[0]].classList.add('swapped');
            elements[stepInfo.indexes[1]].classList.add('swapped');
            break;
            
        case 'pivot':
            elements[stepInfo.index].classList.add('swapped');
            break;
            
        case 'sorted':
            elements[stepInfo.index].classList.add('sorted');
            break;
    }

    updateNumsInDOM(elements, stepInfo);
    document.getElementById('step-counter').innerText = `Step ${currentStep + 1} of ${steps.length}`;
}