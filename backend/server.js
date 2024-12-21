const express = require('express');
const bodyparser = require('body-parser');
const authRouter = require("./routes/authRouter");
const fundRoutes = require('./routes/fundRoutes');
const scheduler = require('./services/scheduler');
const auth = require('./middleware/auth')

const dotenv = require('dotenv');
dotenv.config();


const app = express();
const PORT = 3000;

app.use(bodyparser.json());


app.use('/auth', authRouter);
app.use('/funds', auth, fundRoutes);
// console.log(scheduler)
scheduler._task._execution();

app.get('/', (req, res) => {
    res.send("Backend up!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
