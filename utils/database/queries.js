const Drivers = require("../../database/models/Driver");
const Users = require("../../database/models/User")

const getCustomersCollection = () => {
    return Users.find();
};

const getCollectionByName = async (collection) => {
    return async () => {

        if (collection === 'drivers') {
            return Drivers;
        }

        if (collection === 'customers') {
            return Users;
        }

    }
}

module.exports = { getCustomersCollection, getCollectionByName };