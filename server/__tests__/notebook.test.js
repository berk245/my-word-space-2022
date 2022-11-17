const request = require("supertest");
const app = require("../app.js");

describe("Notebooks route", () => {
  describe("Should return errors if", () => {
    test("get-all-notebooks request is missing a user identifier", async () => {
      const response = await request(app)
        .get("/notebook/get-all/xyz")
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Could not find the user" });
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
      for (const body of bodyData) {
        const response = await request(app).post("/notebook/add").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("user id cannot be found when adding a new notebook", async () => {
      const response = await request(app)
        .post("/notebook/add")
        .send({ userId: "n/a", notebookName: "test-name" });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "User cannot be found" });
    });
    test("update-notebook request is missing a user id or a notebook identifier or a new name for the notebook", async () => {
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
      for (const body of bodyData) {
        const response = await request(app).post("/notebook/edit").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("update-notebook request is made with a notebook id that does not exist", async () => {
      const response = await request(app).post("/notebook/edit").send({
        userId: 1,
        newNotebookName: "update-name",
        notebookId: "n/a",
      });
      expect(response.statusCode).toBe(404);
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
      for (const body of bodyData) {
        const response = await request(app)
          .delete("/notebook/delete")
          .send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("delete-notebook request is made with a notebook id that does not exist", async () => {
      const response = await request(app).delete("/notebook/delete").send({
        userId: 1,
        notebookId: "n/a",
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Could not find the notebook" });
    });
  });
  test("should return all notebooks of a specific user", async () => {
    const response = await request(app)
      .get("/notebook/get-all/1")
    expect(response.statusCode).toBe(200);
    expect(response.body.notebooks).toBeDefined();
  });
});
