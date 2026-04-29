db.multa.insertMany([
    {
        // Brasilândia do Tocantins
        lancamento: new Date(),
        dataHora: new Date("2025-07-15T14:30:00"),
        cidade_id: ObjectId("69df99762139a1a5f95b7dc8")
    },
    {
        // Brejinho de Nazaré
        lancamento: new Date(),
        dataHora: new Date("2025-07-16T10:15:00"),
        cidade_id: ObjectId("69df99762139a1a5f95b7dc9")
    },
    {
        // Buriti do Tocantins
        lancamento: new Date(),
        dataHora: new Date("2025-07-17T09:45:00"),
        cidade_id: ObjectId("69df99762139a1a5f95b7dca")
    },
    {
        // Cachoeirinha
        lancamento: new Date(),
        dataHora: new Date("2025-07-18T16:20:00"),
        cidade_id: ObjectId("69df99762139a1a5f95b7dcb")
    },
    {
        // Campos Lindos
        lancamento: new Date(),
        dataHora: new Date("2025-07-19T11:10:00"),
        cidade_id: ObjectId("69df99762139a1a5f95b7dcc")
    },
    {
        // Cariri do Tocantins
        lancamento: new Date(),
        dataHora: new Date("2025-07-20T13:55:00"),
        cidade_id: ObjectId("69df99762139a1a5f95b7dcd")
    },
    {
        // Carmolândia
        lancamento: new Date(),
        dataHora: new Date("2025-07-21T08:30:00"),
        cidade_id: ObjectId("69df99762139a1a5f95b7dce")
    },
    {
        // Carrasco Bonito
        lancamento: new Date(),
        dataHora: new Date("2025-07-22T17:40:00"),
        cidade_id: ObjectId("69df99762139a1a5f95b7dcf")
    },
    {
        // Caseara
        lancamento: new Date(),
        dataHora: new Date("2025-07-23T12:25:00"),
        cidade_id: ObjectId("69df99762139a1a5f95b7dd0")
    },
    {
        // Bernardo Sayão
        lancamento: new Date(),
        dataHora: new Date("2025-07-24T15:00:00"),
        cidade_id: ObjectId("69df99762139a1a5f95b7dc6")
    }
])

db.multa.aggregate([
    {
        $lookup: {
            from: "Cidades_certa",
            localField: "cidade_id",
            foreignField: "_id",
            as: "cidade"
        }
    },
    {
        $out: "multas"
    }
])


// db.multas_com_infracao.aggregate([
//     {
//         $addFields: {
//             agenteId: "AGT1001"
//         }
//     },
//     {
//         $lookup: {
//             from: "agentes",
//             localField: "agenteId",
//             foreignField: "matricula",
//             as: "agente_id"
//         }
//     }
// ])


db.multas_com_infracao.updateMany(
  {},
  [
    {
      $set: {
        agenteId: {
          $add: [
            { $floor: { $multiply: [{ $rand: {} }, 10] } },
            1
          ]
        }
      }
    }
  ]
);

// 💥 O que isso faz
// $rand → número entre 0 e 1
// * 10 → vira 0 a 9.999
// $floor → vira 0 a 9
// + 1 → vira 1 a 10

db.pessoas.aggregate([
    {
         $lookup: {
            from: "multas_com_infracao",
            localField: "_id",
            foreignField: "", // <- aqui está o ajuste
            as: "dados_marca",
        }
    }
])