describe("my first test", () => {
  beforeEach("connected", () => {
    cy.visit("http://localhost:5173");
  });

  it("header-testing-navbar", () => {
    cy.getData("header").find(".navbar");
  });
  it("navbar-testing-heading", () => {
    cy.get(".navbar").contains("Fashion World").click();
  });
  it("navbar-testing-icon", () => {});
  it("navbar-testing-routes", () => {});
});
