import bodyParser from 'body-parser';
import cors from "cors";
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { IApiRequest } from 'Types/Core';
import { DB_CONNECION, SERVER_PORT } from './Helper/Core/Config';
import connectorDB from './Helper/Dbconnector';
import Route from './Routes/Index';
/* eslint-disable */
const compression = require('compression')

import Logger from './Helper/Core/Logger';
const app = express();

app.use((req: IApiRequest, res, next) => {
    next();
});

app.get('/api/success', (req, res) => {
    res.status(200).json({
        data: 'server running or not check api endpoint'
    });
});

app.use(bodyParser.urlencoded({ limit: "200mb", extended: false }));

// app.use(fileUpload());
app.use(helmet())
app.use(cors());
app.use(compression())

app.use(morgan<Request, Response>('dev'))

app.use(bodyParser.json({ limit: "200mb" }));
const dbConnectionString: string = DB_CONNECION ?? ''

connectorDB(dbConnectionString)

app.use('/admin-panel/api/v1', Route)
app.use("/admin-panel/uploads", express.static("uploads"));
app.use("/admin-panel/images", express.static("images"));
app.use("/admin-panel/videos", express.static("videos"));


const port = SERVER_PORT || 1000
app.listen(port, () => {
    Logger.info(`Application started on ${port}...`)
    console.log(`Application started on ${port}...`)
})

export default app
