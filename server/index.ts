import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config'

import routes from './routes';
import sequelize from './db';
import { User } from './interfaces/Auth';

const app = express();
const port = process.env.PORT || 8000;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

async function startServer() {
  try {
    console.log('connecting with database')
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('connected with database')

    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  } catch(error) {
    console.log('Database connection error');
    process.exit(1)
  }
}


app.use(routes);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: "Something went wrong while accessing server" });
});


startServer();

export default app;
