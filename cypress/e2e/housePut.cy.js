const cypressConfig = require("../../cypress.config");

describe("test willow API PUTs", () => {
  beforeEach(() => {
    cy.visit("https://willowapi.onrender.com/api-docs");
  });
  it("can toggle HTTPS and click on Try It Out for PUT house listing", () => {
    // We'll store our json in a variable so we can reuse it
    const putListing = `
        "price":"$350,000.00",
        "listDate":"2016-10-02",
        "address":"7823 W 380 JACKSON WY 92638-3233 USA",
        "residenceType":"single family residence",
        "yearBuilt":"2012",
        "sqFeet":1750,
        "pricePerSqFeet":150.0,
        "availability":true,
        "propertyDescription":"Truly gorgeous custom built corner lot home in the new and upcoming Sandcreek Estates! This breathtaking architecturally designed home sits on 0.28-acres with a fully landscaped front yard & a 3-car attached garage with side access. The covered front porch provides an amazing area for relaxation. Once inside the open concept living area, this space is emphasized by a custom stone gas fireplace with shiplap accent walls, cathedral ceilings & large windows overlooking the backyard. Merging into the chef-style kitchen, there is natural wood cabinetry, granite counter, a closet panty, stainless appliances & an amazing island bar. The dining area is tucked into a charming nook with a tray drop ceiling. The main floor also hosts a mudroom, a walk-in laundry, 2 great-sized bedrooms and the gorgeous master suite with a coffered ceiling, a huge walk-in closet & a spa style bathroom with his & her vanities, an amazing soaker tub & a fully tiled walk-in shower. This home comes with a full unfinished basement providing the opportunity to grow and customize. With the numerous high-end custom details in this home & the room to grow what more could you want!",
        "lengthTimeListed":31
     `;
    const houseId = `63756c24cdb1243ec71dd0db`;
    cy.get("div.scheme-container > section > label > select").select("https");

    cy.get("#operations-houses-put_houses__id_ > div > button").click();
    cy.get("button.btn.try-out__btn").click();
    cy.get("#operations-houses-put_houses__id_  input[type=text]").type(
      `${houseId}`
    );
    cy.get('[data-name = "examplePanel"]').clear();
    cy.get('[data-name = "examplePanel"]').type(`{leftarrow} ${putListing}`);
    cy.get(
      "#operations-houses-put_houses__id_ > div.no-margin > div > div.execute-wrapper > button"
    ).click();
    cy.get(
      "#operations-houses-put_houses__id_ > div.no-margin > div > div.responses-wrapper > div.responses-inner > div > div > table > tbody > tr > td.response-col_status"
    ).should("have.text", 204);
    cy.log("Verify json posts an update listing with a status of 204.");
  });
});
