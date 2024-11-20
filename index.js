require("dotenv").config()
const mongoose = require('mongoose');
const express = require('express');
const router = require('./Routes/routes');
const cors = require('cors')
const connectDb = require("./utils/db");
const {GetAccessTokenProfile} = require("./Routes/routes");
const app = express()

const corsOptions = {
	origin: 'https://uat.iamiinsurance.com.au',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	optionsSuccessStatus: 204
};
mongoose.set('strictQuery', true);
app.use(cors(corsOptions));
app.use(express.json());

app.post("/api/companyprofile", async (req, res) => {
	const access_token = await GetAccessTokenProfile();

	console.log(req.body, "body", access_token);
	axios
		.post(
			"https://bpa-uat-australiaeast.chainthat.net/connector-api/route/companyInformation/v1/companyProfile",
			{
				companyIdentifierType: "ABN",
				identifierValue: req.body.abn,
			},
			{
				headers: {
					Authorization: `Bearer ${access_token}`, // Include the Bearer token in the Authorization header
				},
			}
		)
		.then((response) => {
			res.send({ success: true, companyprofile: response.data });
		})
		.catch((err) => {
			res.send({ success: false, message: err });
		});
});

const PORT = 3009;
connectDb().then(()=>{
	app.listen(PORT,()=>{
		console.log(`'server is running  at port : ' ${PORT}`);
	});
});