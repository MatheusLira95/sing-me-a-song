import supertest from "supertest";
import faker from "faker";

import "../../src/setup";
import app from "../../src/app";
import {
  createEmptyNameSong,
  createEmptyYoutubeLink,
  createSong,
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
