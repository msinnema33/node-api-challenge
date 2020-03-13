const express = require('express');
const router = express.Router();
const projectModel = require('../../data/helpers/projectModel.js'); 
const Actions = require('../../data/helpers/actionModel.js');  

const { checkProjectId, bodyValidation } = require('./validation-middleware.js'); 

router.get('/', (req, res) => {

    projectModel.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Failed to get projects"});
    });
});

router.get('/:id', checkProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.get('/:id/actions', checkProjectId, (req, res) => {
    const {id} = req.params

    Actions.get(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => res.status(500).json({ message: "Failed to get actions from database", error: err}))
})

router.post('/', bodyValidation, (req, res) => {
    console.log(req.body)
    
    projectModel.insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(err => {
        console.log("projectRouter POST 500 error:", err)
        res.status(500).json({ message: err})
    })
})

router.put('/:id', checkProjectId, (req, res) => {
    projectModel.update(id, body)
    .then(() => {
        projectModel.get(id)
        .then((project) => {
            res.status(200).json(project)
        })
    })
    .catch(err => res.status(500).json({ message: err}))
})

router.delete('/:id', checkProjectId, (req, res) => {
    projectModel.remove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err})
    })
});

module.exports = router;