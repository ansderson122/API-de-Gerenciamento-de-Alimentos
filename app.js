const express = require('express');
const path = require('path');

const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');
const Food = require('./model/foodSchema');


const dbURI = 'mongodb+srv://usuario:alh84001@cluster0.i9u9cjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado com sucesso ao MongoDB'))
  .catch(err => console.log(err));


app.use(bodyParser.json());
app.use(cors()); 
app.use(express.static(path.join(__dirname, '/Capas')));





app.listen(port, () => {
    console.log(`Servidor Express em execução em http://localhost:${port}`);
});