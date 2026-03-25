// 1 - use biblioteca_fatec;

// 2 -
db.createCollection("livros");

// 3 -
db.autores.insertOne([
    {
        nome: "Jorge Amado",
        nacionalidade: "Brasileiro"
    }
]);

db.alunos.insertOne([
    {
        nome: "Maria Silva",
        curso: "Sistemas de Informação",
        anoIngresso: 2020,
        ativo: true
    }
]);

//Comentário apenas para ajeitar o commit