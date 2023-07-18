const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

app.post("/compuya", (req, res) => {
  console.log(req)
  console.log(res)
  res.send(
    JSON.stringify({
      Message: "Mensaje que se enviará al contacto",
      Type: 0,
      TypeUrl:
        "https://media.revistagq.com/photos/5e1c38f56ebc30000824edeb/16:9/w_1920,c_limit/baby%20yoda%20yoda%20relacion%20jon%20favreau.jpg",
      Action: 1,
      Tags: [],
      Note: "",
    })
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
