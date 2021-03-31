const express = require('express');
const server = express();
const router = require('./routes');

server.set('view engine', 'ejs');

// habilitar arquivos estáticos
server.use(express.static("public"));

// rotas
server.use(router);

// inicializando servidor
server.listen(3000, () => console.log('Server Running...'));
