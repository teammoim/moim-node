import request from "supertest";
import app from "../src/app";

describe("GET /profile", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/profile")
      .expect(200, done);
  });
});
