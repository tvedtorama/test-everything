import { Router } from "express";
import { htmlTemplate } from "./HtmlTemplate";

/** Adds an express handler for the gui */
export const setupAdminGui = (router: Router) =>
	router.get("/gui", [async (req: Request, res) => {
		res.send(htmlTemplate({body: "", title: "Hello", bundleName: "index"}))
	}])
