const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../src/models/user");

// writing test suites for all apis
describe("User Apis", () => {
  let server;
  let token;
  const createToken = () => {
    return jwt.sign({ userID: "testuserid" }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server = app.listen(process.env.PORT || 3000);
    token = createToken();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });


  beforeEach(async () => {
    await User.deleteMany();
  });


  // POST('/worko/users')
  it("should create a new user", async () => {
    const response = await request(app)
    .post("/worko/user")
    .send({
      email: "user1@example.com",
      name: "testuser1",
      age: 12,
      city: "Hyderabad",
      zipcode: 50743,
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.token).toBeDefined();
  });

  // GET('/worko/user')
  it("should fetch all the users", async () => {
    await User.create({
      email: "user2@example.com",
      name: "testuser",
      age: 12,
      city: "Hyderabad",
      zipcode: 50745,
    });

    const response = await request(app)
      .get("/worko/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  // GET ('worko/user/:userID')
  it("should fetch a user by id", async () => {
    const user = await User.create({
      email: "user3@example.com",
      name: "testuser",
      age: 12,
      city: "Hyderabad",
      zipcode: 50745,
    });

    const response = await request(app)
      .get(`/worko/user/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe("user3@example.com");
  });

  
  // PUT ('/worko/user/:userID')
  it("should update a user by id", async () => {
    const user = await User.create({
      email: "user4@example.com",
      name: "testuser",
      age: 12,
      city: "Hyderabad",
      zipcode: 50745,
    });

    const response = await request(app)
      .put(`/worko/user/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "updateuser@example.com",
        name: "updateuser",
        age: 30,
        city: "Delhi",
        zipcode: 50345,
      });

    expect(response.status).toBe(200);
    expect(response.body.email).toBe("updateuser@example.com");
  });

  // DELETE  ('/worko/user/:userID')
  it("should soft delete a user by id", async () => {
    const user = await User.create({
      email: "user5@example.com",
      name: "testuser",
      age: 12,
      city: "Hyderabad",
      zipcode: 50745,
    });

    const response = await request(app)
      .delete(`/worko/user/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user soft deleted");
  });

  
  // if token is not provided
  it("should return 401 if token is not provided", async () => {
    const response = await request(app)
      .get("/worko/user")
      .set("Authorization", null);

    expect(response.status).toBe(401);
  });

  //  for Invalid token
  it('should return 403 if token is invalid' , async()=>{
    const response = await request(app)
    .get('/worko/user')
    .set('Authorization' , 'Bearer invalid token');

    expect(response.status).toBe(403);
  });

});
