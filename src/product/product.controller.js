// handle request,response,dan validasi body

const express = require("express")
const prisma = require("../db")
const { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct, patchProduct } = require("./product.service")

const router = express.Router()

router.get("/", async(req, res) => {
  const products = await getAllProducts()

  res.send(products)
})

router.get("/:id", async (req, res) => {

    try {
        if (typeof id !== "number") {
            throw Error("okehh")
          }
     const productId = parseInt(req.params.id)
     const product = await getProductById(parseInt(productId))
   
     res.send(product)
 } catch (error) {
    res.status(400).send(error.message)
 }
})

router.post("/", async(req, res) => {
    const newProductData = req.body
    const product = await addProduct(newProductData)

  res.status(201).send({
      data: product,
      message: "Create Product Success"
  })
})

router.delete("/:id", async(req, res) => {
  const productId = parseInt(req.params.id)

    await deleteProduct(productId)

  res.send("Delete successfully")
})

router.put("/:id", async(req, res) => {
  const productId = parseInt(req.params.id)
    const productData = req.body
    
    if (!(productData.image && productData.name && productData.price && productData.description)){
        return res.status(400).send("okeh")
    }

    const product = await updateProduct(productId, productData)
    res.send(product)

  // if (!(productData.image && productData.name && productData.price && productData.description)) {
  //     return res.status(400).send("kocak lu")
  // }

  // await prisma.product.update({
  //     where: {
  //         id: parseInt(productId)
  //     },
  //     data: {
  //         description: productData.description,
  //         image: productData.image,
  //         price: productData.price,
  //         name: productData.name
  //     }
  // })
  // res.status(200).send("Update Product Successfully")
})

router.patch("/:id", async(req, res) => {
  const productId = parseInt(req.params.id)
  const productData = req.body

  const product = await patchProduct(productId,productData)
    res.status(200).send({
        data: product,
        message: "Patch Product Successfully"
    }
  )
})

module.exports = router