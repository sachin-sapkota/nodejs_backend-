require("dotenv").config()
const mongoose = require('mongoose');
const express = require('express');
const router = require('./Routes/routes');
const cors = require('cors')
const connectDb = require("./utils/db");
const app = express()

const corsOptions = {
	origin: 'https://uat.iamiinsurance.com.au',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express.json());

//cors
mongoose.set('strictQuery', true);
app.use('/api',router);

const PORT = 3009;
connectDb().then(()=>{
	app.listen(PORT,()=>{
		console.log(`'server is running  at port : ' ${PORT}`);
	});
});