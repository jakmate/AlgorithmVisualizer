// display.js
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

function displaySearchStep(step) {
    let elements = document.getElementsByClassName('num');
    let stepInfo = steps[step];

    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected', 'swapped', 'sorted');
    }

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

    document.getElementById('step-counter').innerText = `Step ${currentStep + 1} of ${steps.length}`;
    document.getElementById('current-algorithm').innerText = `Current Algorithm: Linear Search (Target: ${stepInfo.target})`;
}