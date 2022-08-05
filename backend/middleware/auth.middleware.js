import jwt from "jsonwebtoken";
import { CookieService } from "../services/CookieService";

export const authenticationMiddleware = (req, res, next) => {
	const exceptions = ["/api/register", "/api/login"];
	let secret = "very-secret-key";
	if (exceptions.includes(req.path)) {
		next();
	} else {
		let token = CookieService.getTokenFromRequest(req);
		if (!token) {
			return res.status(403).json({
				message: "No token provided!",
			});
		}
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					message: "Unauthorized access!",
				});
			}
			next();
		});
	}
};
