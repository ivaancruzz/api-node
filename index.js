const flow = require("./catalog_flow")
const test = require("./tests")

const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

app.post("/", async (req, res) => {
  const body = req.body

  // await flow.startFlow(res, body)

  test.testSendImage(res)
  // test.testSendVideo(res)
  // test.testSendAudio(res)
  // test.testSendFile(res)
  // test.testSendText(res)
  // test.testActionContinue(res)
  // test.testActionWait(res)
  // test.testActionAssignOperator(res)
  // test.testActionEndConversation(res)
  // test.testTags(res)
  // test.testNote(res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
