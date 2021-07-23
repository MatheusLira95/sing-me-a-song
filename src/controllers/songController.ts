import { Response, Request } from "express";
import { validateYouTubeUrl } from "../services/songServices";
import * as songRepository from "../repositories/songRepository";

async function create(req: Request, res: Response) {
  try {
    const { name, youtubeLink } = req.body;
    const validLink: boolean = validateYouTubeUrl(youtubeLink);

    if (!name || !youtubeLink || !validLink) {
      return res.sendStatus(409);
    }
    const score: number = 0;

    await songRepository.create(name, youtubeLink, score);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export { create };
