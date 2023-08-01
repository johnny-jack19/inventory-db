import express from "express";
import cors from "cors";

import {
  getStudents,
  getItemsForStudent,
  createItem,
  moveItem,
  updateContainer,
  resetContainer,
  getContainers,
  getItemsForContainer,
  deleteItem,
} from "./database/calls.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/students", async (req, res) => {
  try {
    const students = await getStudents();
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.get("/containers", async (req, res) => {
  try {
    const containers = await getContainers();
    res.status(200).json(containers);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.get("/items/:studentID", async (req, res) => {
  try {
    const items = await getItemsForStudent(req.params.studentID);
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.get("/container/:containerID", async (req, res) => {
  try {
    const items = await getItemsForContainer(req.params.containerID);
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.post("/item", async (req, res) => {
  try {
    const { studentID, containerID, type, details, size } = req.body;
    await createItem(studentID, containerID, type, details, size);
    res.status(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.patch("/item", async (req, res) => {
  try {
    const { itemID, containerID } = req.body;
    await moveItem(itemID, containerID);
    res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.patch("/container", async (req, res) => {
  try {
    const { containerID, studentID, freeSpace } = req.body;
    await updateContainer(containerID, studentID, freeSpace);
    res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.patch("/container/:containerID", async (req, res) => {
  try {
    await resetContainer(req.params.containerID);
    res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.delete("/delete/:itemID", async (req, res) => {
  try {
    await deleteItem(req.params.itemID);
    res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
