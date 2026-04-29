// db.veiculos.aggregate([
//     {
//         $project: {
//             _id: 0,
//             marca: 1,
//             modelo: 1,
//             cor: 1,
//         }

//     }
// ])


db.veiculos.aggregate([
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
            _id: 1,
            marca: 1
        }
    },
    {
        $group: {
            _id: "$marca"
        }
    },
    {
        $out: "marcas"
    }
])

// db.veiculos.aggregate([
//     {
//         $project: {
//             _id: 1,
//             marca: 1
//         }
//     },
//     {
//         $group: {
//             marca: 1
//         }
//     },
//     {
//         $out: "marcas"
//     }
// ])

// db.veiculos.updateMany(
//     { marca: "marcas.marca" },
//     { $set: {marcaId: "marca.id"}},
//     { $unset: { marca: "" } 
// });

db.veiculos.aggregate([
    {
        $lookup: {
            from: "marcas",
            localField: "marca",
            foreignField: "marca", // <- aqui está o ajuste
            as: "dados_marca",
        }
    },
    {
        $out: "veiculos_marca"
    }
]);


db.veiculos_marca.updateMany(
    {},
    { $unset: { marca: ""}}
);

db.veiculos_marca.updateMany(
    {},
    {$set: { multas : []}}
)

