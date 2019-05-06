import supertest from 'supertest';
import {app} from '../index.js';
import should from 'should';

// UNIT test begin
describe('Character API test', function () {
    this.timeout(300000);
    // test #1: return a collection of json documents
    it('should return collection of JSON documents', function (done) {
        supertest(app)
            .get('/api/character')
            .expect('Content-type', /json/)
            .expect(200) // This is the HTTP response
            .then(res => {
                // HTTP status should be 200
                res.should.have.property('status').equal(200);
                done();
            });
    });

    // test #2 add a character
  it('should add a character', function (done) {
    // post to /api/character
    supertest(app)
        .post('/api/character')
        .send({
            "_id": "42",
            "name": "Dumagon",
            "alts": "Drogan, Grohl",
            "last_seen_location": "Black Rise",
            "bounty": 4242,
            "ship_types": "Krait"
        })
        .expect('Content-type', /json/)
        .expect(201)
        .then ((res) => {
            res.status.should.equal(201);
            res.body.should.have.property('_id');
            res.body.name.should.equal('Dumagon');
            done();
        });
    });

    // #3 delete a character
    it('should delete a character', () => {
        return  supertest(app)
              .get('/api/character')
              .expect('Content-type', /json/)
              .expect(200).then( (res) => {
                 const id=res.body[0]._id;
                 return supertest(app).delete(`/api/character/${id}`).expect(204); 
              }).then( (res) => {
                  res.status.should.equal(204);  
              });
      });
});