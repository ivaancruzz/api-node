const express = require("express")
const api = require("./calls")
const app = express()
const port = 3000
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.locals.viewProducts = false

app.post("/compuya", async (req, res) => {
  app.locals.viewProducts = false

  const body = req.body
  console.log(body)
  console.log(body.Message)

  if (
    body.Message === "Volver" ||
    body.Message === "Salir" ||
    body.Message === "Consultar"
  ) {
    if (body.Message === "Volver") {
      app.locals.viewProducts = true
    }
    res.send(
      JSON.stringify({
        Message: "",
        Type: 4,
        TypeUrl: null,
        Action: 0,
        Tags: [],
        Note: "",
      })
    )

    return
  }

  if (body.Message === "a" && !app.locals.viewProducts) {
    app.locals.viewProducts = true
  } else {
    app.locals.viewProducts = false
  }

  if (app.locals.viewProducts) {
    const products = await api.getProducts()
    res.send(sendMessageAllProducts(products))
  } else {
    const regex = /^[0-9]*$/
    const isNumber = regex.test(body.Message)

    if (!isNumber) {
      res.send(
        JSON.stringify({
          Message: "La opción no es válida. Ingrese el número correcto.",
          Type: 4,
          TypeUrl: null,
          Action: 1,
          Tags: [],
          Note: "",
        })
      )

      return
    }

    const product = await api.getProduct(body.Message)

    res.send(viewProduct(product))
  }
})

function sendMessageAllProducts(products, res) {
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
