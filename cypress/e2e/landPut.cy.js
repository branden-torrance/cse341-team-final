const cypressConfig = require("../../cypress.config");

describe("test willow API PUTs", () => {
  beforeEach(() => {
    cy.visit("https://willowapi.onrender.com/api-docs");
  });
  it("can toggle HTTPS and click on Try It Out for PUT land listing", () => {
    // We'll store our json in a variable so we can reuse it
    const putListing = `
        "price":"$100,000.00",
        "listDate":"2021-10-02",
        "address":"500 W 400 E Salt Lake City UT 84111-2263 USA",
        "residenceType":"",
        "yearBuilt":"",
        "sqFeet":5000,
        "pricePerSqFeet":100.0,
        "availability":true,
        "propertyDescription":"This is a very convenient piece of land for an affordable price. ",
        "lengthTimeListed":24
     `;
    const landId = `6391f75470af763686fca57f`;
    cy.get("div.scheme-container > section > label > select").select("https");

    cy.get("#operations-land-put_land__id_ > div > button").click();
    cy.get("button.btn.try-out__btn").click();
    cy.get("#operations-land-put_land__id_  input[type=text]").type(
      `${landId}`
    );
    cy.get('[data-name = "examplePanel"]').clear();
    cy.get('[data-name = "examplePanel"]').type(`{leftarrow} ${putListing}`);
    cy.get(
      "#operations-land-put_land__id_ > div.no-margin > div > div.execute-wrapper > button"
    ).click();
    cy.get(
      "#operations-land-put_land__id_ > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status"
    ).should("have.text", 204);
    cy.log("Verify json posts an update listing with a status of 204.");
  });
});
