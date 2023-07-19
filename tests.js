function testSendImage() {
  return JSON.stringify({
    Message: "Mensaje con imagen",
    Type: 0,
    TypeUrl:
      "https://media.revistagq.com/photos/5e1c38f56ebc30000824edeb/16:9/w_1920,c_limit/baby%20yoda%20yoda%20relacion%20jon%20favreau.jpg",
    Action: 0,
    Tags: [],
    Note: "",
  })
}

function testSendVideo() {
  return JSON.stringify({
    Message: "Mensaje con video",
    Type: 1,
    TypeUrl: "https://video-links.b-cdn.net/media/videolinks/video/PrismFX.mp4",
    Action: 0,
    Tags: [],
    Note: "",
  })
}

function testSendAudio() {
  return JSON.stringify({
    Message: "Mensaje con audio",
    Type: 2,
    TypeUrl:
      "http://soundfxcenter.com/video-games/counter-strike/8d82b5_Counter_Strike_Ok_Lets_Go_Sound_Effect.mp3",
    Action: 0,
    Tags: [],
    Note: "",
  })
}

function testSendFile() {
  return JSON.stringify({
    Message: "Mensaje con archivo",
    Type: 3,
    TypeUrl: "https://www.africau.edu/images/default/sample.pdf",
    Action: 0,
    Tags: [],
    Note: "",
  })
}

function testSendText() {
  return JSON.stringify({
    Message: "Mensaje con texto",
    Type: 4,
    TypeUrl: null,
    Action: 0,
    Tags: [],
    Note: "",
  })
}

function testActionContinue() {
  return JSON.stringify({
    Message: "Sigo al siguiente flujo...",
    Type: 4,
    TypeUrl: null,
    Action: 0,
    Tags: [],
    Note: "",
  })
}

function testActionWait() {
  return JSON.stringify({
    Message: "Espero la puesta y vuelvo a llamar al endpoint",
    Type: 4,
    TypeUrl: null,
    Action: 1,
    Tags: [],
    Note: "",
  })
}

function testActionAssignOperator() {
  return JSON.stringify({
    Message: "Te pondré en espera...",
    Type: 4,
    TypeUrl: null,
    Action: 4,
    Tags: [],
    Note: "",
  })
}

function testActionEndConversation() {
  return JSON.stringify({
    Message: "Termino con la conversación",
    Type: 4,
    TypeUrl: null,
    Action: 7,
    Tags: [],
    Note: "",
  })
}

function testTags() {
  return JSON.stringify({
    Message: "Asigno tags",
    Type: 4,
    TypeUrl: null,
    Action: 0,
    Tags: [
      "2471e0d0-491b-ee11-a9bb-000d3a561a92,",
      "a0027652-ad72-ea11-a94c-000d3a123fac",
    ],
    Note: "",
  })
}

function testNote() {
  return JSON.stringify({
    Message: "Añado nota a esta conversación",
    Type: 4,
    TypeUrl: null,
    Action: 0,
    Tags: [],
    Note: "Hola, esta es una nota desde el nodo api",
  })
}

module.exports = {
  testSendImage,
  testSendVideo,
  testSendAudio,
  testSendFile,
  testSendText,
  testActionContinue,
  testActionWait,
  testActionAssignOperator,
  testActionEndConversation,
  testTags,
  testNote,
}
