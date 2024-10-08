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

    if (stepInfo.type === 'compare') {
        let currentIndex = stepInfo.index;

        elements[currentIndex].classList.add('swapped');

        for (let i = 0; i < step; i++) {
            if (steps[i].type === 'compare' && steps[i].index !== stepInfo.index) {
                elements[steps[i].index].classList.add('selected');
            }
        }
    } else if (stepInfo.type === 'found') {
        let foundIndex = stepInfo.index;
        elements[foundIndex].classList.add('sorted');
    }

    updateNumsInDOM(elements, stepInfo);

    document.getElementById('step-counter').innerText = `Step ${currentStep + 1} of ${steps.length}`;
    document.getElementById('current-algorithm').innerText = `Current Algorithm: Linear Search (Target: ${stepInfo.target})`;
}

function displayMergeSortStep(step) {
    let elements = document.getElementsByClassName('num');
    let stepInfo = steps[step];

    resetElements(elements);

    if (stepInfo.type === 'split') {
        let [left, mid, right] = stepInfo.indexes;
        highlightSubarrays(elements, left, mid, right);
        displayArrows(stepInfo.depth, 'split');
    } else if (stepInfo.type === 'merge') {
        let [left, right] = stepInfo.indexes;
        highlightSubarrays(elements, left, Math.floor((left + right) / 2), right);
        displayArrows(stepInfo.depth, 'merge');
    }

    updateNumsInDOM(elements, stepInfo);
}

function highlightSubarrays(elements, left, mid, right) {
    for (let i = left; i <= mid; i++) {
        elements[i].classList.add('selected');
    }
    for (let i = mid + 1; i <= right; i++) {
        elements[i].classList.add('swapped');
    }
}

function displayArrows(depth, type) {
    let container = document.getElementById('array-container');
    let arrow = document.createElement('div');
    arrow.classList.add('arrow');
    arrow.innerHTML = type === 'split' ? '↓' : '↑';
    arrow.style.marginTop = `${depth * 20}px`;
    container.appendChild(arrow);
}
