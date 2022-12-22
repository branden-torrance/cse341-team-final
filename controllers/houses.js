const connectDatabase = require("../database/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
    // #swagger.tags = ['houses']
    // #swagger.description = 'Get all houses'
    try {
        const filter = Object.fromEntries(
            Object.entries({}).filter(([_k, v]) => v)
        );
        const collection = await _collection();
        const documents = await collection
            .find(filter)
            .toArray((err, result) => {
                if (err) {
                    res.status(500).json(
                        collection.error ||
                            "An error ocurred getting the collection."
                    );
                }
                res.setHeader("Content-Type", "application/json");
                res.status(200).json(result);
            });
        console.log(documents);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err });
    }
};

const getOne = async (req, res) => {
    // #swagger.tags = ['houses']
    // #swagger.description = 'GET and return one house'
    const houseId = ObjectId(req.params.id);
    if (!ObjectId.isValid(houseId)) {
      res
        .status(400)
        .json("Use a valid house id to find a specific listing.");
    }
    const collection = await _collection();
    const document = await collection
        .find({
            _id: houseId,
        })
        .toArray((err, result) => {
            if (err) {
                res.status(500).json({ message: err });
            }
            res.status(200).json(result[0]);
        });
    console.log(houseId, document);
};

const createListing = async (req, res) => {
    // #swagger.tags = ['houses']
    // #swagger.description = 'An insert into the houses collection.'
      /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update a listing',
            required: true,
            schema: { $ref: "#/definitions/listingExample" }
    } 
    */
    try {
        const collection = await _collection();
        const {
            price,
            listDate,
            address,
            residenceType,
            yearBuilt,
            sqFeet,
            pricePerSqFeet,
            availability,
            propertyDescription,
            lengthTimeListed,
        } = req.body;
        const document = await collection.insertOne({
            price,
            listDate,
            address,
            residenceType,
            yearBuilt,
            sqFeet,
            pricePerSqFeet,
            availability,
            propertyDescription,
            lengthTimeListed,
        });
        console.log(`1 document inserted, _id: ${document.insertedId}`);
        res.status(201).json(document);
    } catch (err) {
        console.error(err);
        res.status(400).json(
            err || "Some error occurred while creating the listing."
        );
    }
};

const updateListing = async (req, res) => {
    // #swagger.tags = ['houses']
    // #swagger.description = 'An id is required to update, use `6393ffbc08d00a80bc6eea03`.'
      /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update a listing',
            required: true,
            schema: { $ref: "#/definitions/listingExample" }
    } 
    */
    const houseId = ObjectId(req.params.id);
    if (!ObjectId.isValid(houseId)) {
        res.status(400).json("Use a valid house id to find a specific listing");
    }
    try {
        const {
            price,
            listDate,
            address,
            residenceType,
            yearBuilt,
            sqFeet,
            pricePerSqFeet,
            availability,
            propertyDescription,
            lengthTimeListed,
        } = req.body;
        const collection = await _collection();
        const document = await collection.updateOne(
            {
                _id: houseId,
            },
            {
                $set: {
                    price,
                    listDate,
                    address,
                    residenceType,
                    yearBuilt,
                    sqFeet,
                    pricePerSqFeet,
                    availability,
                    propertyDescription,
                    lengthTimeListed,
                },
            }
        );
        res.status(204).json(document);
        console.log(document);
    } catch (err) {
        res.status(500).json(
            err || "Some error occurred while updating the listing."
        );
        next(err);
    }
};

const deleteListing = async (req, res) => {
    // #swagger.tags = ['houses']
    /* #swagger.description = 'Delete requires an id to complete, use one from the GET'
     */
    const houseId = ObjectId(req.params.id);
    if (!ObjectId.isValid(houseId)) {
        res.status(400).json(
            "Use a valid listing id to delete specific listing."
        );
    }
    try {
        const collection = await _collection();
        const document = await collection.deleteOne({
            _id: houseId,
        });
        res.status(200);
        res.json(document);
        console.log(req.body, "Deleted successfully!");
    } catch (err) {
        res.status(500).json(
            err || "Some error occurred while deleting the listing."
        );
        next(err);
    }
};

// try catch to access database, used in functions
const _collection = async () => {
    try {
        const db = await connectDatabase();
        return db.collection("houses");
    } catch (error) {
        console.error("Error getting house collection", error);
    }
};

module.exports = {
    getAll,
    getOne,
    createListing,
    updateListing,
    deleteListing,
};
