const api = require("./calls")

async function startFlow(res, bodyResponse) {
  if (bodyResponse.Message === "a") {
    const products = await api.getProducts()
    return res.send(sendMessageAllProducts(products))
  } else {
    const regex = /^[0-9]*$/
    const isNumber = regex.test(bodyResponse.Message)

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

    const product = await api.getProduct(bodyResponse.Message)

    return res.send(viewProduct(product))
  }
}

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
  const notFound = product.message

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

module.exports = { startFlow }
