// ======================================================
// OBSERVAÇÃO GERAL:
// Usei aggregate() quando a pergunta exige:
// - contagem
// - agrupamento
// - ranking
// - joins ($lookup)
//
// find() sozinho serve melhor para:
// - buscar documentos
// - filtrar registros simples
//
// Como suas perguntas são analíticas (tipo relatório),
// aggregate é o mais adequado na maioria.
// ======================================================



// ======================================================
// 1) Qual modelo de carro tem mais multas?
// aggregate foi usado porque precisa agrupar por modelo
// e contar quantidade de multas por grupo.
// ======================================================
db.multas.aggregate([
  {
    $lookup: {
      from: "veiculos_marca",
      localField: "veiculo_id",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $group: {
      _id: "$veiculo.modelo",
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } },
  { $limit: 1 }
]);



// ======================================================
// 2) Quantas multas por cidade?
// aggregate porque precisa GROUP BY cidade.
// ======================================================
db.multas.aggregate([
  {
    $group: {
      _id: "$cidade",
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } }
]);



// ======================================================
// 3) Qual é a infração mais aplicada?
// aggregate porque precisa contar repetições.
// ======================================================
db.multas.aggregate([
  {
    $group: {
      _id: "$infracao",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);



// ======================================================
// 4) Qual mês do ano tem mais multas?
// aggregate porque precisa extrair mês da data e agrupar.
// ======================================================
db.multas.aggregate([
  {
    $group: {
      _id: { $month: "$data_multa" },
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);



// ======================================================
// 5) Qual é a cor de veículo mais multada?
// aggregate + lookup porque multas e cor estão
// em coleções diferentes.
// ======================================================
db.multas.aggregate([
  {
    $lookup: {
      from: "veiculos_marca",
      localField: "veiculo_id",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $group: {
      _id: "$veiculo.cor",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);



// ======================================================
// 6) Qual agente aplica mais multas?
// aggregate para contar por agente.
// ======================================================
db.multas.aggregate([
  {
    $group: {
      _id: "$agente",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);



// ======================================================
// 7) Qual sexo é mais multado?
// aggregate + lookup porque sexo está em pessoa.
// ======================================================
db.multas.aggregate([
  {
    $lookup: {
      from: "pessoa",
      localField: "pessoa_id",
      foreignField: "_id",
      as: "pessoa"
    }
  },
  { $unwind: "$pessoa" },
  {
    $group: {
      _id: "$pessoa.sexo",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);



// ======================================================
// 8) Qual marca de carro os homens preferem?
// aggregate porque:
// - filtra homens
// - percorre array de veículos
// - faz lookup
// - agrupa por marca
// ======================================================
db.pessoa.aggregate([
  { $match: { sexo: "Masculino" } },
  { $unwind: "$veiculos" },
  {
    $lookup: {
      from: "veiculos_marca",
      localField: "veiculos._id",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $group: {
      _id: { $arrayElemAt: ["$veiculo.dados_marca._id", 0] },
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);



// ======================================================
// 9) Qual cor de carro as mulheres mais preferem?
// Mesmo raciocínio da anterior.
// ======================================================
db.pessoa.aggregate([
  { $match: { sexo: "Feminino" } },
  { $unwind: "$veiculos" },
  {
    $lookup: {
      from: "veiculos_marca",
      localField: "veiculos._id",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $group: {
      _id: "$veiculo.cor",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);



// ======================================================
// 10) Ranking dos veículos mais multados
// aggregate porque ranking exige group + sort.
// ======================================================
db.multas.aggregate([
  {
    $lookup: {
      from: "veiculos_marca",
      localField: "veiculo_id",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $group: {
      _id: {
        modelo: "$veiculo.modelo",
        placa: "$veiculo.placa"
      },
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } }
]);



// ======================================================
// EXEMPLO DE find() (consulta simples)
// Aqui NÃO precisa aggregate porque é só filtro:
// ======================================================
db.multas.find(
  { cidade: "São Paulo" }
);