import { DbService } from "../services/db.service.js";
import bcrypt from "bcryptjs";

const addTask = async (req, res) => {
	let description = req.body.description;
	let userId = req.body.userId;
	if (description && Number(userId)) {
		DbService.addTaskToDb(userId, description).then(async (id) => {
			const task = await DbService.getTaskFromDb(id);
			res.status(200).json(task);
		});
	} else {
		res.status(400).json({ error: "bad inputs!" });
	}
};

const removeTask = async (req, res) => {
	let id = req.body.id;
	if (id) {
		DbService.removeTaskFromDb(id).then(() => {
			res.status(200).json({ message: "task deleted" });
		});
	} else {
		res.status(400).json({ error: "bad input!" });
	}
};

const getTasks = async (req, res) => {
	const userId = req.body.id; // will be from token
	if (Number(userId)) {
		const data = await DbService.getAllTasksFromDb(userId);
		res.status(200).json(data);
	} else {
		res.status(400).json({ error: "Bad input!" });
	}
};

const registerUser = async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		DbService.addUserToDb(username, password).then((data) => {
			//todo return userID so send a token and log him in
			console.log(data);
			res.status(200).json({ message: "user added!" });
		});
	} else {
		res.status(400).json({ error: "Bad input!" });
	}
};

const loginUser = async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		if (await DbService.isUserInDb(username, password)) {
			res.status(200).json({ message: "ok" });
			//will send token here
		} else {
			res.status(400).json({ error: "invalid username or password" });
		}
	} else {
		res.status(400).json({ error: "Bad inputs!" });
	}
};

export default { addTask, getTasks, registerUser, loginUser, removeTask };
