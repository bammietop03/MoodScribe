import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
import { configDotenv } from 'dotenv';

configDotenv();


const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/', router);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
