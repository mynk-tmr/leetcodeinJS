/* Tower of hanoi
  shift 'n-1' disks from pole1 to pole3, then pole3 to pole2 (to get upright)
  shift Nth disk from pole1 to pole3
  shift 'n-1' disks from pole2 to pole1, then pole1 to pole3 (to get upright)
*/

//toH(3, 'A', 'C', 'B');

function toH(n, from, to, use) {
  if (n == 1) return console.log(`Move disk 1 from ${from} to ${to}`);
  toH(n - 1, from, use, to);
  console.log(`Move disk ${n} from ${from} to ${to}`);
  toH(n - 1, use, to, from);
}
