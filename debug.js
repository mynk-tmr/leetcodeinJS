var isMatch = function (s, p) {
  if (p === "") return s === "";
  let prev = Array(s.length + 1).fill(false);
  let curr = Array(s.length + 1).fill(false);
  let a, b;

  //base cases dp[0][0]
  prev[0] = true;

  //iteration
  for (a = 1; a <= s.length; a++) {
    curr[0] = prev[0] && p[a - 1] === "*"; //base case

    for (b = 1; b <= p.length; b++) {
      if (s[a - 1] === p[b - 1] || p[b - 1] === "?") curr[b] = prev[b - 1];
      else if (p[b - 1] === "*") curr[b] = curr[b - 1] || prev[b];
      else curr[b] = false;
    }
    prev = [...curr];
  }
  return prev[s.length];
};

console.log(isMatch("aa", "*"));
