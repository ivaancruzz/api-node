const api = require("./calls")

async function startFlow(res, bodyResponse) {
  if (bodyResponse.message === "a") {
    const products = await api.getProducts()
    return res.send(sendMessageAllProducts(products))
  } else {
    const regex = /^[0-9]*$/
    const isNumber = regex.test(bodyResponse.message)

    if (!isNumber) {
      return res.send(
        JSON.stringify({
          message: "La opción no es válida. Ingrese el número correcto.",
          type: 4,
          typeUrl: null,
          action: 1,
          tags: [],
          note: "",
        })
      )
    }

    const product = await api.getProduct(bodyResponse.message)

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
    message: displayMessage,
    type: 4,
    typeUrl: null,
    action: 1,
    tags: [],
    note: "",
  })
}

function viewProduct(product) {
  const notFound = product.message

  if (notFound) {
    return JSON.stringify({
      message:
        "El producto que intenta ver no existe 🤷‍♂️.\n\nVea las opciones nuevamente y responda con el número adecuado 🙏",
      type: 4,
      typeUrl: null,
      action: 1,
      tags: [],
      note: "",
    })
  }

  return JSON.stringify({
    message: `${product.title}\n${product.description}\nPrecio: 💲${product.price}\n\nEscribe 'Volver' si quieres ver los productos nuevamente\n\nEscribe 'Consultar' para que un asesor te contacte\n\n\n`,
    type: 0,
    typeUrl: product.thumbnail,
    action: 1,
    tags: [],
    note: "",
  })
}

module.exports = { startFlow }
