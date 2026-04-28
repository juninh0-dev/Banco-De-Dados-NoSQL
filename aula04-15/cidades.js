db.Cidade.aggregate([
    // estágio 1
  {
    $unwind: "$estados" //desmembra
  },// estágio 2
  {
    $unwind: "$estados.cidades"
  },
  // define uma consulta
  {
    $project:{
        _id: 0, // 0 remove o array original
        nome_cidade: "$estados.cidades",
        estado: "$estados.sigla",
        nome_estado: "$estados.nome"
    }
  },
  // coloca em outra coleção
  {
    $out: "Cidades_certa"
  }

])

