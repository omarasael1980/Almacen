import request  from "supertest";
import server ,  {connect} from "../server";
import db from "../config/db";


describe("Server", () => {
    it("should return a welcome message", async () => {
        const response = await request(server).get("/api");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(response.statusCode).not.toBe(404);
    });
});
jest.mock("../config/db" );
describe ('connect', ()=>{
    it('should connect to the database', async ()=>{
       jest.spyOn(db, 'authenticate').mockRejectedValue(new Error('Unable to connect to the database:'));
        const consoleSpy = jest.spyOn(console, 'log') 
        await connect();
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Unable to connect to the database:')
        );
    });
})
