const cypressConfig = require("../../cypress.config");

describe("test willow API GETs", () => {
  beforeEach(() => {
    cy.visit("https://willowapi.onrender.com/api-docs");
  });

  it("displays land endpoints on Swagger api-docs page", () => {
    cy.get("#operations-tag-land").should("have.text", "land");

    cy.get("#operations-land-get_land_").should("have.text", "GET/land/");
    cy.get("#operations-land-post_land_").should("have.text", "POST/land/");
    cy.get("#operations-land-get_land__id_").should(
      "have.text",
      "GET/land/{id}"
    );
    cy.get("#operations-land-put_land__id_").should(
      "have.text",
      "PUT/land/{id}"
    );
    cy.get("#operations-land-delete_land__id_").should(
      "have.text",
      "DELETE/land/{id}"
    );
    cy.log(
      " All 5 endpoints visible on page for land (GET all, POST, GET one, PUT, DELETE)"
    );
  });
});
