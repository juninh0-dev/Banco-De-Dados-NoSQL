db.cliente.insertMany([
    {
        "_id": 153,
        "nome": "João",
        "email": "joao@example.com"
    }
]);

db.venda.insertMany([
    {
        "_id": 1,
        "cliente_id": 153,
        "data_venda": ISODate("2024-01-15T10:00:00Z"),
        "mes": 1,
        "ano": 2024,
    }
]);

db.item.insertMany([
    {
        "_id": 1,
        "venda_id": 57,
        "produto": "Laptop",
        "quantidade": 2,
        "valor_unitario": 1200.00
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
