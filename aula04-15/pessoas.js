db.pessoa.updateMany(
  {},
  {$set: {veiculos: []}}
)

db.pessoa.updateOne(
  { _id: 1 },
  {
    $set: {
      veiculos: [
        { veiculoId: 101, modelo: "Toyota Corolla", ano: 2020, placa: "BRA2E19" },
        { veiculoId: 102, modelo: "Honda CG 160", ano: 2022, placa: "QWE4R56" }
      ]
    }
  }
);

db.pessoa.updateOne(
  { _id: 2 },
  {
    $set: {
      veiculos: [
        { veiculoId: 103, modelo: "Volkswagen Gol", ano: 2018, placa: "ABC1D23" }
      ]
    }
  }
);

db.pessoa.updateOne(
  { _id: 3 },
  {
    $set: {
      veiculos: [
        { veiculoId: 104, modelo: "Fiat Uno", ano: 2015, placa: "XYZ9K88" },
        { veiculoId: 105, modelo: "Yamaha Fazer 250", ano: 2021, placa: "MNO7P65" }
      ]
    }
  }
);

db.pessoa.updateOne(
  { _id: 4 },
  {
    $set: {
      veiculos: [
        { veiculoId: 106, modelo: "Chevrolet Onix", ano: 2023, placa: "JKL5H32" }
      ]
    }
  }
);

db.pessoa.updateOne(
  { _id: 5 },
  {
    $set: {
      veiculos: [
        { veiculoId: 107, modelo: "Hyundai HB20", ano: 2019, placa: "FGH3J90" },
        { veiculoId: 108, modelo: "Jeep Renegade", ano: 2022, placa: "TRE6U77" }
      ]
    }
  }
);

db.pessoa.updateOne(
  { _id: 6 },
  {
    $set: {
      veiculos: [
        { veiculoId: 109, modelo: "Ford Ka", ano: 2017, placa: "POI8L21" }
      ]
    }
  }
);

db.pessoa.updateOne(
  { _id: 7 },
  {
    $set: {
      veiculos: [
        { veiculoId: 110, modelo: "Nissan Kicks", ano: 2021, placa: "VBN4X11" }
      ]
    }
  }
);

db.pessoa.updateOne(
  { _id: 8 },
  {
    $set: {
      veiculos: [
        { veiculoId: 111, modelo: "Renault Kwid", ano: 2020, placa: "CDE7F45" },
        { veiculoId: 112, modelo: "BMW G 310 R", ano: 2023, placa: "RTY2G54" }
      ]
    }
  }
);

db.pessoa.updateOne(
  { _id: 9 },
  {
    $set: {
      veiculos: [
        { veiculoId: 113, modelo: "Peugeot 208", ano: 2022, placa: "UIO6M78" }
      ]
    }
  }
);

db.pessoa.updateOne(
  { _id: 10 },
  {
    $set: {
      veiculos: [
        { veiculoId: 114, modelo: "Toyota Hilux", ano: 2021, placa: "PAS9N12" },
        { veiculoId: 115, modelo: "Honda Biz 125", ano: 2020, placa: "LKJ3W56" }
      ]
    }
  }
);

db.pessoa.aggregate([
    {
        $lookup:{
            from: "veiculos_marca",
            localField: "veiculos._id",
            foreignField: "_id", // <- aqui está o ajuste
            as: "veiculos_pessoa",
        }
    },
    {
        $out:"pessoas_certa"
    }
]
)

db.pessoas_certa.updateMany(
    {},
    { $unset: {veiculos: ""}}
)

//1)

