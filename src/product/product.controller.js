// handle request,response,dan validasi body

const express = require("express")

const router = express.Router()

router.get("/", async(req, res) => {
  const products = await prisma.product.findMany()

  res.send(products)
})

router.get("/:id", async(req, res) => {
  const productId = req.params.id
  const product = await prisma.product.findUnique({
      where: {
          id: +productId
      }
  })

  if (!product) {
      res.status(400).send("gada kocak")
  }

  res.send(product)
})

router.post("/", async(req, res) => {
  const newProductData = req.body
  const product = await prisma.product.create({
      data: {
          name: newProductData.name,
          description: newProductData.description,
          image: newProductData.image,
          price: newProductData.price
      }
  })
  res.status(201).send({
      data: product,
      message: "Create Product Success"
  })
})

router.delete("/:id", async(req, res) => {
  const productId = req.params.id

  await prisma.product.delete({
      where: {
          id: parseInt(productId)
      }
  })

  res.send("Delete successfully")
})

router.put("/:id", async(req, res) => {
  const productId = req.params.id
  const productData = req.body

  if (productData.image && productData.name && productData.price && productData.description) {
      await prisma.product.update({
          where: {
              id: parseInt(productId)
          },
          data: {
              description: productData.description,
              image: productData.image,
              price: productData.price,
              name: productData.name
          }
      })
      res.status(200).send("Update Product Successfully")
  } else {
      // throw new Error("kocak lu")
      res.status(400).send("kocak lu")
  }

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
  const productId = req.params.id
  const productData = req.body

  await prisma.product.update({
      where: {
          id: parseInt(productId)
      },
      data: {
          description: productData.description,
          image: productData.image,
          price: productData.price,
          name: productData.name
      }
  })
  res.status(200).send("Patch Product Successfully")
})

module.exports = router