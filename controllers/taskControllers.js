const asyncHandler = require('express-async-handler');
const Task = require('../modal/taskModal');

// Create a new task
const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  // Validate incoming request data
  if (!title || !description || !dueDate) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Create a new task
  const task = await Task.create({
    title,
    description,
    dueDate,
    status,
  });

  res.status(201).json({
    message: 'Task created successfully',
    task,
  });
});

// Get all tasks
const getTask = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      message: 'Tasks fetched successfully',
      tasks,
    });
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});

// Update task
const updateTask = asyncHandler(async (req, res) => {
  try {
    const {id}=req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json({
      message: 'Task updated successfully',
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({message:"Task updated successfully"});
  }
});

// Delete task
const deleteTask = asyncHandler(async (req, res) => {
  try {
   const {id}=req.params;
   const deletedTask = await Task.findByIdAndDelete(id);
   if(!deletedTask){
     res.status(404).json({message:"Task not found"});
     return;
   }
   
    res.status(200).json({
      message: 'Task deleted successfully',deletedTask
    });
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});

const getTaskbyID = asyncHandler(async (req, res) => {
  try {
    const {id}=req.params;
    const task = await Task.findById(id);
    if(!task){
      res.status(404).json({message:"Task not found"});
      return;
    }
    res.status(200).json({
      message: 'Task fetched successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,getTaskbyID
};
