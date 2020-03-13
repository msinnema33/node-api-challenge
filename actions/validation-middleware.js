module.exports = {
    checkActionId,
    bodyValidation
};

const Actions = require('../data/helpers/actionModel.js'); //need to check path

function checkActionId(req, res, next) {
    const { id } = req.params

    Actions.get(id)
     .then((action) => {
         if (action) {
             req.action = action
             console.log(req.action)
             next()
         } else {
             res.status(404).json({ message: "Action with provided ID does not exist"})
         }
     })
     .catch(err => res.status(500).json({ message: "Failed to get the action from the database", error: err}))
}

function bodyValidation(req, res, next) {
    const { name, description } = req.body;

    console.log("Action val middleware bodyVal req.body: ", JSON.stringify(req.body))

    if(name && description) {
        next()
    } else {
        res.status(400).json({ message: 'Please add name and description'})
    }
}