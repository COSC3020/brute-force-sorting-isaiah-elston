[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7eEMzrNd)
# Brute-Force Sorting

We talked about the complexity of the sorting problem, and used an argument over
all permutations of a list to be sorted to determine its complexity. Implement
a function to sort a list by systematically trying all permutations of the input
list, using the template in `code.js`. Test your new function; I've provided
some basic testing code that uses [jsverify](https://jsverify.github.io/) in
`code.test.js`.

The return value should be the number of permutations that were tried until the
sorted list was "discovered". The unsorted list passed as an argument should be
sorted, i.e. do not copy the list and sort the copy.

## Runtime Analysis

What is the runtime complexity of the algorithm that you implemented? What does
a best case input for your implementation look like, what does a worst case
input look like? How would this complexity change if you generated permutations
randomly without memory instead of systematically trying them?

Describe your reasoning and the conclusion you've come to. Your reasoning is the
most important part. Add your answer to this markdown file.

## Answer's

### Worst Case

The `permutationSort` function has three distinct *non-constant* portions of code within it. Firstly, there is the `isSorted` function. `isSorted` will **always** parse through every element of the input array and ensure that the array is sorted. This is a linear operation, and thus will **always** be an element of $\mathrm{O}(n)$.

 Next, there is a `for` loop that will iterate through every element of the input array beginning at the `left` index and ending at the `right` index which are each passed as arguments. Of course, the worst case here is whenever the `for` loop has to parse through the entirety of the input array *(`left = array[0]` \& `right = array[array.length - 1]`)*. I say that because there could never reasonably be a permutation of the input array that contains more elements than the input array itself. Therefore, the worst case time complexity for the `for` loop is also $\mathrm{O}(n)$.

 Finally, we may consider the recursive call of `generatePermutations` that is nested within the aforementioned `for` loop. This recursive call simply restarts the process of generating permutations but considering one less element in the input array. More specifically, it will *not* consider the leftmost element from the previous iteration. Since it is nested within a `for` loop that could run $\mathrm{O}(n)$ times, we can generalize the worst case time complexity of the recursive call(s) as follows: $n[(n) * (n - 1) * (n - 2) \cdots (1)]$. That pattern is equivalent to $n!$, which means that the worst case time complexity of the recursive call(s) is $\mathrm{O}(n!)$.

 Now that we have analyzed all of the *non-constant* parts of the implementation separately, it shouldn't be too difficult to contrive the worst case time complexity of the entire `permutationSort` function. If we dismiss the *non-constant* factors, we are left with the following equation: $\mathrm{T}(n) = n + (n * n!)$. The highest order term is $n(n!)$, which means that the worst case time complexity of the `permutationSort` function is an element of $\mathrm{O}(n(n!))$.

### Average Case

The average case time complexity of the `permutationSort` function would be whenever the function does **not** need to parse through every permutation of the input array, but it still has to parse through "*some*" of them before it finds the sorted permutation. After considering the worst case above, we can see that even when the function does not have to parse through **every** permutation, it would still parse some constant amount of permutations. To put it in formulaic terms, the average case time complexity of the `permutationSort` function is $\mathrm{T}(n) = (n((n-c)!))$ where $c$ represents the arbitrary constant amount of permutations the function takes before it finds the sorted output. Since constant factors are negligible in asymptotic analysis, we can simplify the average case time complexity of the `permutationSort` function to *also* be an element of $\mathrm{O}(n(n!))$.

### Best Case

The best case of the `permutationSort` function is whenever the first permutation generated happens to be the sorted output. In this case, the recursive calls essentially never need to be made, because the `isSorted` would have to run *after* the first permutation is generated. Therefore, the one call of `isSorted` would run sequentially with one iteration of the `for` loop which would give us a time function of $\mathrm{T}(n) = n + n = 2n$. When no recursive calls need to be made, the time complexity of the `permutationSort` function is an element of $\mathrm{O}(n)$ in the best case.

### Random Permutations Approach

If I wrote an implementation that randomly generated permutations and followed no system whatsoever, the time complexity would be much different. In the event that the generations were truly random, there would be nothing stopping the function from generating the same permutation over and over again without ever finding the sorted output. This would mean that the time complexity of the function would be $\mathrm{O}(\infty)$, because the function could theoretically run forever without finding the sorted output. This is why the systematic approach is much more efficient than the random approach.