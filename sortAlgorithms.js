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
    let initialArray = [...array];
    mergeSortHelper([...array], 0, elements, 0, initialArray);
    steps = elements;
}

function mergeSortHelper(currentArray, startIdx, elements, depth, originalArray) {
    if (currentArray.length <= 1) {
        return currentArray;
    }

    const mid = Math.floor(currentArray.length / 2);
    const left = currentArray.slice(0, mid);
    const right = currentArray.slice(mid);

    // Record split step
    const splitIndexes = [
        startIdx,
        startIdx + mid - 1,
        startIdx + currentArray.length - 1
    ];
    elements.push({
        type: 'split',
        indexes: splitIndexes,
        array: [...originalArray],
        depth: depth
    });

    const leftSorted = mergeSortHelper(left, startIdx, elements, depth + 1, originalArray);
    const rightSorted = mergeSortHelper(right, startIdx + mid, elements, depth + 1, originalArray);

    return merge(leftSorted, rightSorted, startIdx, elements, depth, originalArray);
}

function merge(left, right, startIdx, elements, depth, originalArray) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    let mergeSteps = [];

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    result = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));

    // Update the original array with merged result
    for (let i = 0; i < result.length; i++) {
        originalArray[startIdx + i] = result[i];
    }

    // Record merge step
    elements.push({
        type: 'merge',
        indexes: [startIdx, startIdx + result.length - 1],
        array: [...originalArray],
        depth: depth
    });

    return result;
}