import { Request, Response } from "express";
export let index = (req: Request, res: Response) => {
  res.render("timeline/timeline", {
    title: "Home"
  });
};
