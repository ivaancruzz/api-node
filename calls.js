const fetch = require("cross-fetch")

async function getProducts() {
  return new Promise((resolve, reject) => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        res.json().then((data) => {
          resolve(data.products)
        })
      })
      .catch((e) => {
        reject(e)
      })
  })
}
async function getProduct(productId) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => {
        res.json().then((data) => {
          resolve(data)
        })
      })
      .catch((e) => {
        resolve(e.message)
      })
  })
}

module.exports = { getProduct, getProducts }
