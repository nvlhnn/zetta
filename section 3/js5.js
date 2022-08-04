/**
 * Direction
 * Divide students to all of groups & students must sorted by first name
 *
 * Expected Result
 * [
 *   [
 *     { "firstName": "Belle", "lastName": "Norton" },
 *     { "firstName": "Finnley", "lastName": "Rennie" }
 *   ],
 *   [
 *     { "firstName": "Kai", "lastName": "Lyons" },
 *     { "firstName": "Peyton", "lastName": "Gardner" }
 *   ],
 *   [{ "firstName": "Tatiana", "lastName": "Dickerson" }]
 * ]
 */
const students = [
  { firstName: "Kai", lastName: "Lyons" },
  { firstName: "Belle", lastName: "Norton" },
  { firstName: "Finnley", lastName: "Rennie" },
  { firstName: "Tatiana", lastName: "Dickerson" },
  { firstName: "Peyton", lastName: "Gardner" },
];
const groups = 3;

function result(students, groups) {
  // your code here
  students.sort((a, b) =>
    a.firstName > b.firstName ? 1 : b.firstName > a.firstName ? -1 : 0
  );

  const res = [];
  size = Math.ceil(students.length / groups);
  while (students.length > 0) res.push(students.splice(0, size));

  return res;
}

console.log(result(students, groups));
