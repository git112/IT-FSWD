const express = require("express");
const Task = require("../models/Task.js"); // Ensure correct model
const router = express.Router();

// Create a new task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks with optional filters
router.get("/", async (req, res) => {
  try {
    const { status, dueDate } = req.query;
    let filters = {}; 

    if (status) filters.status = status;
    if (dueDate) filters.dueDate = { $lte: new Date(dueDate) };

    const tasks = await Task.find(filters);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Update a task by ID
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: "Invalid task ID" });
  }
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid task ID" });
  }
});

// Export the router (only once at the end)
module.exports = router;
