db.users.insertMany({
  _id: 1,
  username: "joão",
  age:24,
  active:true,
  premium: false,
  hobbies: ["reading", "soccer"],
  task: [{title:"Complete project", status: "pending"}]
},{
  _id: 2,
  username: "alice",
  age:24,
  active:true,
  premium: false,
  hobbies: ["cleaning", "clothes"],
  task: [{title:"Cleaning dishes", status: "complete"}]
}, {
  _id: 3,
  username: "Carlos",
  age:24,
  active:true,
  premium: false,
  hobbies: ["cleaning", "balls"],
  task: [{title:"Cleaning dishes", status: "pending"}]
})