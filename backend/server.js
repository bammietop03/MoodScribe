import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

configDotenv();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', router);

app.use((req, res, next) => {
  res.status(404).send('404 - Page Not Found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
