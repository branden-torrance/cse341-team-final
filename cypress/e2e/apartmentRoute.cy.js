const cypressConfig = require("../../cypress.config");

describe("test willow API GETs", () => {
  beforeEach(() => {
    cy.visit("https://willowapi.onrender.com/api-docs");
  });

  it("displays apartments endpoints on Swagger api-docs page", () => {
    cy.get("#operations-tag-apartments").should("have.text", "apartments");

    cy.get("#operations-apartments-get_apartments_").should(
      "have.text",
      "GET/apartments/"
    );
    cy.get("#operations-apartments-post_apartments_").should(
      "have.text",
      "POST/apartments/"
    );
    cy.get("#operations-apartments-get_apartments__id_").should(
      "have.text",
      "GET/apartments/{id}"
    );
    cy.get("#operations-apartments-put_apartments__id_").should(
      "have.text",
      "PUT/apartments/{id}"
    );
    cy.get("#operations-apartments-delete_apartments__id_").should(
      "have.text",
      "DELETE/apartments/{id}"
    );
    cy.log(" All 5 endpoints visible on page for apartments (GET all, POST, GET one, PUT, DELETE)");
  });
});