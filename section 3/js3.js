// Question
// Given a object data, return the data multiple by 3 and sort the data.
// Expected output : { j: 0, k: 9, i: 18, l: 36 }

const data = { i: 6, j: null, k: 3, l: 12 };

function result(data) {
  // write your code here
  const res = Object.keys(data).sort(function (a, b) {
    return data[a] - data[b];
  });

  const newObj = {};
  for (const key of res) {
    newObj[key] = data[key] * 3;
  }

  return newObj;
}

console.log(result(data));
