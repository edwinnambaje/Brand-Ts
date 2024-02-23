import express from 'express';
import swaggerUI from 'swagger-ui-express'
import swagger from './docConfig/swagger'
import connectToDatabase from './db';
import dotenv from 'dotenv';
import route from './routes';
import passport from 'passport';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT!, 10);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
connectToDatabase();

app.use(express.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger))
// require('./helper/passport')(passport)
app.use("/api", route);

export default app;
