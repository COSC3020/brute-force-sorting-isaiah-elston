function swap(array, left, right) {
    let temp = array[left];
    array[left] = array[right];
    array[right] = temp;
}

function isSorted(array) {
    for (let index = 0; index < array.length - 1; index++) {
        if (array[index] > array[index + 1]) {
            return false;
        }
    }
    return true;
}

function permutationSort(a) {
    let permutations = 0;

    function generatePermutations(array, left, right) {
        if (left == right) {

            if (isSorted(array) == true) {
                return true;
            } else {
                permutations++;
            }


        } else {

            for (let index = left; index <= right; index++) {

                swap(array, left, index);

                if (generatePermutations(array, left + 1, right)) {
                    return true;
                }

                swap(array, left, index);
            }
        }
    }

    generatePermutations(a, 0, a.length - 1);

    return permutations;
}
