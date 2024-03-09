//find if any subset is summing to K
console.log(optimum([4, 3, -1, 2], 5)); //true
console.log(optimum([2, 5, 1, 6, 7], 4)); //false

//MEMOIZATION --> O(2^n) ; O(N)
function memo(nums, k) {
  let dp = new Map();
  return solve(nums.length - 1, k);

  //2 dynamic values, i and leftover, so dp[i,leftover] = value
  function solve(i, leftover) {
    let key = `${i},${leftover}`;
    if (leftover === 0) return true;
    if (i === 0) return nums[0] === leftover;
    if (dp.has(key)) return dp.get(key);

    //ignore & pick
    let ignore = solve(i - 1, leftover);
    let pick = nums[i] > leftover ? false : solve(i - 1, leftover - nums[i]);
    dp.set(key, ignore || pick);
    return dp.get(key);
  }
}

//TABULATION --> O(NK) , O(N)
function tabule(nums, k) {
  let dp = new Map();
  let N = nums.length;

  //for any i, if leftover=0, true soo...
  for (let i = 0; i < N; i++) {
    dp.set(`${i},${0}`, true)
  }

  dp.set(`${0},${nums[0]}`, true);

  //iterate over dynamic values from bottom up
  //copy-paste memo & replace solve with dp

  for (let i = 1; i < N; i++) {
    for (let leftover = 1; leftover <= k; leftover++) {
      let ignore = dp.get(`${i - 1},${leftover}`);
      let pick =
        nums[i] > leftover ? false : dp.get(`${i - 1},${leftover - nums[i]}`);
      dp.set(`${i},${leftover}`, ignore || pick);
    }
  }
  return dp.get(`${N - 1},${k}`);
}

//ELIMINATE DP --> space optimisation

function optimum(nums, k) {
  let N = nums.length;
  let prev = [], curr=[];
  prev[nums[0]] = true;
  prev[0] = curr[0] = true;
  for (let i = 1; i < N; i++) {
    for (let leftover = 1; leftover <=k; leftover++) {
      let ignore = prev[leftover];
      let pick = nums[i] > leftover ? false : prev[leftover - nums[i]];
      curr[leftover] = ignore || pick;
    }
    prev = [...curr]; //copy by value
  }
  return prev[k];
}
