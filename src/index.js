/* @flow*/
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';


const app = express();
const upload = multer();

//static 서버 구성
app.use( express.static( __dirname + '/../public' ) );

app.use( morgan( 'dev' ) );

app.use( bodyParser.json() );

app.use( bodyParser.urlencoded( { extended: true } ) );



app.listen( 7080, () => {
   console.log('server is listening on port 7080');
});

// sample routes
app.get('/hello', ( req, res ) => {
   res.send('world');
});

app.get('/add/:x/:y', ( req, res ) => {
   const x = req.params.x * 1;
   const y = req.params.y * 1;

   res.send( { sum: x + y });
});