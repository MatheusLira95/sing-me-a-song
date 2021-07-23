import connection from "../../src/database";

async function clearDatabase() {
  await connection.query(`
    TRUNCATE songs RESTART IDENTITY;
  `);
}

export { clearDatabase };
