const cypressConfig = require("../../cypress.config");

describe("test willow API GETs", () => {
  beforeEach(() => {
    cy.visit("https://willowapi.onrender.com/api-docs");
  });

  it("can click on Try It Out for get all land listings", () => {
    cy.get("div.scheme-container > section > label > select").select("https");
    cy.get(
      "#operations-land-get_land_ > div.opblock-summary.opblock-summary-get > button"
    ).click();
    cy.get("button.btn.try-out__btn").click();
    cy.get(
      "#operations-land-get_land_ > div.no-margin > div > div.execute-wrapper > button"
    ).click();
    cy.get(
      "#operations-land-get_land_ > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status"
    ).should("have.text", 200);
    cy.log("Verify json returns all documents with a status of 200.");
  });
});
