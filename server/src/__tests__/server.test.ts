
import  {connect} from "../server";
import db from "../config/db";



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
//docs server.use