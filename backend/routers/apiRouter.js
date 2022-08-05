import express from "express";
import apiController from "../controllers/apiController.js";

var router = express.Router();
router.post("/task/add", apiController.addTask);
router.post("/task/delete", apiController.removeTask);
router.get("/tasks/get", apiController.getTasks);
router.post("/register", apiController.registerUser);
router.post("/login", apiController.loginUser);
router.put("/task/update", apiController.checkTask);
export { router };
