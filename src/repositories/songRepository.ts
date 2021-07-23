import connection from "../database";

export async function create(name: string, youtubeLink: string, score: number) {
  await connection.query(
    `
    INSERT INTO songs ("name", "youtubeLink", "score") VALUES ($1, $2, $3)
  `,
    [name, youtubeLink, score]
  );
}

export async function plusOneVote(id: number) {
  const result = await connection.query(
    `
      UPDATE songs 
      SET score = score + 1
      WHERE id = $1;
    `,
    [id]
  );
  return result.rows[0];
}

export async function getById(id: number) {
  const result = await connection.query(
    ` SELECT * FROM songs WHERE id = $1
    `,
    [id]
  );
  return result.rows.length;
}
