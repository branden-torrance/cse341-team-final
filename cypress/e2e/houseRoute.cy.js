const cypressConfig = require("../../cypress.config");

describe("test willow API GETs", () => {
  beforeEach(() => {
    cy.visit("https://willowapi.onrender.com/api-docs");
  });

  it("displays houses endpoints on Swagger api-docs page", () => {
    cy.get("#operations-tag-houses").should("have.text", "houses");

    cy.get("#operations-houses-get_houses_").should(
      "have.text",
      "GET/houses/"
    );
    cy.get("#operations-houses-post_houses_").should(
      "have.text",
      "POST/houses/"
    );
    cy.get("#operations-houses-get_houses__id_").should(
      "have.text",
      "GET/houses/{id}"
    );
    cy.get("#operations-houses-put_houses__id_").should(
      "have.text",
      "PUT/houses/{id}"
    );
    cy.get("#operations-houses-delete_houses__id_").should(
      "have.text",
      "DELETE/houses/{id}"
    );
    cy.log(" All 5 endpoints visible on page for houses (GET all, POST, GET one, PUT, DELETE)");
  });
});