const request = require("supertest");
const app = require("../app.js");

describe("Notebooks route", () => {
  describe("Should return errors if", () => {
    test("add-new-notebook request is missing a notebook name", async () => {
      let bodyData = [
        {
          notebookName: "",
        },
        {}
      ];
      for (const body of bodyData) {
        const response = await request(app).post("/notebook/add").send(body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: "Missing required fields" });
      }
    });
    test("update-notebook request is missing a notebook identifier or a new name for the notebook", async () => {
      let bodyData = [
        {
          newNotebookName: "update-name",
          notebookId: "",
        },
        {
          newNotebookName: "",
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
        newNotebookName: "update-name",
        notebookId: "n/a",
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Could not find the notebook" });
    });
    test("delete-notebook request is missing a notebook", async () => {
      let bodyData = [
        {
          userId: 1,
          notebookId: "",
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
        notebookId: "n/a",
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "Could not find the notebook" });
    });
  });
  test("should return all notebooks of a specific user", async () => {
    const response = await request(app)
      .get("/notebook/get-all")
    expect(response.statusCode).toBe(200);
    expect(response.body.notebooks).toBeDefined();
  });
});
