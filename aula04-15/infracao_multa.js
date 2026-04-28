// 1. Você ESCOLHE a infração
const infracao = db.infracoes_ctb.findOne({ artigo: "218 I" });

// 👉 Aqui você decidiu qual infração aconteceu.

// 2. Você CRIA a multa com essa infração
db.multas.insertOne({
  lancamento: "ABC123",
  dataHora: new Date(),
  cidade_id: 10,

  infracao: {
    artigo: infracao.artigo,
    descricao: infracao.descricao,
    valor: infracao.valor,
    pontos: infracao.pontos,
    grau: infracao.grau
  }
});


// Exemplo Real:

const infracao = db.infracoes_ctb.findOne({ artigo: "214 IV" });

db.multas.insertOne({
  lancamento: new Date(),
  dataHora: new Date("2025-07-17T12:45:00Z"),
  cidade_id: ObjectId("69df99762139a1a5f95b7dca"),

  // você pode manter isso se já usa agregado
  cidade: [
    {
      _id: ObjectId("69df99762139a1a5f95b7dca"),
      nome_cidade: "Buriti do Tocantins",
      estado: "TO",
      nome_estado: "Tocantins"
    }
  ],

  // 🔥 AQUI ESTÁ A CONEXÃO
  infracao: {
    artigo: infracao.artigo,
    descricao: infracao.descricao,
    grau: infracao.grau,
    pontos: infracao.pontos,
    valor: infracao.valor
  }
});

//agora o embedding funciona:

 db.multas.aggregate([
     {
         $project:{
             _id: 1,
            lancamento: 1,
            dataHora: 1,
            cidade_id: 1,
           
            "infracao.descrição": 1,
            "infracao.valor": 1,
            "infracao.pontos": 1,
            "infracao.artigo": 1,
            "infracao.grau": 1
         }
     }
])


// script de migração:
// pega todas infrações em memória
const infracoes = db.infracoes_ctb.find().toArray();

db.multas.find().forEach(multa => {

  // 🎲 escolhe uma infração aleatória
  const infracaoAleatoria = infracoes[
    Math.floor(Math.random() * infracoes.length)
  ];

  // 🆕 cria nova multa já com embed
  db.multas_com_infracao.insertOne({
    lancamento: multa.lancamento,
    dataHora: multa.dataHora,
    cidade_id: multa.cidade_id,
    cidade: multa.cidade,

    infracao: {
      artigo: infracaoAleatoria.artigo,
      descricao: infracaoAleatoria.descricao,
      grau: infracaoAleatoria.grau,
      pontos: infracaoAleatoria.pontos,
      valor: infracaoAleatoria.valor
    }
  });

});