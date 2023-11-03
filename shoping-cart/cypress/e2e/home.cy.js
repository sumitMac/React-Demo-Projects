describe("my second test", () => {
  beforeEach("connected", () => {
    cy.visit("http://localhost:5173");
  });
  it("testing-home-components", () => {
    cy.getData("home").find(".main-container");
  });
});
