module.exports = {
    checkProjectId,
    bodyValidation
};

const Projects = require('../projectModel.js'); //need to check path

function checkProjectId(req, res, next) {
    const { id } = req.params

    Projects.get(id)
     .then((project) => {
         if (project) {
             req.project = project
             console.log(req.project)
             next()
         } else {
             res.status(404).json({ message: "Project with provided ID does not exist"})
         }
     })
     .catch(err => res.status(500).json({ message: "Failed to get the project from the database", error: err}))
}

function bodyValidation(req, res, next) {
    const { name, description } = req.body;

    console.log("Project val middleware bodyVal req.body: ", JSON.stringify(req.body))

    if(name && description) {
        next()
    } else {
        res.status(400).json({ message: 'Please add name and description'})
    }
}