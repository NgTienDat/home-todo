export class CookieService {
	static getTokenFromRequest(req) {
		let allCookies = req.headers?.cookie || "";
		let authToken = allCookies.match("(?<=authentication_token=).+?(?=;|$)");
		let token = authToken ? authToken[0] : "";
		return token;
	}

	static parseJwt = (token) => {
		return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
	};

	static getUserIdFromToken = (req) => {
		let authToken = this.getTokenFromRequest(req);
		return this.parseJwt(authToken).id;
	};
}
