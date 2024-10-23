const express = require("express")
const app = express()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Expres API running in port: " + PORT)
})