import { DbService } from "../services/db.service.js";
import { CookieService } from "../services/cookie.service.js";
import jwt from "jsonwebtoken";

const addTask = async (req, res) => {
	let description = req.body.description;
	let userId = CookieService.getUserIdFromToken(req);
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
	const userId = CookieService.getUserIdFromToken(req); // will be from token
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
		if (await DbService.isDuplicit(username)) {
			res.status(400).json({ message: "user already exists!" });
		} else {
			DbService.addUserToDb(username, password).then(() => {
				res.status(200).json({ message: "user added!" });
			});
		}
	} else {
		res.status(400).json({ error: "Bad input!" });
	}
};

const loginUser = async (req, res) => {
	let secret = "very-secret-key";
	let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		if (await DbService.isUserInDb(username, password)) {
			//send token
			let user = await DbService.getUserFromDb(username);
			const payload = {
				id: user.id,
				username: user.username,
			};
			const token = jwt.sign(payload, secret);
			res
				.cookie("authentication_token", token, {
					httpOnly: true,
					sameSite: "none",
					secure: true,
				})
				.status(200)
				.json({ message: "ok" });
		} else {
			res.status(400).json({ error: "invalid username or password" });
		}
	} else {
		res.status(400).json({ error: "Bad inputs!" });
	}
};

export default { addTask, getTasks, registerUser, loginUser, removeTask };
