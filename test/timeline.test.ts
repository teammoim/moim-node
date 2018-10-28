import request from "supertest";
import app from "../src/app";

describe("GET /timeline", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/timeline")
      .expect(200, done);
  });
});
