import express from "express";
import apiController from "../controllers/apiController.js";

var router = express.Router();
router.get("/hello", apiController.hello);
export { router };
