//print subsets summing to 5, ans. [[ 2, 3 ], [ 1, 4 ]]

console.log(subarraySum([4, 3, 1, 2], 5));

function subarraySum(nums, k) {
  let set = [];
  solve();
  return set;
  function solve(i = nums.length - 1, subsoln = [], target = k) {
    if (target === 0) return set.push(Array.from(subsoln));
    if (i < 0) return;
    //pick i
    if (nums[i] <= target) {
      subsoln.push(nums[i]);
      solve(i - 1, subsoln, target - nums[i]);
      subsoln.pop();
    }
    //ignore i
    solve(i - 1, subsoln, target);
  }
}
