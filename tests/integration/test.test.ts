import supertest from "supertest";
import faker from "faker";

import "../../src/setup";
import app from "../../src/app";
import {
  createEmptyNameSong,
  createEmptyYoutubeLink,
  createSong,
  getSongById,
} from "../factories/songFactory";
import { clearDatabase } from "../utils/databaseUtils";
import connection from "../../src/database";

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await connection.end();
});

describe("GET /test", () => {
  it('should answer with text "OK!" and status 200', async () => {
    const response = await supertest(app).get("/test");
    expect(response.text).toBe("OK!");
    expect(response.status).toBe(200);
  });
});

describe("POST /recommendations", () => {
  it("should return 201 for valid song entrance", async () => {
    const song = await createSong();
    const response = await supertest(app).post("/recommendations").send(song);
    expect(response.status).toBe(201);
  });
  it("should return 409 for empty name field entrance", async () => {
    const emptyName = createEmptyNameSong();
    const response = await supertest(app)
      .post("/recommendations")
      .send(emptyName);
    expect(response.status).toBe(409);
  });
  it("should return 409 for empty youtubeLink field entrance", async () => {
    const emptyYoutubeLink = createEmptyYoutubeLink();
    const response = await supertest(app)
      .post("/recommendations")
      .send(emptyYoutubeLink);
    expect(response.status).toBe(409);
  });
  it("should return 409 for invalid Youtube Link", async () => {
    const song = await createSong();
    song.youtubeLink = faker.internet.url();

    const response = await supertest(app).post("/recommendations").send(song);

    expect(response.status).toBe(409);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  it("should return 200 for valid song id and return 1 in score", async () => {
    const song = await createSong();
    await supertest(app).post("/recommendations").send(song);
    const newSong = await getSongById(1);

    expect(newSong.score).toEqual(0);

    const response = await supertest(app).post(
      `/recommendations/${newSong.id}/upvote`
    );
    const newScore = await getSongById(1);

    expect(newScore.score).toBe(1);
    expect(response.status).toBe(200);
  });
  it("should return 500 for invalid song id type", async () => {
    const id = "abc";

    const response = await supertest(app).post(`/recommendations/${id}/upvote`);
    expect(response.status).toBe(500);
  });
  it("should return 500 for invalid song id type", async () => {
    const id = 3;

    const response = await supertest(app).post(`/recommendations/${id}/upvote`);
    expect(response.status).toBe(409);
  });
});
