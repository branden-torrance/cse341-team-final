const cypressConfig = require("../../cypress.config");

describe("test willow API GETs", () => {
    beforeEach(() => {
        cy.visit("https://willowapi.onrender.com/api-docs");
    });

    it("can click on Try It Out for get single commercial listing", () => {
        // We'll store our id in a variable so we can reuse it
        const newId = "63768f5d5f9f6209964ad874";
        cy.get("div.scheme-container > section > label > select").select(
            "https"
        );
        // https://on.cypress.io/selecting-elements
        cy.get(
            "#operations-commercial-get_commercial__id_ > div.opblock-summary.opblock-summary-get > button"
        ).click();
        cy.get("button.btn.try-out__btn").click();
        cy.get(
            "#operations-commercial-get_commercial__id_  input[type=text]"
        ).type(`${newId}{enter}`);
        cy.get(
            "#operations-commercial-get_commercial__id_ > div.no-margin > div > div.execute-wrapper > button"
        ).click();
        cy.get(
            "#operations-commercial-get_commercial__id_ > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status"
        ).should("have.text", 200);
        cy.log("Verify json returns single document with a status of 200.");
    });
});
