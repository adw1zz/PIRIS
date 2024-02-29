require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./db/mongodb-inst');
const app = express();
const migr = require('./migr/deposits');
const PORT = process.env.PORT;
const errorMiddleware = require('./middlewares/error-middleware');
const clientRouter = require('./routers/client-router');

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use('/api/clients', clientRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_CONNECTION_URL);
        app.listen(PORT, () => console.log(`Server started on ${PORT}`));
        //await migr();
    } catch (e) {
        console.log(e);
    }
}

start();