'use strict';

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

// Crie um app Express.
const app = express();

// Configuracao request body JSON parsing.
app.use(express.json());

//Setup Morgan que nos dá o registro de requisições HTTP. 
app.use(morgan('dev'));

// Configure uma saudação amigável para a rota raiz. 
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo ao  projeto validação de API REST com Express!',
  });
});

// Adicionar routes.
app.use('/api', routes);

// enviar 404 se nenhuma outra rota é correspondente
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Setup a global error handler.
app.use((err, req, res, next) => {
  console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

// Set our port.
app.set('port', process.env.PORT || 5000);

// Start listening on our port.
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
