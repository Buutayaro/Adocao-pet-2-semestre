import Database from '../database/database.js';

async function readAll() {
  const db = await Database.connect();

  const sql = `
     SELECT 
      m.codpets, m.name, m.vaccine, m.type, m.ong, m.gender, m.comorb, m.size, r.UF as regiao
    FROM 
      pet as m INNER JOIN regioes as r
    ON
      m.regioes_id = r.id
   ` ;

  const pets = await db.all(sql);
  console.log(pets);
  return pets;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT 
      m.codpets, m.name, m.vaccine, m.type, m.ong, m.gender, m.comorb, m.size, r.UF as regiao
    FROM 
      pet as m INNER JOIN regioes as r
    ON
      m.regioes_id = r.id
    WHERE
      m.codpets = ?
  `;

  const pet = await db.get(sql, [id]);

  return pet;
}

async function create(pet) {
  const db = await Database.connect();

  const { name, vaccine, type, ong, gender, comorb, size, regioes_id } = pet;

  const sql = `
    INSERT INTO
      pet (name, vaccine, type, ong, gender, comorb, size, regioes_id)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const {lastID} = await db.run(sql, [name, vaccine, type, ong, gender, comorb, size, regioes_id]);

  // const newMeliponario = await read(lastID);
    // console.log('New', lastID, newMeliponario)
  const newPet = {codpets: lastID, ...pet};

  return newPet;
}

async function update(pet, id) {
  const db = await Database.connect();

  const { name, vaccine, type, ong, gender, comorb, size, regiao_id } = pet;

  const sql = `
    UPDATE 
      pet
    SET
      name = ?, vaccine = ?, type = ?, ong =?, gender = ?, comorb = ?, size = ?, regioes_id = ?
    WHERE
      codpets = ?
  `;

  const { changes } = await db.run(sql, [name, vaccine, type, ong, gender, comorb, size, regiao_id, codpets]);

  if (changes === 1) {
    return read(codpets);
  } else {
    return false;
  }
}

async function destroy(id) {
  const db = await Database.connect();

  const sql = `
    DELETE FROM
      pet
    WHERE
      codpets = ?
  `;

  const { changes } = await db.run(sql, [id]);

  return changes === 1;
}

async function ReadBygender(gender) {
 const db = await Database.connect();

  const sql = `
    SELECT 
      *
    FROM
     pet
    WHERE
     gender = ?
`;

 const pet = await db.all(sql, [gender]);

 return pet;
  
}

export default { readAll, read, create, update, destroy, ReadBygender };