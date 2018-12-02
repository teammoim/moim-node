import request from "supertest";
import app from "../src/app";

describe("GET /timeline", () => {
  it("should return 302 OK", (done) => {
    request(app).get("/timeline")
      .expect(302, done);
  });
});
