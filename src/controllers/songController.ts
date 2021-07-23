import { Response, Request } from "express";
import { getSong, validateYouTubeUrl } from "../services/songServices";
import * as songRepository from "../repositories/songRepository";
import connection from "../database";
import { resolveSoa } from "dns";

export async function create(req: Request, res: Response) {
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

export async function upVote(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const notExistingSong = await songRepository.getById(id);
    if (notExistingSong === 0) {
      return res.sendStatus(409);
    }

    await songRepository.plusOneVote(id);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function downVote(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const notExistingSong = await songRepository.getById(id);
    if (notExistingSong === 0) {
      return res.sendStatus(409);
    }

    const result = await songRepository.lessOneVote(id);

    if (result.score < -5) {
      await songRepository.deleteSong(id);
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getRecommendation(req: Request, res: Response) {
  try {
    const ramdom = Math.random();

    const result = await getSong(ramdom);

    if (result === undefined) {
      return res.sendStatus(404);
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getByAmount(req: Request, res: Response) {
  try {
    const amount = parseInt(req.params.amount);
    console.log(amount);

    const result = await songRepository.getAmount(amount);
    console.log(result);

    if (result === null) {
      return res.sendStatus(404);
    }

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
