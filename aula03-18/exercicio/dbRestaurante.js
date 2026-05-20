//use restaurante;
db.createCollection("menu");

db.menu.insertMany([
    { _id: 1, dish: "Pizza", ingredients: ["Dough", "Tomato Sauce", "Cheese"], price: 30 },
    { _id: 2, dish: "Sushi", ingredients: ["Rice", "Fish", "Seaweed"], price: 40 },
    { _id: 3, dish: "Taco", ingredients: ["Tortilla", "Beef", "Cheese"], price: 15 }
]);

// a) Aumentar o preço de todos os pratos em 10%
db.menu.updateMany(
    {},
    { $mul: { price: 1.1 } }
);

// b) Adicionar um novo ingrediente "Guacamole" ao prato "Taco"
db.menu.updateOne(
    { _id: 3 },
    { $push: { ingredients: "Guacamole" } }
);

// c) Reajuste de preço para o prato "Sushi" para 35
db.menu.updateOne(
    { _id: 2 },
    { $set: { price: 35 } }
);

// d) Remover "Beef" dos ingredientes do prato "Taco"
db.menu.updateOne(
  { _id: 3 },
  { $pull: { ingredients: "Beef" } }
);

db.menu.updateOne(
  { _id: 3 },
  { $addToSet: { ingredients: "Chicken" } }
);