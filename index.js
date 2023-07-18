const fetch = require("cross-fetch")
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

app.post("/compuya", async (req, res) => {
  const body = req.body

  const products = await getProducts()

  res.send(sendMessageAllProducts(products))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

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

function sendMessageAllProducts(products, res) {
  let displayMessage = ""
  products.forEach((product, index) => {
    displayMessage += `${product.title}\n${product.description}\nPrecio: ${product.price}\n\nResponde: ${index} para ver más\n\n\n`
  })
  return JSON.stringify({
    Message: displayMessage,
    Type: 4,
    TypeUrl: null,
    Action: 1,
    Tags: [],
    Note: "",
  })
}
