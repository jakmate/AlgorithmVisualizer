// searchAlgorithms.js
let searchTarget;

function computeLinearSearchSteps(array) {
    let elements = [];

    // Pick a random element from the array as the target to search for
    searchTarget = array[Math.floor(Math.random() * array.length)];

    for (let i = 0; i < array.length; i++) {
        elements.push({ type: 'compare', index: i, target: searchTarget, array: [...array] });

        if (array[i] === searchTarget) {
            elements.push({ type: 'found', index: i, target: searchTarget, array: [...array] });
            break;
        }
    }

    steps = elements;
}

function computeBinarySearchSteps(array) {
    let tempArray = [...array].sort((a, b) => a - b); // Ensure the array is sorted
    let elements = [];
    let searchTarget = array[Math.floor(Math.random() * array.length)];
    let left = 0;
    let right = tempArray.length - 1;
    let found = false;

    while (left <= right && !found) {
        const mid = Math.floor((left + right) / 2);
        elements.push({
            type: 'binary-compare',
            left: left,
            right: right,
            mid: mid,
            target: searchTarget,
            array: [...tempArray],
            sortedIndices: new Set()
        });

        if (tempArray[mid] === searchTarget) {
            elements.push({
                type: 'found',
                index: mid,
                target: searchTarget,
                array: [...tempArray],
                sortedIndices: new Set()
            });
            found = true;
        } else if (tempArray[mid] < searchTarget) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    steps = elements;
    array = [...tempArray]; // Update the global array to sorted version
}