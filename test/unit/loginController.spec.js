const httpMocks = require("node-mocks-http");

const loginController = require("../../routes/controllers/loginController");
const User = require("../../models/User");

const confirmEmailForm = require("../__mocks__/confirmEmailForm.json");
const loginForm = require("../__mocks__/loginForm.json");

let req, res, next;

beforeEach(() => {
  User.findOne = jest.fn();
  User.updateUser = jest.fn();
  User.findOneAndUpdate = jest.fn();

  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

afterEach(() => {
  User.findOne.mockClear();
  User.updateUser.mockClear();
  User.findOneAndUpdate.mockClear();
});

describe("login", () => {
  beforeEach(() => {
    req.body = loginForm;
  });

  it("Should not call User.findOneAndUpdate if user does not exists", async () => {
    User.findOne.mockReturnValue(null);

    await loginController.login(req, res, next);

    expect(User.findOneAndUpdate).not.toBeCalled();
  });
});

describe("sendVerifier", () => {
  beforeEach(() => {
    req.params = confirmEmailForm;
  });

  it("Should not call User.updateUser if the user does not exists", async () => {
    User.findOne.mockReturnValue(null);

    await loginController.sendVerifier(req, res, next);

    expect(User.updateUser).not.toBeCalled();
  });

  it("Should call User.updateUser if user exists", async () => {
    User.findOne.mockReturnValue({
      verifier: '{"salt":"salt","verifier":"verifier"}',
    });

    await loginController.sendVerifier(req, res, next);

    expect(User.updateUser).toBeCalled();
  });

  it("Return 200 response code", async () => {
    User.findOne.mockReturnValue({
      verifier: '{"salt":"salt","verifier":"verifier"}',
    });

    await loginController.sendVerifier(req, res, next);

    expect(res._getStatusCode()).toBe(200);
  });
});

describe("checkOTP", () => {
  beforeEach(() => {
    req.params = confirmEmailForm;
  });

  it("Should not send OTP if user does not exists", async () => {
    User.findOne.mockReturnValue(null);

    try {
      await loginController.checkOTP(req, res, next);
    } catch (err) {
      expect(err.message).toBe("No account found.");
    }
  });

  it("Should return OTP if user has OTP", async () => {
    User.findOne.mockReturnValue({
      _id: "id",
      oneTimePassword: "oneTimePassword",
    });

    await loginController.checkOTP(req, res, next);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toStrictEqual({
      type: true,
      otp: "oneTimePassword",
      userId: "id",
    });
  });

  it("Should not return OTP if user doesn't have OTP", async () => {
    User.findOne.mockReturnValue({ _id: "id" });

    await loginController.checkOTP(req, res, next);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toStrictEqual({ type: false });
  });
});

describe("deleteOTP", () => {
  beforeEach(() => {
    req.params = { email: "test@test.com" };
    req.body = { OTP: "oneTimePassword" };
  });

  it("Return 200 response code", async () => {
    User.findOneAndUpdate.mockReturnValue({ _id: "id" });

    await loginController.deleteOTP(req, res, next);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toStrictEqual({ userId: "id" });
  });
});
