import express from "express";
import apiController from "../controllers/apiController.js";

var router = express.Router();
router.post("/task/add", apiController.addTask);
router.post("/task/delete", apiController.removeTask);
router.post("/tasks/get", apiController.getTasks); //todo change back to get after jwt token
router.post("/register", apiController.registerUser);
router.post("/login", apiController.loginUser);
export { router };
