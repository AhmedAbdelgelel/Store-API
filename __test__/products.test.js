import { getProductDemo } from "../controllers/products";

describe("get all products", () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      query: {},
    };
    mockResponse = {
      send: jest.fn(),
    };
  });

  it("Get Demo Product Page", () => {
    getProductDemo(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith(
      "<h1>Test product endpoint</h1>"
    );
  });
  it("Get name of the query", () => {
    mockRequest.query.name = "Ahmed";
    getProductDemo(mockRequest, mockResponse);
    expect(mockRequest.query.name).toBe("Ahmed");
    expect(mockResponse.send).toHaveBeenCalledWith("<h1>Hello Ahmed</h1>");
  });
});
