import { Router } from "express";
import Regiao from "./models/regiao.js";
import User from "./models/User.js";
import pet from "./models/pet.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { isAuthenticated } from "./middleware/auth.js";


const router = Router();

router.get('/', (req, res) => res.redirect('/index.html'));

router.get('/pets', async (req, res) => {
  const pets = await pet.readAll();

  res.json(pets);
});

router.get('/pet', async (req, res) => {
  
  const gender = req.query.gender;

  let pets = [];

  if (gender)
    pets = await pet.ReadBygender(gender)
 else 
    pets = await pet.readAll();
  
 /* if (gender)
    pets = await Pet.ReadByFilter(pets)
  else 
    pets = await Pet.readAll();

  if (size)
    pets = await Pet.ReadByFilter(pets)
  else 
    pets = await Pet.readAll();

  if (species)
    pets = await Pet.ReadByFilter(pets)
  else 
    pets = await Pet.readAll(); */

  res.json(pets);
 });


router.post('/pet', isAuthenticated, async (req, res) => {
  try {
  const pet = req.body;

  const newPet = await pet.create(pet);

  // console.log('New', newMeliponario)

  res.json(newPet);
  } catch(error) {
    throw new Error('Error in create Pet');
  }
});

router.put('/pet/:id', isAuthenticated, async (req, res) => {
   try {
  const id = Number(req.params.id);

  const pet = req.body;

  const newPet = await pet.update(pet, id);

  if (newPet) {
    res.json(newPet);
  } else {
    res.status(400).json({ error: 'Pet não encontrado.' });
  }
  } catch(error) {
    throw new Error('Error in update Pet');
 }
});

router.delete('/pet/:id', isAuthenticated, async (req, res) => {
   try {
  const id = Number(req.params.id);

  if (await pet.destroy(id)) {
    res.status(204).send();
  } else {
    res.status(400).json({ error: 'Pet não encontrado.' });
  }
 } catch(error) {
    throw new Error('Error in delete Pet');
 }
});

router.get('/regioes', async (req, res) => {
  try {
  const regioes = await Regiao.readAll();

  res.json(regioes);
   } catch(error) {
    throw new Error('Error in list regioes');
  }  
});

router.post('/users', async (req, res) => {
  try {
    const user = req.body;

    const newUser = await User.create(user);

    res.json(newUser);
  } catch(error) {
    throw new Error('Error in create user');
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.readByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const { id: userId, password: hash } = user;

    const match = await bcrypt.compareSync(password, hash);

    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.SECRET,
        { expiresIn: 3600 } // 1h
      );

      res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch(error) {
    res.status(401).json({ error: 'User not found' });
  }
});


router.use(function(req, res, next) {
  res.status(404).json({
    message: 'Content not found'
  });
});

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something broke!'
  });
});

export default router;