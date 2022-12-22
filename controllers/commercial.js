const connectDatabase = require("../database/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
    // #swagger.tags = ['commercial']
    // #swagger.description = 'Get all commercial properties'
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
    // #swagger.tags = ['commercial']
    // #swagger.description = 'GET and return one commercial property'
    const commercialId = ObjectId(req.params.id);
    const collection = await _collection();
    const document = await collection
        .find({
            _id: commercialId,
        })
        .toArray((err, result) => {
            if (err) {
                res.status(500).json({ message: err });
            }
            res.status(200).json(result[0]);
        });
    console.log(commercialId, document);
};

const createListing = async (req, res) => {
    // #swagger.tags = ['commercial']
    // #swagger.description = 'An insert into the commercial property collection.'
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
    // #swagger.tags = ['commercial']
    // #swagger.description = 'An id is required to update, use `63768f5d5f9f6209964ad874`.'
    const commercialId = ObjectId(req.params.id);
    if (!ObjectId.isValid(commercialId)) {
        res.status(400).json(
            "Use a valid commercial id to find a specific listing"
        );
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
                _id: commercialId,
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
    // #swagger.tags = ['commercial']
    /* #swagger.description = 'Delete requires an id to complete, use one from the GET'
     */
    const commercialId = ObjectId(req.params.id);
    if (!ObjectId.isValid(commercialId)) {
        res.status(400).json(
            "Use a valid listing id to delete specific listing."
        );
    }
    try {
        const collection = await _collection();
        const document = await collection.deleteOne({
            _id: commercialId,
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
        return db.collection("commercial");
    } catch (error) {
        console.error("Error getting commercial collection", error);
    }
};

module.exports = {
    getAll,
    getOne,
    createListing,
    updateListing,
    deleteListing,
};
