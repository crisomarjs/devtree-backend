import express from 'express';
import 'dotenv/config'
import router from './router';
import { connectDb } from './config/db';

connectDb()

const app = express()

// Leer datos de formularios
app.use(express.json())
app.use('/', router)

export default app