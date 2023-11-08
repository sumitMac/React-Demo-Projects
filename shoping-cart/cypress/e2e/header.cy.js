describe("header testing", () => {
  beforeEach("connected", () => {
    cy.visit("http://localhost:5173");
  });

  it("header-testing-navbar", () => {
    cy.getData("header").find(".navbar");
  });
  it("navbar-click-testing-heading", () => {
    cy.getData("navbar").contains("Fashion World").click();
  });
  it("navbar-testing-routes", () => {
    cy.getData("navbar").should("have.class", "navbar");

    cy.getData("cart").click();
    cy.location("pathname").should("eq", "/cart");

    cy.getData("about").click();
    cy.location("pathname").should("eq", "/about");
  });
});
