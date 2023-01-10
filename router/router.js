import { Router } from "express";
import { ejemploDelete, ejemploGet, ejemploPost, ejemploPut, ejemploGetParametro, ejemploUpload } from "../controller/controller.js";

const router = Router();

const api_ruta = '/api/v1/';

router.get('/',(req,res)=>{res.send('holiii')})
router.get(`${api_ruta}ejemplo`, ejemploGet);
router.post(`${api_ruta}ejemplo`, ejemploPost);
router.put(`${api_ruta}ejemplo`, ejemploPut);
router.delete(`${api_ruta}ejemplo`, ejemploDelete);
router.get(`${api_ruta}ejemplo/:id`, ejemploGetParametro);
router.post(`${api_ruta}ejemplo-upload`, ejemploUpload);

export default router;