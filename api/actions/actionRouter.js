const express = require('express');
const router = express.Router();
const Actions = require('../../data/helpers/actionModel.js');



const { checkActionId, bodyVal } = require('./validation-middleware.js'); 

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => res.status(500).json({ message: 'Failed to get actions from database', error: err}))
})

router.get('/:id', checkActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', bodyVal, (req, res) => {
    Actions.insert(req.body)
    .then(action => res.status(201).json(action))
    .catch(err => res.status(500).json({ message: err}))
})

router.put('/:id', checkActionId, (req, res) => {
    const { id } = req.params

    Actions.update(id, req.body)
    .then(() => {
        Actions.get(id)
        .then((action) => {
            res.status(200).json(action)
        })
    })
    .catch(err => res.status(500).json({ message: 'Failed to update the action', error: err}))
})

router.delete(':id', checkActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(action => res.status(204).end())
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to delete action', error: err})
    })
});

module.exports = router;