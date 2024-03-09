/* INSERTION SORT */

function i_sort(arr) {
  for (i = 1; i < arr.length; i++) {
    //i=1, we assume left subarray is already sorted
    ins = arr[i]; // our self-insert , use this only
    j = i - 1; // last index of subarray
    while (arr[j] > ins && j >= 0) {
      // search subelement smaller than our self-insert
      arr[j + 1] = arr[j]; // right shift biggies
      j--;
    }
    arr[j + 1] = ins; // insert to right of smallie
  }
  return arr;
}

/* QUICK SORT
  we pick a pivot element, then push smaller ones to a left subarr, bigger ones to right
  combine left-pivot-right
  recursively do it for divided ones

  TODO : not using extra 2 arrays
*/

function q_sort(arr) {
  if (arr.length < 2) return arr; //base case !!!
  let pivot = arr.pop(); //pick last, remove it
  let left = [],
    right = [];
  for (val of arr) {
    if (val < pivot) left.push(val);
    else right.push(val);
  }
  return [...q_sort(left), pivot, ...q_sort(right)];
}

/* MERGE SORT
 1) cut array in half recursively until 1 or 0 element subarrays are produced

 2) Compare first elements of adjacent arrays, shift smaller into new array till one of them is empty. Concat remaining to new array

 3) combine mini-results
*/

function merge(left, right) {
  //step 2
  let sorted = [];
  while (left.length && right.length) {
    sorted.push(left[0] <= right[0] ? left.shift() : right.shift());
  }
  return [...sorted, ...left, ...right]; //concat
}

function m_sort(arr) {
  if (arr.length < 2) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = m_sort(arr.slice(0, mid)); //recur
  let right = m_sort(arr.slice(mid)); // recur
  return merge(left, right);
}

/* CYCLIC SORT (for distinct no. from x to N)
  a ele should be at pos=x+ele, we keep swapping at each index until correct ele for that index is got.
*/

// c_sort([3, 2, 1, 5, 4]) -> x=1, N=5  {1 to 5}

function c_sort(arr) {
  const x = 1;
  for (i = 0; i < arr.length - 1; i++) {
    while (arr[i] != i + x) {
      pos = arr[i] - x;
      [arr[i], arr[pos]] = [arr[pos], arr[i]];
    }
  }
  return arr;
}
