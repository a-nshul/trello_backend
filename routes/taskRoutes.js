const express = require("express");
const {
  createTask,
  getTask,deleteTask,updateTask,getTaskbyID
} = require("../controllers/taskControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect,getTask);
router.route("/").post(protect, createTask);
router.route("/:id").delete(protect,deleteTask);
router.route("/:id").put(protect, updateTask);
router.route("/:id").get(protect, getTaskbyID);
module.exports = router;