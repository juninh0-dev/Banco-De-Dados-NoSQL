// Parte 1 - Criação de Banco de Dados 

// 1 - use biblioteca_fatec;

// 2 -
db.createCollection("livros");

// 3 -
db.autores.insertOne({
    nome: "Jorge Amado",
    nacionalidade: "Brasileiro"
});
// 4 -
db.alunos.insertOne({
    nome: "Maria Silva",
    curso: "Sistemas de Informação",
    anoIngresso: 2020,
    ativo: true
});

// Parte 2 - Inserção de Documentos

// 5 -
db.livros.insertOne({
    titulo: "FNAF Into the pit",
    anoPublicacao: 2019,
    genero: "Terror",
    paginas: 112,
    disponivel: true
});

// 6 -
db.livros.inserMany([
    {
        titulo: "Manga One Piece",
        anoPublicacao: 1997,
        genero: "Aventura",
        paginas: 1000,
        disponivel: true
    },
    {
        titulo: "Manga Naruto",
        anoPublicacao: 1999,
        genero: "Aventura",
        paginas: 900,
        disponivel: true
    },
    {
        titulo: "Manga Dragon Ball",
        anoPublicacao: 1984,
        genero: "Aventura",
        paginas: 800,
        disponivel: true
    }

]);

// 7 - 
db.autores.insertMany([
    {
        nome: "Eiichiro Oda",
        nacionalidade: "Japonês",
        livrosPublicados: ["One Piece"]
    },
    {
        nome: "Masashi Kishimoto",
        nacionalidade: "Japonês",
        livrosPublicados: ["Naruto"]
    },
    {
        nome: "Akira Toriyama",
        nacionalidade: "Japonês",
        livrosPublicados: ["Dragon Ball"]
    }
]);

// Parte 3 - Subdocumentos

// 8 -
db.livros.insertOne({
    titulo: "Manga Bleach",
    autor: {
        nome: "Tite Kubo",
        nacionalidade: "Japonês"
    }
});

// 9 -
db.livros.insertOne({
    titulo: "Manga Death Note",
    autores: [
        {
            nome: "Tsugumi Ohba",
            nacionalidade: "Japonês"
        },
        {
            nome: "Takeshi Obata",
            nacionalidade: "Japonês"
        }
    ]
});

// 10 -
db.alunos.insertOne({
    nome: "Carlos Pereira",
    contratos: {
        email: "carlos.pereira@email.com",
        telefone: "14999999999"
    }

});

// Parte 4 - Arrays e Estruturas Mais Complexas

// 11 -
db.livros.insertOne({
    titulo: "Manga Attack on Titan",
    categorias: ["Ação", "Drama", "Fantasia"],
    palavrasChave: ["Titãs", "Guerra", "Humanidade"]
});

// 12 -
db.createCollection("emprestimos");
db.emprestimos.insertOne({
    aluno: {
        nome: "Carlos Pereira",
        curso: "Sistemas de Informação",
    },
    livros: [
        {
            titulo: "Castelo Animado",
        }
    ],
    dataEmprestimo: new Date(),
    dataDevolucao: null
});

// 13 -
db.emprestimos.inserMany([{
    aluno: {
        nome: "Maria Silva",
        curso: "Sistemas de Informação",
    },
    livros: [
        {
            titulo: "FNAF Into the pit",
        }
    ],
    dataEmprestimo: new Date(),
    dataDevolucao: null
},
{
    aluno: {
        nome: "Carlos Pereira",
        curso: "Sistemas de Informação",
    },
    livros: [
        {
            titulo: "Vinland Saga",
        }
    ],
    dataEmprestimo: new Date(),
    dataDevolucao: null
}, {
    aluno: {
        nome: "Maria Silva",
        curso: "Sistemas de Informação",
    },
    livros: [
        {
            titulo: "As Cronicas de Nárnia",
        }
    ],
    dataEmprestimo: new Date(),
    dataDevolucao: null
}]);

// Parte 5 - Atualização

// 14 -
db.livros.updateOne(
    { titulo: "FNAF Into the pit" },
    { $set: { disponivel: false } }
);

// 15 -
db.livros.updateOne(
    { titulo: "Manga One Piece" },
    { $push: { categorias: ["Aventura"] } }
);

// 16 -
db.livros.updateOne(
    { titulo: "Manga One Piece" },
    { $inc: { vezesEmprestado: 1 } }
);

// 17 -
db.livros.updateMany(
    { genero: "Aventura" },
    { $set: { disponivel: true } }
);

// 18 -
db.livros.deleteOne(
    { titulo: "Manga Dragon Ball" },
    { $pull: { palavrasChave: "Guerra" } }
);

// Parte 6 - Remoção

// 19 -
db.emprestimos.deleteOne(
    { aluno: { nome: "Carlos Pereira" } }
);
db.emprestimos.deleteOne(
    { status: "Atrasado" }
);

// 20 -
db.livros.deleteMany(
    { paginas: { $lt: 100 } }
);
db.livros.deleteMany(
    { genero: "Terror" }
);