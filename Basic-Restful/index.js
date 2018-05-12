import express from 'express';
import mongoose, { mongo } from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = process.env.PORT || 3005;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CRMdb');

// body parser settings
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// using public to access static file
app.use(express.static('public'));

routes(app);

app.get('/', (req, res) => {
    res.send('This is initial node js and express boilerplate');
});

app.listen(PORT, () => {
    console.log(`This server has been running at localhost:${PORT}`);
});
