const express = require('express');
const cors = require('cors');

// require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json())


const PORT = process.env.PORT || 8080

server.get('/', (req, res) => {
    res.send('Home route');
})

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
