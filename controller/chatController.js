const sessions = require("../store/sessions");

let waitingForLead = false;

const {
  saveLead,
} = require("../utils/saveLead");

const {
  generateResponse,
} = require("../services/geminiService");

async function handleChat(req, res) {

  try {

   const userMessage = String(
  req.body.message || ""
);

    console.log(userMessage);
console.log(typeof userMessage);

    const userId = req.body.userId;

    if (!sessions[userId]) {

  sessions[userId] = {
    waitingForLead: false,
  };

}

    if (sessions[userId].waitingForLead) {

  saveLead({
    contact: userMessage,
    date: new Date(),
  });

  sessions[userId].waitingForLead = false;

  return res.json({
    reply:
      "¡Perfecto! 🚀 Ya recibimos tus datos. Te vamos a contactar pronto.",
  });

}

    const lowerMessage = userMessage.toLowerCase();

const interested =

  lowerMessage.includes("me interesa clase") ||
  lowerMessage.includes("clase") ||
  lowerMessage.includes("quiero empezar") ||  
  lowerMessage.includes("anotarme");

if (interested) {

  sessions[userId].waitingForLead = true;

  return res.json({
    reply:
      "¡Genial! 😊 Pasanos tu nombre y teléfono y un asesor te va a contactar. O acercate a cualquiera de nuestras sucursales https://powergym.com/sucursales",
  });

}

    const reply = await generateResponse(userMessage);

    res.json({
      reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error en controlador",
    });

  }

}

module.exports = {
  handleChat,
};