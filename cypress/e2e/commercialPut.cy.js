const cypressConfig = require("../../cypress.config");

describe("test willow API PUTs", () => {
    beforeEach(() => {
        cy.visit("https://willowapi.onrender.com/api-docs");
    });
    it("can toggle HTTPS and click on Try It Out for PUT commercial listing", () => {
        // We'll store our json in a variable so we can reuse it
        const putListing = `
        "price":"$1,400,000.00",
        "listDate":"2021-05-22",
        "address":"123 ABC ST. RENO NV 71932-2132 USA",
        "residenceType":"commercial",
        "yearBuilt":"2015",
        "sqFeet":9300,
        "pricePerSqFeet":150.54,
        "availability":true,
        "propertyDescription":"Office building is located right next to the river, providing a gorgeous view. The warehouse connected to the office provides ample storage for a variety of business needs. Quick access to the highway, only 2 minutes away!",
        "lengthTimeListed":56
     `;
        const commercialId = `63768f5d5f9f6209964ad874`;
        cy.get("div.scheme-container > section > label > select").select(
            "https"
        );

        cy.get(
            "#operations-commercial-put_commercial__id_ > div > button"
        ).click();
        cy.get("button.btn.try-out__btn").click();
        cy.get(
            "#operations-commercial-put_commercial__id_  input[type=text]"
        ).type(`${commercialId}`);
        cy.get('[data-name = "examplePanel"]').clear();
        cy.get('[data-name = "examplePanel"]').type(
            `{leftarrow} ${putListing}`
        );
        cy.get(
            "#operations-commercial-put_commercial__id_ > div.no-margin > div > div.execute-wrapper > button"
        ).click();
        cy.get(
            "#operations-commercial-put_commercial__id_ > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status"
        ).should("have.text", 204);
        cy.log("Verify json posts an update listing with a status of 204.");
    });
});
