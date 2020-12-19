import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import router from './router';
import config from './config/config';
/* eslint no-underscore-dangle: 0 */
const __dirname = path.resolve();

const app = express();
app.use(cookieParser());

// const PORT = 3000;

app.use(express.static(path.join(__dirname, 'src/client')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/aassets', express.static('assets'));
app.use(router);

console.log(`Started nodejs server on ${config.PORT} port`);
app.listen(config.PORT);
