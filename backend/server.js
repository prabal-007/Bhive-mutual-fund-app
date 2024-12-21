const express = require('express');
const bodyparser = require('body-parser');
const authRouter = require("./routes/authRouter");
const fundRoutes = require('./routes/fundRoutes');
const auth = require('./middleware/auth')
const cors = require('cors');


const dotenv = require('dotenv');
dotenv.config();


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyparser.json());


app.use('/auth', authRouter);
app.use('/funds', auth, fundRoutes);

app.get('/', (req, res) => {
    res.send("Backend up!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
