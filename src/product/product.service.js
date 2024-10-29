const prisma = require("../db");
const { findProducts, findProduct, insertProduct } = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await findProduct(id)

  if (!product) {
    throw Error("okeh")
  }

  return product
}

const addProduct = async (newProductData) => {
  const product = await insertProduct(newProductData)
  return product
}

const deleteProduct = async (id) => {
  await getProductById(id)
  await prisma.product.delete({
    where: {
        id,
    }
})
}

const updateProduct = async (productId, productData) => {
  await getProductById(productId)
  
   const product =  await prisma.product.update({
        where: {
            id:parseInt(productId)
        },
        data: {
            description: productData.description,
            image: productData.image,
            price: productData.price,
            name: productData.name
        }
    })
    return product
}

const patchProduct = async (productId, productData) => {
  await getProductById(productId)

   const product =  await prisma.product.update({
        where: {
            id:parseInt(productId)
        },
        data: {
            description: productData.description,
            image: productData.image,
            price: productData.price,
            name: productData.name
        }
    })
    return product
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
  patchProduct
};
