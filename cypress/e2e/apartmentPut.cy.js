const cypressConfig = require("../../cypress.config");

describe("test willow API PUTs", () => {
  beforeEach(() => {
    cy.visit("https://willowapi.onrender.com/api-docs");
  });
  it("can toggle HTTPS and click on Try It Out for PUT apartment listing", () => {
    // We'll store our json in a variable so we can reuse it
    const putListing = `
        "price":"$120,000.00",
        "listDate":"2012-11-10",
        "address":"766 E 300 SALT LAKE CITY UT 84102-2263 USA",
        "residenceType":"single family residence",
        "yearBuilt":"2017",
        "sqFeet":2000,
        "pricePerSqFeet":100.0,
        "availability":true,
        "propertyDescription":"The master bedroom is large with no lack of storage, including a separate walk-in closet and additional dual closets. Feels like home the minute you pull up. The living room is warm and inviting, centered by a wood-burning fireplace and built-in shelving. A spacious breakfast area looks out to the backyard and flows into the kitchen, where you’ll find a breakfast bar, double oven and built-in cook top. ",
        "lengthTimeListed":24
     `;
    const apartmentId = `6382576e1766c970a628e76f`;
    cy.get("div.scheme-container > section > label > select").select("https");

    cy.get("#operations-apartments-put_apartments__id_ > div > button").click();
    cy.get("button.btn.try-out__btn").click();
    cy.get("#operations-apartments-put_apartments__id_  input[type=text]").type(
      `${apartmentId}`
    );
    cy.get('[data-name = "examplePanel"]').clear();
    cy.get('[data-name = "examplePanel"]').type(`{leftarrow} ${putListing}`);
    cy.get(
      "#operations-apartments-put_apartments__id_ > div.no-margin > div > div.execute-wrapper > button"
    ).click();
    cy.get(
      "#operations-apartments-put_apartments__id_ > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status"
    ).should("have.text", 204);
    cy.log("Verify json posts an update listing with a status of 204.");
  });
});
