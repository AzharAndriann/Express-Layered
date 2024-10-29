const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")
dotenv.config()

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())


const productcontroller = require("./product/product.controller")
app.use("/products", productcontroller)

app.get("/api", (req, res) => {
    res.send("Hello World")
})




app.listen(PORT, () => {
    console.log("Expres API running in port: " + PORT)
})