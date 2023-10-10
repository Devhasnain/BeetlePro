const config = {
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
    SUPPORTEDMETHOD: 'POST',
    SUPPORTEDGETMETHOD: "GET",
    order: {
        schedule: 'scheduled',
        completed: "completed",
        cancel: "canceled",
        pending: 'pending',
        accept: 'active',
        delivered: 'delivered',
        picked_up: "picked_up"
    },
    driver_order_status: {
        active: 'active',
        canceled: 'canceled'
    },
    sender_order_status: {
        active: 'active',
        canceled: 'canceled'
    },
    imageURL: "http://localhost:3001/image",
    port: 3000
};

export default config