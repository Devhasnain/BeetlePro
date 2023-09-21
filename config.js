module.exports = {
    httpMethods: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE'
    ],
    HttpStatusCodes: {
        internalServerError: 500,
        notFound: 404,
    },
    roles: [
        {
            id: 1,
            type: "Admin",
            role: "admin"
        },
        {
            id: 2,
            type: "Driver",
            role: "driver"
        },
        {
            id: 3,
            type: "User",
            role: "user"
        }
    ],
    usersCollection: 'users',
    driversCollection: 'drivers',
    port: 3000
}