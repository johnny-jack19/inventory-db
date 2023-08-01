import { pool } from "./connect.js";

//Get list of students
export async function getStudents() {
  const results = await pool.query("SELECT * FROM students");
  return results[0];
}

//Get list of containers
export async function getContainers() {
  const results = await pool.query("SELECT * FROM containers");
  return results[0];
}

//Gets all items owned by student
export async function getItemsForStudent(studentID) {
  const results = await pool.query(
    `
    SELECT * 
    FROM items
    WHERE studentID = ?
    `,
    [studentID]
  );
  return results[0];
}

//Gets all items in a container
export async function getItemsForContainer(containerID) {
  const results = await pool.query(
    `
    SELECT * 
    FROM items
    WHERE containerID = ?
    `,
    [containerID]
  );
  return results[0];
}

//Creates item
export async function createItem(studentID, containerID, type, details, size) {
  const results = await pool.query(
    `
    INSERT INTO items (studentID, containerID, type, details, size)
    VALUES (?, ?, ?, ?, ?)
    `,
    [studentID, containerID, type, details, size]
  );
  return results[0].insertId;
}

//Changes the containerID on an item
export async function moveItem(itemID, containerID) {
  const results = await pool.query(
    `
    UPDATE items
    SET containerID = ?
    WHERE itemID = ?
    `,
    [containerID, itemID]
  );
  return results[0].info;
}

//Updates container with studentID and freeSpace
export async function updateContainer(containerID, studentID, freeSpace) {
  const results = await pool.query(
    `
    UPDATE containers
    SET studentID = ?, freeSpace = freeSpace+?
    WHERE containerID = ?
    `,
    [studentID, freeSpace, containerID]
  );
  return results[0].info;
}

//Reset container to default
export async function resetContainer(containerID) {
  const results = await pool.query(
    `
    UPDATE containers
    SET studentID = 0, freeSpace = 15
    WHERE containerID = ?
    `,
    [containerID]
  );
  return results[0].info;
}

//Deletes item
export async function deleteItem(itemID) {
  const results = await pool.query(
    `
  DELETE FROM items
  WHERE itemID = ?
  `,
    [itemID]
  );
  return results;
}
