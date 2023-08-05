const express = require('express');
const path = require('path');

const server = express();
const port = 3000;

//Built-in middleware to handle form data, JSON and static files
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

server.use('/', require('./routes/root.js'));
server.use('/cart', require('./routes/cart.js'));
server.use('/order', require('./routes/order.js'));


server.use('/api/list', require(path.join(__dirname, './routes/api/pizza.js')));
server.use('/api/allergen', require(path.join(__dirname, './routes/api/allergen.js')));
server.use('/api/order', require(path.join(__dirname, './routes/api/order.js')));

server.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, '..', 'frontend', 'views', '404.html'));
});

server.listen(port, () => {
  console.log(`Server running on ${port}`);
  console.log(`http://localhost:${port}`);
});
