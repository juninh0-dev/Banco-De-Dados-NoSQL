//use loja;

db.createCollection("produtos");

// Obs se eu não criasse uma colletion o prórpio 
// insertMany criaria a coleção, mas como o exercício 
// pede para criar a coleção, eu criei antes de 
// inserir os dados.

db.produtos.insertMany([{
    "_id": 1,
    "nome": "Notebook Dell",
    "descricao": "",
    "categoria": "Eletrônicos",
    "preco": 4500,
    "estoque": 15,
    "avaliacoes": 4.7
},
{
    "_id": 2,
    "nome": "Smartphone Samsung",
    "categoria": "Eletrônicos",
    "preco": 2500,
    "estoque": 30,
    "avaliacoes": 4.5
},
{
    "_id": 3,
    "nome": "Cadeira Gamer",
    "categoria": "Móveis",
    "preco": 1200,
    "estoque": 10,
    "avaliacoes": 4.8
}
]);

