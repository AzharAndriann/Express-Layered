// komunikasi dengan data base

const prisma = require("../db")

const findProducts = async () => {
  const products = await prisma.product.findMany()

  return products
}

const findProduct = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    }
  })

  return product
}

const insertProduct = async (newProductData) => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      price: newProductData.price
  }
  })
}

module.exports = {
  findProducts,
  findProduct,
  insertProduct
}