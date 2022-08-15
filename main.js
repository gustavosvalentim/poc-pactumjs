const app = require("express")();
const axios = require("axios").default;
const settings = require("./settings.json");

app.get("/products/:id", async (req, res) => {
  const endpointUrl =
    settings.api_url +
    "/get?" +
    new URLSearchParams({
      id: req.params.id,
      name: "Test product",
      cost: 10.0,
    });

  try {
    const response = await axios.get(endpointUrl);
    res.send(response.data.args);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/products", async (req, res) => {
  res.sendStatus(400);
});

app.listen(settings.port, "0.0.0.0", () => {
  console.log(`Listening to port ${settings.port}`);
});
