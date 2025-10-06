import express from 'express';
import 'dotenv/config'
import router from './router';
import { connectDb } from './config/db';
import cors from 'cors';
import { corsConfig } from './config/cors';

connectDb()

const app = express()

//cors
app.use(cors(corsConfig))

// Leer datos de formularios
app.use(express.json())
app.use('/', router)

export default app