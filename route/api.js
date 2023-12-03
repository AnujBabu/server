const express = require('express')
const routers = express.Router()
const SignInSchema = require('../modal/SignInSchema')
const TableSchema = require('../modal/tableSchema')

routers.post('/signin', async (request, response) => {
  const { email, password } = request.body;
  console.log("req", request.body)
  const usersEm = await SignInSchema.findOne({ email: email })
  if (usersEm == null) {
    response.status(400).send({
      message: "Your Email id does not exist"
    })
  } else {
    const usersPw = await SignInSchema.findOne({ email: email, password: password })
    if (!usersPw) {
      response.status(400).send({ message: "Correct Your Password" })
    } else {
      response.status(200).json({ data: usersPw })
    }
  }
})

routers.post("/signup", async (request, response) => {
  console.log(request.body)
  const usersEm = await SignInSchema.findOne({ email: request.body.email })
  // console.log("schemaValue",usersEm)
  if (usersEm == null) {
    const user = new SignInSchema(request.body)
    console.log(user)
    try {
      user.save();
      response.status(200).json({ data: user })
    } catch (error) {
      response.status(500).send(error);
    }
  } else {
    response.status(422).send("Email already exist");
  }
});


routers.get("/get-tableData", async (request, response) => {
  try {
    const users = await TableSchema.find({}).limit(10);
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});



routers.post("/add-user", async (request, response) => {
  const duplicateData = await TableSchema.findOne({ email: request.body.email })
  if (duplicateData == null) {
    const user = new TableSchema(request.body);
    try {
      user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
  } else {
    response.status(422).send("Email already exist");
  }
});


routers.put('/update', async (request, response) => {
  console.log(request.body)
  const { name, age, email, mobile, address, designation, _id } = request.body;
  try {
    const result = await TableSchema.findByIdAndUpdate({ _id: _id }, { $set: { name: name, age: age, email: email, mobile: mobile, address: address, designation: designation } })
    console.log(result)
    response.send(result)
  }
  catch (error) {
    response.status(400).json({ message: error.message })
  }
})

routers.delete('/delete/:id', async (request, response) => {
  console.log(request.params.id)

  try {
    const data = await TableSchema.findByIdAndDelete(request.params.id);
    response.status(200).json(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    response.status(400).json({ message: error.message })
  }
})
module.exports = routers