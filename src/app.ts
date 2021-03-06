import express, { Request, Response } from "express";
import cors from "cors";
import * as songController from "./controllers/songController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("OK!");
});
app.post("/recommendations", songController.create);

app.post("/recommendations/:id/upvote", songController.upVote);

app.post("/recommendations/:id/downvote", songController.downVote);

app.get("/recommendations/random", songController.getRecommendation);

app.get("/recommendations/top/:amount", songController.getByAmount);
export default app;
