const express = require('express');
const path = require('path');

const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');
const Food = require('./model/foodSchema');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexão com o banco de dados estabelecida com sucesso'))
.catch(err => console.error('Erro ao conectar ao banco de dados:', err));


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
        if (!comidas) {
            return res.status(404).json({ error: 'Alimento não encontrado' });
          }
          res.json(comidas);
    }).catch( error =>{
        res.json('Error do servido');
        console.log(error)
    })
});


// Rota para Atualizar um alimento existente 
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
        if (!comidas) {
            return res.status(404).json({ error: 'Alimento não encontrado' });
          }
        res.json(comidas);
    }).catch( error =>{
        res.json('Error do servido');
        console.log(error)
    })
});

// Rota para Excluir um alimento 
app.delete('/api/foods/:id',async (req, res) => {
    const id = req.params.id;

    await Food.findByIdAndDelete(id)
    .then(comidas => {
        if (!comidas) {
            return res.status(404).json({ error: 'Comida não encontrada' });
          }
        res.json({ message: 'Comida excluída com sucesso' });

    }).catch( error =>{
        console.error('Erro ao excluir comida por ID:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor' });
    })
});


app.listen(port, () => {
    console.log(`Servidor Express em execução em http://localhost:${port}`);
});