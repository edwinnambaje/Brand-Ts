import express from 'express';
import connectToDatabase from './db';
import dotenv from 'dotenv';
import route from './routes';
import passport from 'passport';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT!, 10);

connectToDatabase();

app.use(express.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// require('./helper/passport')(passport)
app.use("/api", route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
