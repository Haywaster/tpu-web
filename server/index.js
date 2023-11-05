import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';

const PORT = process.env.PORT ?? 3001;
const DB_URL = 'mongodb+srv://user:user@haywaster.3puiwd7.mongodb.net/?retryWrites=true&w=majority';
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

const startApp = async () => {
	try {
		await mongoose.connect(DB_URL);
		app.listen(PORT, () => console.log(`Example app listening on port ${ PORT }!`));
	} catch (error) {
		console.error(error);
	}
};

startApp()