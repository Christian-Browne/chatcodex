import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

// imprts env variables
dotenv.config();
/* ************************************************ */

// Openai Config
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/* ************************************************ */

// initializes express
const app = express();

// setup middlewear (make cross orgin request, to allows server to be called from frontend)
app.use(cors());

// Pass json from frontend to the backend
app.use(express.json());

// dummy root route
app.get('/', async (req, res) => {
  res.status(200).send({ message: 'Hello from Codex' });
});

// request & response
app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

app.listen(8080, () =>
  console.log(`AI server started on http://localhost:8080`)
);
