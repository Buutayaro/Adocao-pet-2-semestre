import 'express-async-errors';
import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import router from './routes.js';

//import Meliponario from './database/Meliponario.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(router);

app.listen(port, () => console.log('Server is running!'));