import { Request, Response } from "express";
export let index = (req: Request, res: Response) => {
  res.render("ar/map", {
    title: "Home"
  });
};
