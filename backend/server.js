import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
import { configDotenv } from 'dotenv';
import cors from 'cors';

configDotenv();


const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
  
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/', router);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
