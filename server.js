
import bodyParser from 'koa-bodyparser';
import cache from 'koa-redis-cache';
import Koa from 'koa';
import cors from '@koa/cors';
//import koaSwagger from 'koa2-swagger-ui';
import serve from 'koa-static';
import mongoose from 'mongoose';
//import errorHandler from './middleware/error';
import router from './routes';

const PORT = 5000;
const app = new Koa();
app.use(cors());

const cacheOptions = {
  // 60 minutes
  expire: 60 * 60,
  redis: {
    host: '100.121.142.3',
  },
};


if (process.env.NODE_ENV === 'production') {
  app.use(cache(cacheOptions));
}

// Body Parser is used to parse POST request body
app.use(bodyParser());

// Routes
app.use(router());

app.use(serve('static'));

app.listen(PORT, () => {
  console.log('CORE API server running on port', PORT);
});

const connString = 'mongodb://localhost:27017/soccerPlayer';
const promise = mongoose.connect(connString, {
  useMongoClient: true,
});

promise.then(function(db) {
  console.log('logged on');
});

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + connString);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed through app termination');
        process.exit(0);
    });
});
module.exports = app;
