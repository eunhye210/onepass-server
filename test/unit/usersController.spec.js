const httpMocks = require("node-mocks-http");

const usersController = require("../../routes/controllers/usersController");
const User = require("../../models/User");
const createClientEncryption = require("../../configs/createClientEncryption");
const { encryptData } = require("../../utils/processCrypto");

jest.mock("../../utils/processCrypto.js");
jest.mock("../../services/saveEncryptedData.js");
jest.mock("../../services/getDecryptedData.js");
jest.mock("../../services/updateEncryptedData.js");
jest.mock("../../configs/createClientEncryption.js");

let req, res, next;

beforeEach(() => {
  User.findById = jest.fn();
  User.findByIdAndUpdate = jest.fn();
  User.findByIdAndDelete = jest.fn();
  User.findOne = jest.fn();
  User.updateOne = jest.fn();
  User.updateUser = jest.fn();

  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

afterEach(() => {
  User.findById.mockClear();
  User.findByIdAndUpdate.mockClear();
  User.findByIdAndDelete.mockClear();
  User.findOne.mockClear();
  User.updateOne.mockClear();
  User.updateUser.mockClear();
});

describe("getUserInfo", () => {
  beforeEach(() => {
    req.params = { userId: "userId" };
  });

  it("Have a getUserInfo function", () => {
    expect(typeof usersController.getUserInfo).toBe("function");
  });

  it("Should call User.findById", async () => {
    User.findById.mockReturnValue({
      passwordList: [],
      sessionKey: "sessionKey",
    });

    await usersController.getUserInfo(req, res, next);

    expect(User.findById).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    User.findById.mockReturnValue({
      passwordList: [],
      sessionKey: "sessionKey",
    });
    encryptData.mockReturnValue("cipherText");

    await usersController.getUserInfo(req, res, next);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBe("cipherText");
  });
});

describe("addPassword", () => {
  beforeEach(() => {
    req.params = { userId: "userId" };
    req.body = { cipherText: "cipherText" };
  });

  it("Have a addPassword function", () => {
    expect(typeof usersController.addPassword).toBe("function");
  });

  it("Should call User.findById", async () => {
    User.findById.mockReturnValue({ sessionKey: "sessionKey" });

    await usersController.addPassword(req, res, next);

    expect(User.findById).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    User.findById.mockReturnValue({ sessionKey: "sessionKey" });

    await usersController.addPassword(req, res, next);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBe(
      "Your password has been successfully stored"
    );
  });
});

describe("getPassword", () => {
  beforeEach(() => {
    req.params = { userId: "userId", passwordId: "passwordId" };
  });

  it("Have a getPassword function", () => {
    expect(typeof usersController.getPassword).toBe("function");
  });

  it("Should call User.findById", async () => {
    User.findById.mockReturnValue({ sessionKey: "sessionKey" });

    await usersController.getPassword(req, res, next);

    expect(User.findById).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    User.findById.mockReturnValue({ sessionKey: "sessionKey" });
    encryptData.mockReturnValue("cipherText");

    await usersController.getPassword(req, res, next);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBe("cipherText");
  });
});

describe("updatePassword", () => {
  beforeEach(() => {
    req.params = { userId: "userId", passwordId: "passwordId" };
    req.body = { password: "password" };
  });

  it("Have a updatePassword function", () => {
    expect(typeof usersController.updatePassword).toBe("function");
  });

  it("Should call User.findById", async () => {
    User.findById.mockReturnValue({ sessionKey: "sessionKey" });

    await usersController.updatePassword(req, res, next);

    expect(User.findById).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    User.findById.mockReturnValue({ sessionKey: "sessionKey" });

    await usersController.updatePassword(req, res, next);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBe(
      "Your password has been successfully updated"
    );
  });
});

describe("deletePassword", () => {
  beforeEach(() => {
    req.params = { userId: "userId", passwordId: "passwordId" };
  });

  it("Have a deletePassword function", () => {
    expect(typeof usersController.deletePassword).toBe("function");
  });

  it("Should call User.findByIdAndUpdate", async () => {
    await usersController.deletePassword(req, res, next);

    expect(User.findByIdAndUpdate).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    await usersController.deletePassword(req, res, next);

    expect(res._getStatusCode()).toBe(200);
  });
});

describe("deleteAccount", () => {
  beforeEach(() => {
    req.params = { userId: "userId" };
  });

  it("Have a deleteAccount function", () => {
    expect(typeof usersController.deleteAccount).toBe("function");
  });

  it("Should call User.findByIdAndDelete", async () => {
    await usersController.deleteAccount(req, res, next);

    expect(User.findByIdAndDelete).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    await usersController.deleteAccount(req, res, next);

    expect(res._getStatusCode()).toBe(200);
  });
});

describe("changeMasterPassword", () => {
  beforeEach(() => {
    req.params = { userId: "userId" };
    req.body = { salt: "salt", verifier: "verifier" };
  });

  it("Have a changeMasterPassword function", () => {
    expect(typeof usersController.changeMasterPassword).toBe("function");
  });

  it("Should call User.updateOne", async () => {
    await usersController.changeMasterPassword(req, res, next);

    expect(User.updateOne).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    await usersController.changeMasterPassword(req, res, next);

    expect(res._getStatusCode()).toBe(200);
  });
});

describe("getAccountSetting", () => {
  beforeEach(() => {
    req.params = { userId: "userId" };
  });

  it("Have a getAccountSetting function", () => {
    expect(typeof usersController.getAccountSetting).toBe("function");
  });

  it("Should call User.findById", async () => {
    User.findById.mockReturnValue({
      passwordStrength: "passwordStrength",
      cookieExpire: "cookieExpire",
    });

    await usersController.getAccountSetting(req, res, next);

    expect(User.findById).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    User.findById.mockReturnValue({
      passwordStrength: "passwordStrength",
      cookieExpire: "cookieExpire",
    });

    await usersController.getAccountSetting(req, res, next);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toStrictEqual({
      passwordOption: "passwordStrength",
      sessionTimeout: "cookieExpire",
    });
  });
});

describe("setAccountSetting", () => {
  beforeEach(() => {
    req.params = { userId: "userId" };
  });

  it("Have a setAccountSetting function", () => {
    expect(typeof usersController.setAccountSetting).toBe("function");
  });

  it("Return 200 response code, if type is 'password-strength'", async () => {
    req.body = { type: "password-strength", option: "option" };

    await usersController.setAccountSetting(req, res, next);

    expect(User.updateUser).toBeCalledTimes(1);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBe(
      'Your password generator strength type is "option".'
    );
  });

  it("Return 200 response code, if type is 'session-timeout'", async () => {
    req.body = { type: "session-timeout", option: "option" };

    await usersController.setAccountSetting(req, res, next);

    expect(User.updateUser).toBeCalledTimes(1);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBe('Your login session timeout is "option".');
  });

  it("Should not call User.updateUser if type is null", async () => {
    req.body = { type: null, option: null };

    await usersController.setAccountSetting(req, res, next);

    expect(User.updateUser).toBeCalledTimes(0);
  });
});

describe("checkUrlData", () => {
  beforeEach(() => {
    req.params = { userId: "userId", url: "testURL" };
  });

  it("Have a checkUrlData function", () => {
    expect(typeof usersController.checkUrlData).toBe("function");
  });

  it("Should call User.findOne", async () => {
    await usersController.checkUrlData(req, res, next);

    expect(User.findOne).toBeCalledTimes(1);
  });

  it("Should call User.findById and return 200 if given URL data exists", async () => {
    User.findOne.mockReturnValue({ passwordList: ["password1", "password2"] });
    User.findById.mockReturnValue({ sessionKey: "sessionKey" });
    createClientEncryption.mockReturnValue({
      clientEncryption: { decrypt: jest.fn() },
    });
    encryptData.mockReturnValue("cipherText");

    await usersController.checkUrlData(req, res, next);

    expect(User.findById).toBeCalledTimes(1);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBe("cipherText");
  });

  it("Should return 404 if given URL data doesn't exists", async () => {
    User.findOne.mockReturnValue(null);

    await usersController.checkUrlData(req, res, next);

    expect(User.findById).toBeCalledTimes(0);
    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData()).toStrictEqual({ errorMessage: "No Data Found" });
  });
});

describe("createRandomPassword", () => {
  beforeEach(() => {
    req.params = { userId: "userId" };
  });

  it("Have a createRandomPassword function", () => {
    expect(typeof usersController.createRandomPassword).toBe("function");
  });

  it("Should call User.findById", async () => {
    User.findById.mockReturnValue({ passwordStrength: "passwordStrength" });

    await usersController.createRandomPassword(req, res, next);

    expect(User.findById).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    User.findById.mockReturnValue({ passwordStrength: "passwordStrength" });

    await usersController.createRandomPassword(req, res, next);

    expect(res._getStatusCode()).toBe(200);
  });
});
