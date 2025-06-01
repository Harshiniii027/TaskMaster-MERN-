const Task = require("../models/tasks");

// Create task
const addTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const user = req.user; // fixed: directly use req.user

    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (title.length < 6) {
      return res.status(400).json({ error: "Title must have 6 characters." });
    }

    if (description.length < 6) {
      return res.status(400).json({ error: "Description must have 6 characters." });
    }

    const newTask = new Task({ title, description, priority, status, user: user._id });


    await newTask.save();

    user.tasks.push(newTask._id); // assuming user has a tasks array
    await user.save();

    return res.status(200).json({ success: "Task added", task: newTask });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Edit task
const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find the task first to preserve existing values
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Merge updates with existing task data
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { 
        title: updates.title || task.title,
        description: updates.description || task.description,
        priority: updates.priority || task.priority,
        status: updates.status || task.status
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({ success: "Task updated", task: updatedTask });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get task
const getTask = async (req, res) => {
  try {
    const user = req.user; // User is attached by authMiddleware
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log(user)
    const tasks = await Task.find({ user: req.user._id });

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);

    return res.status(200).json({ success: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { addTask, editTask, getTask, deleteTask };
