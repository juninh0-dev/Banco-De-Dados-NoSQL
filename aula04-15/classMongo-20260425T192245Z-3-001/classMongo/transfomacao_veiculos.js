db.veiculo_rascunho.aggregate([
    {
        $project: {
            _id: 0,
            marca: 1,
            modelo: 1,
            cor: 1,
        }

    }
])


db.veiculo_rascunho.aggregate([
    {
        $match: { marca: "Ford" }
    },
    {
        $project: {
            _id: 1,
            marca: 1,
            modelo: 1,
            cor: 1,
        }

    }
])

db.veiculos.aggregate([
    {
        $project: {
            _id: 0,
            marca: 1
        }
    },
    {
        $group: {
            _id: "$marca"
        }
    }
])
db.veiculos.aggregate([
    {
        $project: {
            _id: 0,
            marca: 1
        }
    },
    {
        $group: {
            marca: 1
        }
    },
    {
        $out: "marcas"
    }
])

// db.veiculo_rascunho.updateMany(
//     { marca: "marcas.marca" },
//     { $set: {marcaId: "marca.id"}},
//     { $unset: { marca: "" } 
// });

db.veiculos.aggregate([
    {
        $lookup: {
            from: "marcas",
            localField: "marca",
            foreignField: "marca",
            as: "dados_marca",
        }
    },
    {
        $limit: 2,
    }
]);