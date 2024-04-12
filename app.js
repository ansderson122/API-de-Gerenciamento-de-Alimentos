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


// Rota para acessar tadas as comidas 
app.get('/api/foods',async (req, res) => {
    await Food.find()
    .then(comidas => {
        res.json(comidas)
    }).catch( error =>{
        res.json('Error do servido');
        console.log(error)
    })
});

// Rota para criar comida 
app.post('/api/foods',async (req, res) => {
    const comidas =new Food({
        name: req.body.name,
        category: req.body.category,
        quantity:  req.body.quantity,
        expirationDate:req.body.expirationDate,
        price:req.body.price
    })

    await comidas.save()
    .then(comidas => {
        res.json(comidas)
    }).catch( error =>{
        res.json('Error do servido');
        console.log(error)
    })
});

// Rota para busca comidas pela id 
app.get('/api/foods/:id',async (req, res) => {
    const id = req.params.id;

    await Food.findById(id)
    .then(comidas => {
        res.json(comidas)
    }).catch( error =>{
        res.json('Error do servido');
        console.log(error)
    })
});


// Rota para busca comidas pela id 
app.put('/api/foods/:id',async (req, res) => {
    const id = req.params.id;
    const comidas ={
        name: req.body.name,
        category: req.body.category,
        quantity:  req.body.quantity,
        expirationDate:req.body.expirationDate,
        price:req.body.price
    }
    

    await Food.findByIdAndUpdate(id, comidas, { new: true })
    .then(comidas => {
        res.json(comidas)
    }).catch( error =>{
        res.json('Error do servido');
        console.log(error)
    })
});


app.listen(port, () => {
    console.log(`Servidor Express em execução em http://localhost:${port}`);
});