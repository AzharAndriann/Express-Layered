const express = require("express")
const dotenv = require("dotenv")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()
dotenv.config()

const PORT = process.env.PORT

app.use(express.json())


const productcontroller = require("./product/product.controller")
app.use("/products", productcontroller)

app.get("/api", (req, res) => {
    res.send("Hello World")
})




app.listen(PORT, () => {
    console.log("Expres API running in port: " + PORT)
})