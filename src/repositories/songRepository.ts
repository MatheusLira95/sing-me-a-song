import connection from "../database";

export async function create(name: string, youtubeLink: string, score: number) {
  await connection.query(
    `
    INSERT INTO songs ("name", "youtubeLink", "score") VALUES ($1, $2, $3)
  `,
    [name, youtubeLink, score]
  );
}

export async function getById(id: number) {
  const result = await connection.query(
    ` SELECT * FROM songs WHERE id = $1
    `,
    [id]
  );
  return result.rows.length;
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

export async function lessOneVote(id: number) {
  const result = await connection.query(
    `
      UPDATE songs 
      SET score = score - 1
      WHERE id = $1
      RETURNING *;
    `,
    [id]
  );
  return result.rows[0];
}

export async function deleteSong(id: number) {
  const result = await connection.query(
    `
    DELETE FROM songs WHERE id = $1
    `,
    [id]
  );
}

export async function getTopRated() {
  const result = await connection.query(`
    SELECT * FROM songs WHERE score > 10 LIMIT 1;
  `);
  return result.rows[0];
}

export async function getLowRated() {
  const result = await connection.query(`
    SELECT * FROM songs WHERE score <= 10 LIMIT 1;
  `);
  return result.rows[0];
}

export async function getAmount(amount: number) {
  const result = await connection.query(
    `
    SELECT * FROM songs ORDER BY score DESC LIMIT $1;
  `,
    [amount]
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows;
}
