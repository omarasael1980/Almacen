import request  from "supertest";
import server from "../server";
 
describe("Server", () => {
    it("should return a welcome message", async () => {
        const response = await request(server).get("/api");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(response.statusCode).not.toBe(404);
    });
});

