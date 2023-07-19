const express = require("express")
const api = require("./calls")
const app = express()
const port = 3000
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post("/compuya", async (req, res) => {
  const body = req.body
  console.log(body)
  console.log(body.Message)

  //   if (
  //     body.Message === "Volver" ||
  //     body.Message === "Salir" ||
  //     body.Message === "Consultar"
  //   ) {
  //     return res.send(
  //       JSON.stringify({
  //         Message: "",
  //         Type: 4,
  //         TypeUrl: null,
  //         Action: 0,
  //         Tags: [],
  //         Note: "",
  //       })
  //     )
  //   }

  if (body.Message === "a") {
    const products = await api.getProducts()
    const message = sendMessageAllProducts(products)
    return res.send(message)
  } else {
    console.log(body.Message, "AQUIIIIIII")

    const regex = /^[0-9]*$/
    const isNumber = regex.test(body.Message)

    if (!isNumber) {
      return res.send(
        JSON.stringify({
          Message: "La opción no es válida. Ingrese el número correcto.",
          Type: 4,
          TypeUrl: null,
          Action: 1,
          Tags: [],
          Note: "",
        })
      )
    }

    const product = await api.getProduct(body.Message)

    return res.send(viewProduct(product))
  }
})

function sendMessageAllProducts(products) {
  let displayMessage = "✨Catálogo de ProductosYa.com - Actualizado 2023✨\n\n"
  products.forEach((product, index) => {
    displayMessage += `${product.title}\n${product.description}\nPrecio: 💲${product.price}\n\n👉Responde: ${index} para ver más\n\n\n`
  })

  displayMessage += "Para volver escribe: Salir"
  return JSON.stringify({
    Message: displayMessage,
    Type: 4,
    TypeUrl: null,
    Action: 1,
    Tags: [],
    Note: "",
  })
}

function viewProduct(product) {
  const notFound = product["Message"]

  if (notFound) {
    return JSON.stringify({
      Message:
        "El producto que intenta ver no existe 🤷‍♂️.\n\nVea las opciones nuevamente y responda con el número adecuado 🙏",
      Type: 4,
      TypeUrl: null,
      Action: 1,
      Tags: [],
      Note: "",
    })
  }

  return JSON.stringify({
    Message: `${product.title}\n${product.description}\nPrecio: 💲${product.price}\n\nEscribe 'Volver' si quieres ver los productos nuevamente\n\nEscribe 'Consultar' para que un asesor te contacte\n\n\n`,
    Type: 0,
    TypeUrl: product.thumbnail,
    Action: 1,
    Tags: [],
    Note: "",
  })
}
