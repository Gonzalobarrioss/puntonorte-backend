const axios = require("axios");

async function saveLead(data) {

  try {

    await axios.post(
      "http://localhost:5678/webhook/lead",
     // "http://localhost:5678/webhook-test/lead",
      data
    );

  } catch (error) {

    console.log(error);

  }

}

module.exports = {
  saveLead,
};