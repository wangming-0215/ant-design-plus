const arr1 = [
  61,
  24,
  20,
  58,
  95,
  53,
  17,
  32,
  45,
  85,
  70,
  20,
  83,
  62,
  35,
  89,
  5,
  95,
  12,
  86,
  58,
  77,
  30,
  64,
  46,
  13,
  5,
  92,
  67,
  40,
  20,
  38,
  31,
  18,
  89,
  85,
  7,
  30,
  67,
  34,
  62,
  35,
  47,
  98,
  3,
  41,
  53,
  26,
  66,
  40,
  54,
  44,
  57,
  46,
  70,
  60,
  4,
  63,
  82,
  42,
  65,
  59,
  17,
  98,
  29,
  72,
  1,
  96,
  82,
  66,
  98,
  6,
  92,
  31,
  43,
  81,
  88,
  60,
  10,
  55,
  66,
  82,
  0,
  79,
  11,
  81,
];
const arr2 = [
  5,
  25,
  4,
  39,
  57,
  49,
  93,
  79,
  7,
  8,
  49,
  89,
  2,
  7,
  73,
  88,
  45,
  15,
  34,
  92,
  84,
  38,
  85,
  34,
  16,
  6,
  99,
  0,
  2,
  36,
  68,
  52,
  73,
  50,
  77,
  44,
  61,
  48,
];

/**
 *
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns {number[]}
 */
function intersect(arr1, arr2) {
  if (arr1.length > arr2.length) {
    return intersect(arr2, arr1);
  }
  const map = new Map();
  for (const x of arr1) {
    const count = map.get(x) || 0;
    map.set(x, count + 1);
  }
  console.log(map);
  const result = [];
  for (const x of arr2) {
    let count = map.get(x) || 0;
    if (count > 0) {
      result.push(x);
      count--;
      if (count > 0) {
        map.set(x, count);
      } else {
        map.delete(x);
      }
    }
  }
  console.log(result);
}

console.log(intersect(arr1, arr2));
