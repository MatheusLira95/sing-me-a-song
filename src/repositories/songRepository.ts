import connection from "../database";

export async function create(name: string, youtubeLink: string, score: number) {
  await connection.query(
    `
    INSERT INTO songs ("name", "youtubeLink", "score") VALUES ($1, $2, $3)
  `,
    [name, youtubeLink, score]
  );
}
