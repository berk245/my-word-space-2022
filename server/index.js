import express from 'express'
import bodyParser from 'body-parser';
import userRoutes from '../server/routes/user.js'

const app = express();

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.status(200).send("This is home");
});

app.use("/user", userRoutes);


export default app;
