const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductImg = require("../models/ProductImg");
require("../models");
let token;
let productId;

beforeAll(async () => {
  const credentials = {
    email: "gersongio052@gmail.com",
    password: "123",
  };

  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /products should create a product", async () => {
  const category = await Category.create({ name: "tech" });
  const product = {
    title: "Iphone",
    description: "best product",
    price: "123.9",
    categoryId: category.id,
  };

  const res = await request(app)
    .post("/products")
    .send(product)
    .set("Authorization", `Bearer ${token}`);
    productId = res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test("GET /products should get all the products", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /products/:id/images should set an image", async () => {
  const image = await ProductImg.create({
    url: "http://falselink.jpg",
    publicId: "false id",
  });

  const res = await request(app)
    .post(`/products/${productId}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`);
  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /products/:id should update a product", async () => {
  const updateProduct = {
    title: "The best actual product",
  };
  const res = await request(app)
    .put(`/products/${productId}`)
    .send(updateProduct)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateProduct.name);
});

test("DELETE /products/:id should delete a product", async () => {
  const res = await request(app)
    .delete(`/products/${productId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
