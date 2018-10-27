import request from "supertest";
import app from "../src/app";

describe("GET /mobile", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/mobile")
      .expect(200, done);
  });
});
