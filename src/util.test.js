import { preetyFormat, sortedData } from "./util";
describe("tests of util", () => {
  it("testing preetyformat method", () => {
    const response = preetyFormat(30000);
    expect(response).toEqual("+30.0k");
  });
  it("testing preetyformat method", () => {
    const data = [{ cases: 45 }, { cases: 55 }, { cases: 1 }];
    const correctResponse = [{ cases: 55 }, { cases: 45 }, { cases: 1 }];
    const response = sortedData(data);
    expect(response).toEqual(correctResponse);
  });
});
