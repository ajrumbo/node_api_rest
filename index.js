import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./router/router.js";


dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('./assets'));

app.use('/', router);
app.use((req, res) => {
    res.status(404).json({msg: 'Error, página no encontrada' })
});

app.listen(process.env.PORT, () => {
    console.log('Corriendo')
});