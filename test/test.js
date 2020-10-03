let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");

let contactModel = require("../contactModel");

chai.use(chaiHttp);
chai.should();

//Our parent block
describe("Contacts", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    contactModel.deleteMany({}, (err) => {
      if (err) {
        throw err;
      }
      done();
    });
  });

  /*
   * Test the /POST route
   */

  describe("/POST contact", () => {
    it("it should POST a contact", (done) => {
      let contact = {
        name: "testName",
        email: "testEmail@email.com",
        phone: "91234567",
        gender: "Male",
      };
      chai
        .request(app)
        .post("/api/contacts")
        .send(contact)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.should.have.property("message").eql("New contact created!");
          res.body.data.should.have.property("name").eql("testName");
          res.body.data.should.have
            .property("email")
            .eql("testEmail@email.com");
          res.body.data.should.have.property("phone").eql("91234567");
          res.body.data.should.have.property("gender").eql("Male");
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  /*
   * Test the /GET route with no contacts
   */
  describe("/GET contact", () => {
    it("it should GET no contacts at the beginning", (done) => {
      chai
        .request(app)
        .get("/api/contacts")
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("data");
          res.body.data.length.should.be.eql(0);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  /*
   * Test the /GET route with at least 1 contact
   */
  describe("/GET at least 1 contact", () => {
    it("it should GET all (>1) the contacts", (done) => {
      let contact = new contactModel({
        name: "testName",
        email: "testEmail@email.com",
        phone: "91234567",
        gender: "Male",
      });
      contact.save((err, contact) => {
        chai
          .request(app)
          .get("/api/contacts")
          .send(contact)
          .then((res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql("success");
            res.body.should.have.property("data");
            res.body.data.length.should.be.above(0);
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe("/GET/:id contact", () => {
    it("it should GET a contact by the given id", (done) => {
      let contact = new contactModel({
        name: "testName",
        email: "testEmail@email.com",
        phone: "91234567",
        gender: "Male",
      });
      contact.save((err, contact) => {
        chai
          .request(app)
          .get("/api/contacts/" + contact.id)
          .send(contact)
          .then((res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("data");
            res.body.data.should.have.property("name").eql("testName");
            res.body.data.should.have
              .property("email")
              .eql("testEmail@email.com");
            res.body.data.should.have.property("phone").eql("91234567");
            res.body.data.should.have.property("gender").eql("Male");
            res.body.data.should.have.property("_id").eql(contact.id);
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe("/PUT/:id contact", () => {
    it("it should UPDATE a contact by the given id", (done) => {
      let contact = new contactModel({
        name: "testName",
        email: "testEmail@email.com",
        phone: "91234567",
        gender: "Male",
      });
      let updatedContact = {
        name: "testUpdatedName",
        email: "testUpdatedEmail@email.com",
        phone: "91234567",
        gender: "Male",
      };
      contact.save((err, contact) => {
        chai
          .request(app)
          .put("/api/contacts/" + contact.id)
          .send(updatedContact)
          .then((res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Contact Info updated");
            res.body.should.have.property("data");
            res.body.data.should.have.property("name").eql("testUpdatedName");
            res.body.data.should.have
              .property("email")
              .eql("testUpdatedEmail@email.com");
            res.body.data.should.have.property("phone").eql("91234567");
            res.body.data.should.have.property("gender").eql("Male");
            res.body.data.should.have.property("_id").eql(contact.id);
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id contact", () => {
    it("it should DELETE a contact by the given id", (done) => {
      let contact = new contactModel({
        name: "testName",
        email: "testEmail@email.com",
        phone: "91234567",
        gender: "Male",
      });
      contact.save((err, contact) => {
        chai
          .request(app)
          .delete("/api/contacts/" + contact.id)
          .then((res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql("success");
            res.body.should.have.property("message").eql("Contact deleted");
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  });
});
