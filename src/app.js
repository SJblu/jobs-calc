const express = require('express');
const app = express();
const router = require('./routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

// habilitar arquivos estáticos
app.use(express.static("public"));

// habilitar req.body
app.use(express.urlencoded({ extended: true }));

// rotas
app.use(router);

// inicializando servidor
app.listen(3000, () => console.log('Server Running...'));
