// client/src/socket.js

import io from "socket.io-client";
console.log(import.meta.env.VITE_SOCKET_ENDPOINT);
const socket = io(import.meta.env.VITE_SOCKET_ENDPOINT,{
    query: {
        userId: "1234",
    },
});

export default socket;
