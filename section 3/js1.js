/**
 * Direction:
 * Find the higher value from the array bellow
 *
 * Expected Result:
 * 8
 */
let numbers = [3, 1, 2, 3, 7, 5, 6, 8, 2, 1];

function result(numbers) {
  let temp = 0;
  for (const iterator of numbers) {
    if (typeof iterator === "number" && iterator > temp) temp = iterator;
  }

  return temp;
}

console.log(result(numbers));
