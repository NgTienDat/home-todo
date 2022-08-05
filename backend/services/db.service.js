import { dataSource } from "../configs/dbconfig.js";
import bcrypt from "bcryptjs";

export class DbService {
	static async addTaskToDb(userId, description) {
		var sql =
			"INSERT INTO tasks(description, userId) VALUES ('" +
			description +
			"', '" +
			userId +
			"')";
		return new Promise((resolve, reject) => {
			dataSource.query(sql, (err, result) => {
				if (err) reject(err);
				else {
					resolve(result.insertId);
				}
			});
		});
	}

	static async removeTaskFromDb(id) {
		var sql = "DELETE FROM tasks WHERE id='" + id + "'";
		return new Promise((resolve, reject) => {
			dataSource.query(sql, (err) => {
				if (err) reject(err);
			});
		});
	}

	static async getTaskFromDb(taskId) {
		var sql =
			"SELECT id, description, isDone FROM tasks WHERE id='" + taskId + "'";
		return new Promise((resolve, reject) => {
			dataSource.query(sql, (err, result) => {
				if (err) reject(err);
				else {
					resolve(result[0]);
				}
			});
		});
	}

	static async getAllTasksFromDb(userId) {
		const sql =
			"SELECT id, description, isDone FROM tasks WHERE userId='" +
			userId +
			"' ";
		return new Promise((resolve, reject) => {
			dataSource.query(sql, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	static async checkTask(taskId, isDone, userId) {
		const sql =
			"UPDATE tasks SET isDone='" +
			Number(!isDone) +
			"' WHERE id='" +
			taskId +
			"' and userId='" +
			userId +
			"' ";
		return new Promise((resolve, reject) => {
			dataSource.query(sql, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve({ message: "task update!" });
				}
			});
		});
	}

	static async addUserToDb(username, password) {
		let salt = await bcrypt.genSalt();
		let hashPassword = await bcrypt.hash(password.toString(), salt);
		var sql =
			"INSERT INTO users(username, password) VALUES('" +
			username +
			"', '" +
			hashPassword +
			"')";
		return new Promise((resolve, reject) => {
			dataSource.query(sql, (err) => {
				if (err) reject(err);
				else {
					resolve({ message: "user added!" });
				}
			});
		});
	}

	static async isDuplicit(username) {
		var sql = "SELECT password FROM users WHERE username='" + username + "' ";
		return new Promise((resolve, reject) => {
			dataSource.query(sql, (err, result) => {
				if (err) reject(err);
				else {
					if (result.length == 1) {
						resolve(true);
					} else {
						resolve(false);
					}
				}
			});
		});
	}

	static async isUserInDb(username, password) {
		var sql = "SELECT password FROM users WHERE username='" + username + "' ";
		return new Promise((resolve, reject) => {
			dataSource.query(sql, async (err, result) => {
				if (err) reject(err);
				else {
					if (result.length == 1) {
						let isCorrectPassword = await bcrypt.compare(
							password.toString(),
							result[0].password
						);
						resolve(isCorrectPassword);
					} else {
						resolve(false);
					}
				}
			});
		});
	}

	static async getUserFromDb(username) {
		var sql =
			"SELECT id, username FROM users WHERE username='" + username + "'";
		return new Promise((resolve, reject) => {
			dataSource.query(sql, (err, result) => {
				if (err) reject(err);
				else {
					resolve(result[0]);
				}
			});
		});
	}
}
