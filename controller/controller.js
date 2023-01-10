import Joi from "@hapi/joi";

const ejemploGet = (req, res) => {
    return res.json({msg:'holiiiii'})
}

const ejemploPost = (req, res) => {
    const {correo, password} = req.body;

    const schema = Joi.object({
        correo: Joi.string().min(6).max(60).email( { minDomainSegments: 2 } ).required().messages({
            
        })
    });

    return res.json({msg: `holiiiii ${correo} - ${password}`})
}

const ejemploPut = (req, res) => {
    return res.json({msg:'holiiiii'})
}

const ejemploDelete = (req, res) => {
    return res.json({msg:'holiiiii'})
}

const ejemploGetParametro = (req, res) => {
    const {id} = req.params;
    return res.json({msg:'holiiiii ' + id})
}

export {
    ejemploGet,
    ejemploDelete,
    ejemploPost,
    ejemploPut,
    ejemploGetParametro
}