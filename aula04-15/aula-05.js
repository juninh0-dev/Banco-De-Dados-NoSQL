//crie o banco e use
// use Big_data;

// insira 100 000 usuarios
for (let i = 0; i < 100000; i++){
  db.usuarios.insertOne({
    nome: `Usuario${i}`,
    email: `usuario${i}@email.com`,
    idade: Math.floor(Math.random() * 80) + 18
  });
}

// utilize o find para o tempo de execução
db.usuarios.find({}).explain("executionStats")

// utilize o find para a pior possibilidade O()
db.usuarios.find({email: "usuario100000@email.com"}).explain("executionStats")

// crie um index 
db.usuarios.createIndex({ email:1 })

//execute e veja a melhora nos resultados
db.usuarios.find({email: "usuario100000@email.com"}).explain("executionStats")

// ao criar um index para string caso seja apenas uma palavra, tipo Nome: user1, não ganhará desempenho
// pois ele funciona quando são várias palavras.