const httpMocks = require("node-mocks-http");

const signupController = require("../../routes/controllers/signupController");
const User = require("../../models/User");

const confirmEmailForm = require("../__mocks__/confirmEmailForm.json");
const signupForm = require("../__mocks__/signupForm.json");

const sendEmail = require("../../utils/sendEmail");

jest.mock("../../utils/sendEmail.js");

let req, res, next;

beforeEach(() => {
  User.findOne = jest.fn();
  User.create = jest.fn();

  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

afterEach(() => {
  User.findOne.mockClear();
  User.create.mockClear();
});

describe("ConfirmEmail", () => {
  beforeEach(() => {
    req.body = confirmEmailForm;
  });

  it("Have a confirmEmail function", () => {
    expect(typeof signupController.confirmEmail).toBe("function");
  });

  it("Return 200 response code", async () => {
    User.findOne.mockReturnValue(null);
    sendEmail.mockReturnValue(null);

    await signupController.confirmEmail(req, res, next);

    expect(res._getStatusCode()).toBe(200);
  });
});

describe("Signup", () => {
  beforeEach(() => {
    req.body = signupForm;
  });

  it("Call User.findOne and User.create when user hasn't been registered", async () => {
    await signupController.signup(req, res, next);

    expect(User.findOne).toBeCalledWith({ email: signupForm.email });

    expect(User.create).toBeCalledWith({
      username: signupForm.username,
      email: signupForm.email,
      verifier: '{"salt":"salt","verifier":"verifier"}',
      cookieExpire: "3h",
    });
  });

  it("Return 201 response code", async () => {
    User.findOne.mockReturnValue(null);

    await signupController.signup(req, res, next);

    expect(res._getStatusCode()).toBe(201);
  });
});

describe("Signup with alreday existing email address", () => {
  beforeEach(() => {
    req.body = signupForm;

    User.findOne.mockImplementationOnce(() => jest.fn(() => signupForm));
  });

  it("Should not call User.create if the email has already been taken", async () => {
    try {
      await signupController.signup(req, res, next);
    } catch (err) {
      expect(User.create).not.toBeCalled();
    }
  });
});
