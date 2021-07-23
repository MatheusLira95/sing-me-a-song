import connection from "../../src/database";

export async function clearDatabase() {
  await connection.query(`
    TRUNCATE songs RESTART IDENTITY;
  `);
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

export async function insertSong(song: {
  name: string;
  youtubeLink: string;
  score: number;
}) {
  await connection.query(
    `
    INSERT INTO songs ("name", "youtubeLink", "score") VALUES ($1, $2, $3);
  `,
    [song.name, song.youtubeLink, song.score]
  );
}
