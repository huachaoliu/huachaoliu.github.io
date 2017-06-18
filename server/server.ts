import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as serveStatic from 'serve-static';

const port = process.env.PORT || 10000;
const app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(serveStatic(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => {
    console.log('server listening at port' + port + '///');
});