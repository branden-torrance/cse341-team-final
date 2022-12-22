const cypressConfig = require("../../cypress.config");

describe("test willow API DELETEs", () => {
    beforeEach(() => {
        cy.visit("https://willowapi.onrender.com/api-docs");
    });
    it("can toggle HTTPS and click on Try It Out for DELETE commercial listing", () => {
        // NEED VALID ID TO DELETE
        const commercialId = `639916ae71a6d809995d1e4f`;
        cy.get("div.scheme-container > section > label > select").select(
            "https");
        cy.get(
            "#operations-commercial-delete_commercial__id_ > div > button"
        ).click();
        cy.get("button.btn.try-out__btn").click();
        cy.get(
            "#operations-commercial-delete_commercial__id_  input[type=text]"
        ).type(`${commercialId}`);
        cy.get(
            "#operations-commercial-delete_commercial__id_ > div.no-margin > div > div.execute-wrapper > button"
        ).click();
        cy.get(
            "#operations-commercial-delete_commercial__id_ > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status"
        ).should("have.text", 200);
        cy.log("Verify json posts an update listing with a status of 200.");
    });
});
