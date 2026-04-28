db.veiculos.aggregate([
    {
        $unwind: "$marca"
    },
    {
        $project:{
            _id: 0,
            modelo: 1,
            ano: 1,
            renavan: 1,
            placa: 1,
            cor: 1
        }
    },
    {
        $out: "veiculos_certo"
    }
])


