const connectDatabase = require("../database/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
    // #swagger.tags = ['land']
    // #swagger.description = 'Get all land listings'
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
    // #swagger.tags = ['land']
    // #swagger.description = 'GET and return one land listing'
    const landId = ObjectId(req.params.id);
    const collection = await _collection();
    const document = await collection
        .find({
            _id: landId,
        })
        .toArray((err, result) => {
            if (err) {
                res.status(500).json({ message: err });
            }
            res.status(200).json(result[0]);
        });
    console.log(landId, document);
};

const createListing = async (req, res) => {
    // #swagger.tags = ['land']
    // #swagger.description = 'An insert into the land collection.'
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
    // #swagger.tags = ['land']
    // #swagger.description = 'An id is required to update, use `6372e6e7a272e19be38fa247`.'
    const landId = ObjectId(req.params.id);
    if (!ObjectId.isValid(landId)) {
        res.status(400).json("Use a valid land id to find a specific listing");
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
                _id: landId,
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
    // #swagger.tags = ['land']
    /* #swagger.description = 'Delete requires an id to complete, use one from the GET'
     */
    const landId = ObjectId(req.params.id);
    if (!ObjectId.isValid(landId)) {
        res.status(400).json(
            "Use a valid listing id to delete specific listing."
        );
    }
    try {
        const collection = await _collection();
        const document = await collection.deleteOne({
            _id: landId,
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
        return db.collection("land");
    } catch (error) {
        console.error("Error getting apartment collection", error);
    }
};

module.exports = {
    getAll,
    getOne,
    createListing,
    updateListing,
    deleteListing,
};
