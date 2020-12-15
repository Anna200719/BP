import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './router';

const app = express();
app.use(cookieParser());

const PORT = 3000;

app.use('/', express.static('/Users/annaduchovny/Desktop/XiomaHomeWork/BP/src/client'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/aassets', express.static('assets'));
app.use(router);

console.log(`Started nodejs server on ${PORT} port`);
app.listen(PORT);
