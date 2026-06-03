for (let i = 0; i < 100000; i++) {

    db.usuarios.insertOne({
        nome: `Usuario${i}`,
        email: `usuario${i}@email.com`,
        idade: Math.floor(Math.random() * 80) + 18

    });

}

// Query sem indice
db.usuarios.find({
    email: "usuario50000@email.com"
}).explain("executionStats");

// Adicionando um indice no campo email
db.usuarios.createIndex({ email: 1 });

// Verificando se o indice foi criado
db.usuarios.getIndexes();

// Query utilizando o indice
db.usuarios.find({
    email: "usuario50000@email.com"
}).explain("executionStats");