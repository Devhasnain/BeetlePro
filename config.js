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
    order_status: {
        pending: "0",
        active: "1",
        picked_up: "2",
        delivered: "3",
        completed: "4"
    },
    driver_order_status: {
        active: 'active',
        canceled: 'canceled'
    },
    sender_order_status: {
        active: 'active',
        canceled: 'canceled'
    },
    imageURL: "https://phpstack-1080450-3915725.cloudwaysapps.com/image",
    port: 3000
};

export default config