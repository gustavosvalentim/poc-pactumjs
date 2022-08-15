const { spec, mock } = require("pactum");

mock.addInteraction({
  strict: false,
  request: {
    method: "GET",
    path: "/get",
    queryParams: {
      id: "1",
      name: "Test product",
      cost: "10",
    },
  },
  stores: {
    ProductId: "req.queryParams.id",
  },
  response: {
    status: 200,
    body: {
      args: {
        id: "$S{ProductId}",
        name: "Test product",
        cost: "10.00",
      },
    },
  },
});

beforeEach(async () => {
  await mock.start(5001);
});

afterEach(async () => {
  await mock.stop();
});

it("should return product with id 1", async () => {
  await spec()
    .get("http://localhost:5000/products/1")
    .expectStatus(200)
    .expectJsonLike({
      id: "1",
    });
});

it("should return bad request", async () => {
  await spec().post("http://localhost:5000/products").expectStatus(400);
});
