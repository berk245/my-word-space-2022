const request = require("supertest");
const makeApp = require("../app.js");
const database = require("../config/database");

const app = makeApp({
  ...database,
  //Some Mocks Here
});

describe("Notebooks route", () => {
  describe("Should return errors if", () => {
    test("get-all-notebooks request is missing a user identifier", async () => {
      const response = await request(app)
        .get("/notebooks/get-all")
        .send({ userId: "" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Missing required fields" });
    });
    test("add-new-notebook request is missing a user identifier or a notebook name", async () => {
      let bodyData = [
        {
          userId: "test-username",
          notebookName: "",
        },
        {
          userId: "",
          notebookName: "test-password",
        },
        {},
      ];
      for (const body in bodyData) {
        const response = await request(app).post("/notebooks/add").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("edit-notebook request is missing a user id or a notebook identifier or a new name for the notebook", async () => {
      let bodyData = [
        {
          userId: 1,
          newNotebookName: "update-name",
          notebookId: "",
        },
        {
          userId: 1,
          newNotebookName: "",
          notebookId: 3,
        },
        {
          userId: "",
          newNotebookName: "update-name",
          notebookId: 3,
        },
        {},
      ];
      for (const body in bodyData) {
        const response = await request(app).post("/notebooks/edit").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });

    test("edit-notebook request is made with a notebook id that does not exist", async () => {
      const response = await request(app).post("/notebooks/edit").send({
        userId: 1,
        newNotebookName: "update-name",
        notebookId: "n/a",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Could not find the notebook" });
    });
    test("delete-notebook request is missing a notebook or user identifier", async () => {
      let bodyData = [
        {
          userId: 1,
          notebookId: "",
        },
        {
          userId: "",
          notebookId: 3,
        },
        {},
      ];
      for (const body in bodyData) {
        const response = await request(app).delete("/notebooks/delete").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("delete-notebook request is made with a notebook id that does not exist", async () => {
      const response = await request(app).delete("/notebooks/delete").send({
        userId: 1,
        notebookId: "n/a",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Could not find the notebook" });
    });
  });
  test("should return all notebooks of a specific user", async () => {
    const response = await request(app)
      .get("/notebooks/get-all")
      .send({ userId: 3 });
    expect(response.statusCode).toBe(200);
    expect(response.body.notebooks).toBeDefined();
  });

  test("should succesfuly update the name of an existing notebook", async () => {
    const response = await request(app).post("/notebooks/add").send({
      userId: 3,
      notebookId: 1,
      newNotebookName: "New name",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Update succesful" });
  });
  test("should succesfuly delete an existing notebook", async () => {
    const response = await request(app).delete("/notebooks/delete").send({
      userId: 3,
      notebookId: 2,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Delete succesful" });
  });
});