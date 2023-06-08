const request = require("supertest");
const app = require("../app");

let categoryId;
let token;

beforeAll(async () => {
  const credentials = {
    email: "gersongio052@gmail.com",
    password: "123",
  };

  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /categories should create one category", async () => {
  const category = {
    name: "sports",
  };

  const res = await request(app)
    .post("/categories")
    .send(category)
    .set("Authorization", `Bearer ${token}`);
  categoryId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /categories should return all the categories", async () => {
  const res = await request(app)
    .get("/categories")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /categories/:id should update a category", async () => {
  const updateCategory = {
    name: "Kenny",
  };
  const res = await request(app)
    .put(`/categories/${categoryId}`)
    .send(updateCategory)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateCategory.name);
});

test("DELETE /categories/:id should delete a category", async () => {
  const res = await request(app)
    .delete(`/categories/${categoryId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
