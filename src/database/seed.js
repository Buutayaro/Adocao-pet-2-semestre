import { resolve } from 'path';
import { readFileSync} from 'fs';
import Pet from '../models/pet.js';
import Regiao from '../models/regiao.js';



async function up() {
  const file = resolve(process.cwd(), "src", "database", "seeders.json");

  const content = JSON.parse(readFileSync(file));

  for (const regiao of content.regioes) {
      await Regiao.create(regiao);
  }
  
  for (const pet of content.pets) {
    await Pet.create(pet);
  }
}

export default { up };