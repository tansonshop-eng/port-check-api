const express = require("express");
const cors = require("cors");
const net = require("net");

const app = express();
app.use(cors());

// API check port
app.get("/check-port", (req, res) => {
    const host = req.query.host;
    const port = parseInt(req.query.port);

    if (!host || !port) {
        return res.json({ error: "Missing host or port" });
    }

    let socket = new net.Socket();
    socket.setTimeout(2000);

    socket.on("connect", () => {
        res.json({ status: "open" });
        socket.destroy();
    });

    socket.on("timeout", () => {
        res.json({ status: "closed" });
        socket.destroy();
    });

    socket.on("error", () => {
        res.json({ status: "closed" });
    });

    socket.connect(port, host);
});

// Trang test
app.get("/", (req, res) => {
    res.send("API is running");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
