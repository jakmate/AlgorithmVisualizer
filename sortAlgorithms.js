// sortAlgorithms.js
function computeBubbleSortSteps(array) {
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

function computeSelectionSortSteps(array) {
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

function computeInsertionSortSteps(array) {
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

        sortedAtThisStep.add(i - 1);
        elements.push({ type: 'sorted', index: i - 1, array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });
        if (i + 1 === tempArray.length) {
            sortedAtThisStep.add(i);
            elements.push({ type: 'sorted', index: i, array: [...tempArray], sortedIndices: new Set(sortedAtThisStep) });
        }
    }
    steps = elements;
}

function computeMergeSortSteps(array) {
    let elements = [];
    mergeSortHelper(array, 0, array.length - 1, elements);
    steps = elements;
}

function mergeSortHelper(arr, left, right, elements, depth = 0) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);

        // Record the splitting step
        elements.push({ 
            type: 'split', 
            indexes: [left, mid, right], 
            array: [...arr], 
            depth: depth 
        });

        // Recursively split the array
        mergeSortHelper(arr, left, mid, elements, depth + 1);
        mergeSortHelper(arr, mid + 1, right, elements, depth + 1);

        // Record the merging step
        merge(arr, left, mid, right, elements, depth);
    }
}

function merge(arr, left, mid, right, elements, depth) {
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let leftArr = new Array(n1);
    let rightArr = new Array(n2);

    for (let i = 0; i < n1; i++) leftArr[i] = arr[left + i];
    for (let j = 0; j < n2; j++) rightArr[j] = arr[mid + 1 + j];

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }

    // Record the merge result step
    elements.push({ 
        type: 'merge', 
        indexes: [left, right], 
        array: [...arr], 
        depth: depth 
    });
}
