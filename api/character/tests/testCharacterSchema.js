import should from 'should';
import characterModel from '../characterModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('characterModelTests', () => {

    let character = {};
    //create a character with random id before each test
    beforeEach(() => {
        const id = mongoose.Types.ObjectId().toString(); //generates pseudo random ObjectID 
        character = {
            // _id: id,
            name: "Jogan Gage",
            // alts: "",
            // last_seen_location: "",
            // bounty: 0,
            // ship_types: ""
        };
    })

    it('should validate a character with a name', (done) => {
        const m = new characterModel(character);
        m.validate((err) => {
            should.not.exist(err);
            m.name.should.equal(character.name);
            done();
        });
    });

    it('should require a name', (done) => {

        const badPost = {
            message: "This is not valid"
        };
        const m = new characterModel(badPost);
        m.validate((err) => {
            const errors = err.errors;
            errors.should.have.property("name");
            done();
        });
    });
});