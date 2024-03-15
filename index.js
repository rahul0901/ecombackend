import express from 'express';
import routes from './Routers/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

// app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', function (req, res) {
    res.send('Hi ecomm backend')
})

app.use('/api/v1', routes)

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

mongoose.connect(process.env.MongoUrl).then(() => console.log('database connected!'))

app.listen(8000, () => console.log('port running on 8000'))