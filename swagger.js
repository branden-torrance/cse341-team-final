const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0",
    title: "Willow",
    description: "Willow, the real estate API",
  },
  host: "",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Willow API",
      description: "Use the endpoints to initiate CRUD operations that access the 4 collections. (see example listing below)", 
    },
  ],
  definitions: {
    listingExample: {
      $price: "$320,000.00" ,
      $listDate: "2012-10-10" ,
      address: "766 E 300 SALT LAKE CITY UT 84102-2263 USA" ,
      residenceType: "single family residence" ,
      yearBuilt: "2017-12-10" ,
      $sqFeet: 2000 ,
      pricePerSqFeet: 100.0 ,
      $availability: true,
      propertyDescription: "The master bedroom is large with no lack of storage, including a separate walk-in closet and additional dual closets. Feels like home the minute you pull up. The living room is warm and inviting, centered by a wood-burning fireplace and built-in shelving. A spacious breakfast area looks out to the backyard and flows into the kitchen, where you’ll find a breakfast bar, double oven and built-in cook top. " ,
      lengthTimeListed: 2 
    },
  },
  components: {}, // by default: empty object (OpenAPI 3.x)
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./index"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  require("./index");
});
