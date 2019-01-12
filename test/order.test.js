'use strict';

let app = require('../src/server'),
  chai = require('chai'),
  request = require('supertest'), mongoose = require('mongoose');

  let expect = chai.expect;
  let id;
  const newOrder = {
    "origin": [6.8091802, 6.1998507],
    "destination": [9.1260371, 7.493364]
  }

  const takeOrder = {
    "status": "TAKEN"
}



  describe('Orders Integration API', function() {
  before(() =>{
    return new Promise((resolve, reject) =>{
      mongoose.connection.collections['orders'].drop( function(err) {
        console.log('collection dropped');
        resolve()
    });
    })
  })
      this.timeout(0);
        it('should return an empty order since no order exist in the database yet', function(done) { 
          console.log("testing")
          request(app)
          .get('/orders')
          .end(function(err, response){
            console.log(response.text)
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.text).orders).to.be.an('array').that.is.empty;
              done(); 
            }); 
        });


       
          it('It should successfully add an order', function(done) { 
            request(app)
            .post('/orders')
            .send(newOrder)
            .end(function(err, response){
           
              expect(response.statusCode).to.equal(200);
              let order = JSON.parse(response.text)
              expect(order.id).to.exist
              id = order.id;
              expect(order.distance).to.exist
              expect(order.status).to.exist.equal('UNASSIGNED')
              expect(order.status).to.equal('UNASSIGNED')
              expect(parseFloat(order.distance)).to.equal(372.68)
                done(); 
              }); 
          });
 

     
            it('It should be able to take an order', function(done) { 
              request(app)
              .patch(`/orders/${id}`)
              .send(takeOrder)
              .end(function(err, response){
                // console.log(response.text)
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(response.text).status).to.equal('SUCCESS');
                  done(); 
                }); 
            });
    

              it('should fail when trying to take an already taken order', function(done) { 
                request(app)
                .patch(`/orders/${id}`)
                .send(takeOrder)
                .end(function(err, response){
                  // console.log(response.text)
                  expect(response.statusCode).to.equal(500);
                  expect(JSON.parse(response.text).error).to.exist;
                  
                    done(); 
                  
                  }); 
              });

              
              it('should return an error when request body is not complete', function(done) { 
                request(app)
                .post(`/orders`)
                .send({origin: [1.23838883, 9.3377373]})
                .end(function(err, response){
                  console.log(response.text)
                  expect(response.statusCode).to.equal(500);
                  expect(JSON.parse(response.text).error).to.exist;
                  
                    done(); 
                  
                  }); 
              });
   

              });

            