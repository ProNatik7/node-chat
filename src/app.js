const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const http = require('http');



const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

app.set('view engine', 'pug');
app.set('views', './src/views');

const port = process.end.port || 1337;

require("./chat-server")(io);


//Middleware => fonctions intermédiaires
app.use(morgan('tiny'));
app.use(helmet());



app.use(function (req, res, next)  {
    console.log('Le middleware');
    next();
});

app.use(express.static('./src/static'))

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/chat', (req, res) => {
    if (!req.query.pseudo) {
        return res.redirect('/');
    }
const pseudo = req.query.pseudo;

    res.render('chat', {pseudo});
});


// Démarrage du serveur Express en utilisant le port 9000
server.listen(port, function() {
    console.log(`Le serveur écoute sur http://localhost:${port}`);
});