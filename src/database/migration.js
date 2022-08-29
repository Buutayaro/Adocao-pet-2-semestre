import Database from './database.js'

async function up() {
  const db = await Database.connect();

  const regioesSql = `
    CREATE TABLE regioes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      UF VARCHAR(18) NOT NULL
    )
  `;
  
  await db.run(regioesSql);
  
  const sql = `
    CREATE TABLE pet (
        codpets INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(20) NOT NULL,
        vaccine VARCHAR(20) NOT NULL,
        type VARCHAR(20) NOT NULL,
        ong VARCHAR(20) NOT NULL,
        gender VARCHAR(20) NOT NULL,
        comorb VARCHAR(20) NOT NULL,
        size VARCHAR(20),
        regioes_id INTEGER NOT NULL,
        FOREIGN KEY (regioes_id) REFERENCES regioes (id)
    )
    `;

  await db.run(sql);


 const usersSql = `
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(20) NOT NULL
    )
  `;

  db.run(usersSql);
}

export default { up };
