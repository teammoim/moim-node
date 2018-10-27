import request from "supertest";
import app from "../src/app";

describe("GET /setiing", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/setting")
      .expect(200, done);
  });
});
