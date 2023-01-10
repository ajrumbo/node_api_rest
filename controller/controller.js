import Joi from "@hapi/joi";
import formidable from "formidable";
import path from "path";
import fs from "fs";

const ejemploGet = (req, res) => {
    return res.json({msg:'holiiiii GET'})
}

const ejemploPost = (req, res) => {
    const {correo, password} = req.body;

    const schema = Joi.object({
        correo: Joi.string().min(10).max(60).email( { minDomainSegments: 2 } ).required().messages({
            'string.min': 'El correo debe contener al menos 10 caracteres',
            'string.max': 'El correo debe contener máximo 60 caracteres',
            'any.required': 'El correo es obligatorio',
            'string.email': 'El campo debe contener un email válido'
        }),
        password: Joi.string().min(6).max(60).required().empty().messages({
            'string.min': 'La contraseña debe contener al menos 6 caracteres',
            'string.max': 'La contraseña debe contener máximo 60 caracteres',
            'any.required': 'La contraseña es obligatoria',
            'string.empty': 'La contraseña no puede ir vacía'
        })
    });

    const {error, value} = schema.validate({correo, password});


    if(error) return res.status(400).json({msg: error.details[0].message});

    return res.json({msg: `holiiiii POST ${correo} - ${password}`})
}

const ejemploPut = (req, res) => {
    return res.json({msg:'holiiiii PUT'})
}

const ejemploDelete = (req, res) => {
    return res.json({msg:'holiiiii DELETE'})
}

const ejemploGetParametro = (req, res) => {
    const {id} = req.params;
    return res.json({msg:'holiiiii GET + parámetros ' + id})
}

const ejemploUpload = (req, res) => {

    const form = new formidable.IncomingForm();
    form.maxFileSize = 100 * 1024 * 1024; //10Mb

    form.parse(req, async (err, fields, files) => {
        try {
            
            if(err) {
                res.status(400).json({msg: 'Se produjo un error: ' + err});
            }
            
            const file = files.foto;

            if(file.originalFilename === '') {
                res.status(400).json({msg: 'No se cargó ninguna imagen'});
            }

            const imageTypes = [
                'image/jpeg',
                'image/png',
                'image/gif'
            ];

            if(!imageTypes.includes(file.mimetype)) {
                res.status(400).json({msg: 'Formato de archivo no válido. Cargar imagen JPG|PNG|GIF'});
            }

            if(file.size > 100 * 1024 * 1024) {
                res.status(400).json({msg: 'Tamaño máximo del archivo superado (10MB)'});
            }
            
            let unix = Math.round(+new Date() / 1000);
            let nombre_final;

            switch (file.mimetype){
                case "image/jpeg":
                    nombre_final = `${unix}.jpg`;
                    break;
                case "image/png":
                    nombre_final = `${unix}.png`;
                    break;
                case "image/gif":
                    nombre_final = `${unix}.gif`;
                    break;
            }

            const dirFile = path.join(`./assets/uploads/udemy/${nombre_final}`);
            // return console.log(dirFile)

            fs.copyFile(file.filepath, dirFile, function(err){
                if(err) res.status(400).json({msg: err});
            });

            return res.status(200).json({msg: 'Imagen cargada correctamente'});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
    });
}

export {
    ejemploGet,
    ejemploDelete,
    ejemploPost,
    ejemploPut,
    ejemploGetParametro,
    ejemploUpload
}