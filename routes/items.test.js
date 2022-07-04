process.env.NODE_ENV = "test";
// npm packages
const request = require("supertest");
// app imports
const app = require("../app");

let items = require("../fakeDb")

let item = { name: "chicken nuggets", price:30 }

beforeEach(async () => {
  items.push(item)
});

afterEach(async () => {
  items = []
});
// end afterEach

// GET /items - this should render a list of shopping items.

describe("GET /items", async function () {
    test("Gets a list of items", async function () {
      const response = await request(app).get(`/items`);
      const { items } = response.body;
      expect(response.statusCode).toBe(200);
      expect(items).toHaveLength(1);
    });
  });

//POST /items - this route should accept JSON data and add it to the shopping list.

describe(" POST /items", async function () {
    test("Posts a new item to items", async function () {
        const response = await request(app).post(`/items`).send({name: "jelly bean", price: 90});
        expect(response.statusCode).toBe(200);
        expect(items).toHavelength(1);
        expect(response.body.item.name).toEqual("jelly bean");
        expect(response.body.item.price).toEqual(90);

    });
});

//GET /items/:name - this route should display a single item’s name and price.

describe("GET /items/:name", async function () {
    test("Gets one item for items", async function () {
      const response = await request(app).get(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.item).toEqual(item);
    });
  
    test("Serves that 404 when it lo-key cant find the item", async function () {
      const response = await request(app).get(`/items/0`);
      expect(response.statusCode).toBe(404);
    });
  });

// PATCH /items/:name, this route should modify a single item’s name and/or price.

describe("PATCH /items/:name", async function () {
    test("Changes that silly lil items name or price up for funsies", async function () {
        const response = await request(app).patch(`/items/${item.name}`).send({name: "Lollipops"});
        expect(response.statusCode).toBe(200);
        expect(response.body.item.name).toEqual("Lollipops");
        expect(response.body.item.price).toEqual(30);
    })

    test("Serves that 404 when it lo-key cant find the item", async function () {
        const response = await request(app).get(`/items/0`);
        expect(response.statusCode).toBe(404);
      });
})

// DELETE /items/:name - this homeboi is gonna serve us by deleting what you tell it to delete. 

describe("DELETE /items/:name", async function () {
    test("Deletes one item", async function () {
      const response = await request(app)
        .delete(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Deleted" });
    });
  });