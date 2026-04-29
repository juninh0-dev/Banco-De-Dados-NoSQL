// 1
db.heroes.insertMany([
    {_id: 1, name: "Spider-Man", city: "New York", power: ["Agility", "Web-Shooting"], defeatedVillains: 50},
    {_id: 2, name: "Batman", city: "Gotham", power: ["Agility", "Detective"], defeatedVillains: 500},
    {_id: 3, name: "Wonder woman", city: "Themyscira", power: ["Agility", "Lasso"], defeatedVillains: 150},
]);

//a)
db.heroes.updateOne(
    { name: "Spider-Man" },
    { $push: { power: "Sentido Aranha Aprimorado"}}
)

//b)
db.heroes.updateOne(
    { name: "Batman" },
    { $set: {defeatedVillains: 510}}
)

//c)
db.heroes.updateOne(
    { name: "Wonder woman"},
    { $set: { city: "Amazonia"}}
)

//d) 
db.heroes.updateOne(
    { name: "Batman" },
    { $pull: { power: "Detective"}}
)

// 2

db.menu.insertMany([
    { _id: 1, dish: "Pizza", ingredients: ["Dough", "Tomato Sauce", "Cheese"], price: 30 },
    { _id: 2, dish: "Sushi", ingredients: ["Rice", "Fish", "Seaweed"], price: 40 },
    { _id: 3, dish: "Taco", ingredients: ["Tortilla", "Beef", "Cheese"], price: 15 },
]);

//a 
db.menu.updateMany(
  {},
  { $mul: { price: 1.1 } }
)

//b
db.menu.updateOne(
    { dish: "Taco" },
    { $push: {ingredients: "Guacamole"}}
)

//c 
db.menu.updateOne(
    { dish: "Sushi" },
    { $set: { price: 35 }}
)

//d
db.menu.updateOne(
    { dish: "Taco" },
    { $pull: { ingredients: "beef"} }
)

db.menu.updateOne(
    { dish: "Taco" },
    { $set: { ingredients: "Chicken"} }
)