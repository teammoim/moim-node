import request from "supertest";
import app from "../src/app";

describe("GET /map", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/map")
      .expect(200, done);
  });
});
