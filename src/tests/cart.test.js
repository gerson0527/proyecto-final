const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

let token;
let cartId;

beforeAll(async () => {
  const credentials = {
    email: "gersongio052@gmail.com",
    password: "123",
  };

  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /carts should create a new cart", async () => {
  const product = await Product.create({
    title: "Macbook",
    description: "best products",
    price: "121.9",
  });

  const cart = {
    productId: product.id,
    quantity: 3,
  };
  const res = await request(app)
    .post("/carts")
    .send(cart)
    .set("Authorization", `Bearer ${token}`);
  await product.destroy;
  cartId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /carts should get all the products in the cart", async () => {
  const res = await request(app)
    .get("/carts")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /carts should update the cart", async () => {
  const cartupdated = {
    quantity: 1,
  };
  const res = await request(app)
    .put(`/carts/${cartId}`)
    .send(cartupdated)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(cartupdated.quantity);
});

test("DELETE /carts/:id should delete a product in the cart", async () => {
  const res = await request(app)
    .delete(`/carts/${cartId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
