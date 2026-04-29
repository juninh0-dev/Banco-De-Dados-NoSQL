````md
# 📘 Resumo Progressivo — MongoDB (Slides 1 ao 6, com exemplos)

---

# 1. Apresentação e Conceitos NoSQL

O MongoDB faz parte do universo **NoSQL (Not Only SQL)**, criado para lidar melhor com grandes volumes de dados, flexibilidade estrutural e escalabilidade horizontal.

## 🔹 Principais categorias NoSQL:

### Chave-Valor
Armazena pares simples de chave e valor.

```json
{
  "usuario:1": "Anna"
}
````

👉 Exemplo: Redis

---

### Orientado a Documentos (MongoDB)

Armazena documentos JSON/BSON flexíveis.

```json
{
  "nome": "Anna",
  "idade": 28,
  "cidade": "Jaú"
}
```

---

### Orientado a Colunas

Organiza por colunas em vez de linhas.

👉 Exemplo: Cassandra

---

### Orientado a Grafos

Modela relações complexas.

```txt
Anna -> conhece -> Carlos
```

👉 Exemplo: Neo4j

---

# 2. Introdução ao MongoDB

## 🔹 Equivalência SQL vs MongoDB

| SQL            | MongoDB    |
| -------------- | ---------- |
| Banco de Dados | Database   |
| Tabela         | Collection |
| Linha          | Documento  |
| Coluna         | Campo      |

---

## 🔹 Exemplo de documento:

```json
{
  "_id": 1,
  "nome": "Carlos",
  "idade": 32
}
```

---

## 🔹 Inserção

### insertOne()

```js
db.usuarios.insertOne({
  nome: "Anna",
  idade: 28
});
```

---

### insertMany()

```js
db.usuarios.insertMany([
  { nome: "Carlos", idade: 32 },
  { nome: "Marina", idade: 25 }
]);
```

---

## 🔹 Consulta com projeção

```js
db.usuarios.find(
  {},
  { nome: 1, _id: 0 }
);
```

👉 Mostra apenas `nome`

---

# 3. Operadores

## 🔹 Comparação

### $eq (igual)

```js
db.usuarios.find({ idade: { $eq: 28 } });
```

### $gt (maior que)

```js
db.usuarios.find({ idade: { $gt: 18 } });
```

### $lte (menor ou igual)

```js
db.usuarios.find({ idade: { $lte: 30 } });
```

---

## 🔹 Lógicos

### $and

```js
db.usuarios.find({
  $and: [
    { idade: { $gt: 18 } },
    { cidade: "Jaú" }
  ]
});
```

### $or

```js
db.usuarios.find({
  $or: [
    { cidade: "Jaú" },
    { cidade: "Bauru" }
  ]
});
```

---

## 🔹 Elemento

### $exists

```js
db.usuarios.find({
  telefone: { $exists: true }
});
```

### $type

```js
db.usuarios.find({
  idade: { $type: "int" }
});
```

---

# 4. Modificando Estrutura de Documentos

## 🔹 $set (criar ou alterar campo)

```js
db.usuarios.updateOne(
  { nome: "Anna" },
  { $set: { idade: 29 } }
);
```

---

## 🔹 $push (adicionar em array)

```js
db.usuarios.updateOne(
  { nome: "Anna" },
  { $push: { hobbies: "Leitura" } }
);
```

---

## 🔹 deleteOne()

```js
db.usuarios.deleteOne({
  nome: "Carlos"
});
```

---

## 🔹 deleteMany()

```js
db.usuarios.deleteMany({
  idade: { $lt: 18 }
});
```

---

# 5. Índices

## 🔹 Índice textual

```js
db.usuarios.createIndex({
  nome: "text"
});
```

### Busca:

```js
db.usuarios.find({
  $text: { $search: "Anna" }
});
```

---

## 🔹 Índice geoespacial (2dsphere)

```js
db.locais.createIndex({
  localizacao: "2dsphere"
});
```

### Documento:

```json
{
  "nome": "Praça Central",
  "localizacao": {
    "type": "Point",
    "coordinates": [-49.0, -22.3]
  }
}
```

---

# 6. Agregação (Aggregation Pipeline)

A pipeline processa dados em etapas.

## 🔹 $match (filtra)

```js
db.multas.aggregate([
  {
    $match: {
      valor: { $gt: 200 }
    }
  }
]);
```

---

## 🔹 $group (agrupa)

```js
db.multas.aggregate([
  {
    $group: {
      _id: "$grau",
      total: { $sum: 1 }
    }
  }
]);
```

---

## 🔹 $project (seleciona campos)

```js
db.multas.aggregate([
  {
    $project: {
      artigo: 1,
      valor: 1
    }
  }
]);
```

---

## 🔹 $lookup (relacionamento entre coleções)

### Multa:

```json
{
  "agenteId": "AGT1001"
}
```

### Agente:

```json
{
  "matricula": "AGT1001",
  "nome": "Anna"
}
```

### Aggregate:

```js
db.multas.aggregate([
  {
    $lookup: {
      from: "agentes",
      localField: "agenteId",
      foreignField: "matricula",
      as: "agente"
    }
  }
]);
```

---

## 🔹 Referência vs Embedding

### Referência:

```json
{
  "agenteId": "AGT1001"
}
```

### Embedding:

```json
{
  "agente": {
    "matricula": "AGT1001",
    "nome": "Anna"
  }
}
```

---

# 🚀 Conclusão Geral

MongoDB prioriza:

✔️ Flexibilidade estrutural
✔️ Alta performance
✔️ Escalabilidade
✔️ Menos joins
✔️ Dados orientados a documentos

## 🔥 Regra prática:

👉 Dados muito relacionados e estáveis → Embedding
👉 Dados reutilizados ou independentes → Referência + Lookup

```
```
