const cypressConfig = require("../../cypress.config");

describe("test willow API GETs", () => {
    beforeEach(() => {
        cy.visit("https://willowapi.onrender.com/api-docs");
    });

    it("displays commercial endpoints on Swagger api-docs page", () => {
        cy.get("#operations-tag-commercial").should("have.text", "commercial");

        cy.get("#operations-commercial-get_commercial_").should(
            "have.text",
            "GET/commercial/"
        );
        cy.get("#operations-commercial-post_commercial_").should(
            "have.text",
            "POST/commercial/"
        );
        cy.get("#operations-commercial-get_commercial__id_").should(
            "have.text",
            "GET/commercial/{id}"
        );
        cy.get("#operations-commercial-put_commercial__id_").should(
            "have.text",
            "PUT/commercial/{id}"
        );
        cy.get("#operations-commercial-delete_commercial__id_").should(
            "have.text",
            "DELETE/commercial/{id}"
        );
        cy.log(
            " All 5 endpoints visible on page for commercial (GET all, POST, GET one, PUT, DELETE)"
        );
    });
});
