import connection from "../../src/database";

export async function createSong() {
  const song: { name: string; youtubeLink: string; score: number } = {
    name: "That's Life - Frank Sinatra",
    youtubeLink: "https://www.youtube.com/watch?v=TnlPtaPxXfc",
    score: 0,
  };
  return song;
}

export async function createEmptyNameSong() {
  const song = {
    name: "",
    youtubeLink: "abc",
  };
  return song;
}
export async function createEmptyYoutubeLink() {
  const song = {
    name: "abc",
    youtubeLink: "",
  };
  return song;
}

export async function getSongById(
  id: number
): Promise<{ id: number; name: string; youtubeLink: string; score: number }> {
  const result = await connection.query(
    `
    SELECT * FROM songs WHERE id = $1
  `,
    [id]
  );
  return result.rows[0];
}

export async function scoreMinusFive(id: number) {
  const result = await connection.query(
    `
      UPDATE songs 
      SET score = -5
      WHERE id = $1
      RETURNING *;
    `,
    [id]
  );
  return result.rows[0];
}
