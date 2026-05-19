//use loja;

db.createCollection("produtos");

// Obs se eu não criasse uma colletion o prórpio 
// insertMany criaria a coleção, mas como o exercício 
// pede para criar a coleção, eu criei antes de 
// inserir os dados.

db.produtos.insertMany([
    {
        "_id": 1,
        "nome": "Notebook Dell",
        "categoria": "Eletrônicos",
        "preco": 4500,
        "estoque": 15,
        "avaliacao": 4.7
    },
    {
        "_id": 2,
        "nome": "Smartphone Samsung",
        "categoria": "Eletrônicos",
        "preco": 2500,
        "estoque": 30,
        "avaliacao": 4.5
    },
    {
        "_id": 3,
        "nome": "Cadeira Gamer",
        "categoria": "Móveis",
        "preco": 1200,
        "estoque": 10,
        "avaliacao": 4.8
    },
    {
        "_id": 4,
        "nome": "Mesa Escritório",
        "categoria": "Móveis",
        "preco": 900,
        "estoque": 25,
        "avaliacao": 4.2
    },
    {
        "_id": 5,
        "nome": "Monitor LG",
        "categoria": "Eletrônicos",
        "preco": 1800,
        "estoque": 12,
        "avaliacao": 4.6
    },
    {
        "_id": 6,
        "nome": "Teclado Mecânico",
        "categoria": "Periféricos",
        "preco": 350,
        "estoque": 50,
        "avaliacao": 4.4
    },
    {
        "_id": 7,
        "nome": "Mouse Gamer",
        "categoria": "Periféricos",
        "preco": 220,
        "estoque": 40
    },
    {
        "_id": 8,
        "nome": "Sofá Retrátil",
        "categoria": "Móveis",
        "preco": 3200,
        "estoque": 5,
        "avaliacao": 4.9
    },
    {
        "_id": 9,
        "nome": "Fone Bluetooth",
        "categoria": "Eletrônicos",
        "preco": 600,
        "estoque": 35
    },
    {
        "_id": 10,
        "nome": "Impressora HP",
        "categoria": "Informática",
        "preco": 2100,
        "estoque": 8,
        "avaliacao": 4.1
    }
]);

// 1. Listar todos os produtos com preço maior ou igual a R$ 2000,00.
db.produtos.find({
    "preco": { "$gte": 2000 }
});

// 2. Listar os produtos da categoria "Móveis" com avaliação maior que 4.5.
db.produtos.find({
    "$and": [
        { "categoria": "Móveis" },
        { "avaliacao": { "$gt": 4.5 } }
    ]
});

// 3. Listar os produtos que estão com estoque maior que 20 ou preço menor que R$ 2000,00.
db.produtos.find({
    "$or": [
        { "preco": { "$lt": 2000 } },
        { "estoque": { "$gt": 20 } }
    ]
});

// 4. Listar os produtos que possuem avaliação, ou seja, que têm o campo "avaliacao" presente.
db.produtos.find({ "avaliacao": { "$exists": true }
});