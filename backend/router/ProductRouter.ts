import express from 'express';
import { handleGetData, handleProductPUsh } from '../controller/ProductContrller';

export const ProductRouter = express.Router();


// ProductRouter.get("/push",handleProductPUsh);
ProductRouter.get('/getdata',handleGetData);



