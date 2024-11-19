require("dotenv").config()
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./Routes/routes');
const cors = require('cors')
const connectDb = require("./utils/db");
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

//cors
mongoose.set('strictQuery', true)
app.use('/api',router)

const PORT = 3009;
connectDb().then(()=>{
	app.listen(PORT,()=>{
		console.log(`'server is running  at port : ' ${PORT}`);
	});
});