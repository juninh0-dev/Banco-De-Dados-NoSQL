db.cliente.insertMany([
    { 
        "_id": 101, 
        "nome": 
        "João", 
        "email": "joao@example.com" 

    },
    { 
        "_id": 102, 
        "nome": "Maria", 
        "email": "maria@example.com" 
    },
    { 
        "_id": 103, 
        "nome": "Pedro", 
        "email": "pedro@example.com" 
    },
    { 
        "_id": 104, 
        "nome": "Ana", 
        "email": "ana@example.com" 
    },
    { 
        "_id": 105, 
        "nome": "Lucas", 
        "email": "lucas@example.com" 
    }
]);

db.venda.insertMany([
    { 
        "_id": 1, 
        "cliente_id": 101, 
        "data_venda": ISODate("2024-01-10T10:00:00Z"), "mes": 1, "ano": 2024 
    },
    { 
        "_id": 2, 
        "cliente_id": 101, 
        "data_venda": ISODate("2024-02-05T12:00:00Z"), "mes": 2, "ano": 2024 
    },
    { 
        "_id": 3, 
        "cliente_id": 102, 
        "data_venda": ISODate("2024-01-20T14:00:00Z"), "mes": 1, "ano": 2024 
    },
    { 
        "_id": 4, 
        "cliente_id": 103, 
        "data_venda": ISODate("2024-03-01T09:00:00Z"), "mes": 3, "ano": 2024 
    },
    { 
        "_id": 5, 
        "cliente_id": 104, 
        "data_venda": ISODate("2024-02-15T16:00:00Z"), "mes": 2, "ano": 2024 
    },
    { 
        "_id": 6, 
        "cliente_id": 101, 
        "data_venda": ISODate("2024-03-18T11:00:00Z"), "mes": 3, "ano": 2024 
    },
    { 
        "_id": 7, 
        "cliente_id": 105, 
        "data_venda": ISODate("2024-01-25T18:00:00Z"), "mes": 1, "ano": 2024 
    },
    { 
        "_id": 8, 
        "cliente_id": 102, 
        "data_venda": ISODate("2024-02-28T13:00:00Z"), "mes": 2, "ano": 2024 
    }
]);

db.item.insertMany([
    { 
        "_id": 1, 
        "venda_id": 1, 
        "produto": "Notebook", 
        "quantidade": 1, 
        "valor_unitario": 3500 
    },
    { 
        "_id": 2, 
        "venda_id": 1, 
        "produto": "Mouse", 
        "quantidade": 2, 
        "valor_unitario": 50 
    },
    { 
        "_id": 3, 
        "venda_id": 2, 
        "produto": "Teclado", 
        "quantidade": 1,
        "valor_unitario": 150 
    },
    { 
        "_id": 4, 
        "venda_id": 3, 
        "produto": "Monitor", 
        "quantidade": 2, 
        "valor_unitario": 900 
    },
    { 
        "_id": 5, 
        "venda_id": 4, 
        "produto": "Headset", 
        "quantidade": 1, 
        "valor_unitario": 200 
    },
    { 
        "_id": 6, 
        "venda_id": 5, 
        "produto": "Cadeira Gamer", 
        "quantidade": 1, 
        "valor_unitario": 1200 
    },
    { 
        "_id": 7, 
        "venda_id": 6, 
        "produto": "Webcam", 
        "quantidade": 1, 
        "valor_unitario": 300 
    },
    { 
        "_id": 8, 
        "venda_id": 6, 
        "produto": "Microfone", 
        "quantidade": 1, 
        "valor_unitario": 400 
    },
    { 
        "_id": 9, 
        "venda_id": 7, 
        "produto": "Mousepad", 
        "quantidade": 3, 
        "valor_unitario": 30 
    },
    { 
        "_id": 10, 
        "venda_id": 8, 
        "produto": "SSD", 
        "quantidade": 2, 
        "valor_unitario": 500 
    }
]);

// 1 - Quantas vendas cada cliente realizou?
db.venda.aggregate([
    {
        $group: {_id: "$cliente_id", total_vendas: { $sum: 1 }}
    }
]);

// 2 - Média de Vendas por Produto
db.item.aggregate([
    {
        $group: {_id: "$produto", media_vendas: { $avg: "$quantidade" }}
    }
]);

// Listar Clientes que Compraram Mais de 5 Produtos
db.venda.aggregate([
    {
        $group: {_id: "$cliente_id", total_produtos: { $sum: "$quantidade" }}
    },
    {
        $match: { total_produtos: { $gt: 5 }}
    }
]);

// Top 3 Produtos Mais Vendidos
db.item.aggregate([
    {
        $group: {_id: "$produto", total_vendas: { $sum: "$quantidade" }}
    },
    {
        $sort: { total_vendas: -1 }
    },
    {
        $limit: 3
    }
]);

// Total de Vendas por Região
db.cliente.aggregate([
    {
        $lookup: {
            from: "venda",
            localField: "_id",
            foreignField: "cliente_id",
            as: "vendas"
        }
    },
    {
        $unwind: "$vendas"
    },
    {
        $group: {_id: "$regiao", total_vendas: { $sum: "$vendas.quantidade" }}
    }
]);