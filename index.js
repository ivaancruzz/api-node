const flow = require("./catalog_flow")
const test = require("./tests")

const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

app.post("/", async (req, res) => {
  const body = req.body

  // await flow.startFlow(res, body)

  // res.send(test.testSendImage())
  // res.send(test.testSendVideo())
  // res.send(test.testSendAudio())
  // res.send(test.testSendFile())
  res.send(test.testSendText())
  // res.send(test.testActionContinue())
  // res.send(test.testActionWait())
  // res.send(test.testActionAssignOperator())
  // res.send(test.testActionEndConversation())
  // res.send(test.testTags())
  // res.send(test.testNote())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
