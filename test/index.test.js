const request = require("supertest");
const app = require("../src/app");

describe("TanzaniaFamousAPI", () => {
  it("GET /api/famous should return all famous people", async () => {
    const res = await request(app).get("/api/famous");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /api/famous/:ID should return a specific famous person", async () => {
    const res = await request(app).get("/api/famous/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("full_name");
  });

  it("POST /api/famous should create a new famous person", async () => {
    const newFamous = {
      full_name: "Test Person",
      date_of_birth: "2000-01-01",
      image_url: "https://example.com/image.jpg",
      famous_for: "Testing"
    };
    const res = await request(app).post("/api/famous").send(newFamous);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(
      expect.objectContaining({
        ...newFamous,
        date_of_death: null,
        nickname: null
      })
    );
  });

  it("PUT /api/famous/:ID should update a famous person", async () => {
    const updatedInfo = {
      full_name: "Updated Name",
      date_of_birth: "2000-01-01",
      image_url: "https://example.com/updated.jpg",
      famous_for: "Updated reason"
    };
    const res = await request(app).put("/api/famous/1").send(updatedInfo);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(
      expect.objectContaining({
        ...updatedInfo,
        date_of_death: null,
        nickname: null
      })
    );
  });

  it("DELETE /api/famous/:ID should delete a famous person", async () => {
    const res = await request(app).delete("/api/famous/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("deleted");
  });
});
