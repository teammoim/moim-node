import request from "supertest";
import app from "../src/app";

describe("GET /profile", () => {
  it("should return 302 OK", (done) => {
    request(app).get("/profile")
      .expect(302, done);
  });
});
