const express = require('express');

const Project = require('./helpers/projectModel.js');
const Actions = require('./helpers/actionModel.js');

const router = express.Router();

router.use((request, response, next) => {
    next();
});

//====================================================================================================================//

router.get('/', (request, response) => {
    Project.get()
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => {
            response.status(500).json({message: 'project not found', error: error})
        });
});

router.get('/:id', validateProjectId, (request, response) => {
    response.json(request.new_project_id);
});

router.get('/:project_id/actions', validateProjectActions, (request, response) => {
    response.json(request.new_project_id);
});

router.get('/actions/:id', validateActionsId, (request, response) => {
    response.json(request.new_project_id);
});

//====================================================================================================================//

router.post('/', (request, response) => {
    Project.insert(request.body)
        .then(data => {
            response.status(201).json(data);
        })
        .catch(error => {
            response.status(500).json({message: 'problem with api database', error: error})
        })
})

router.post('/:project_id/actions', validateProjectActions, (request, response) => {
    Actions.insert(request.body)
        .then(data => {
            response.status(201).json(data);
        })
        .catch(error => {
            response.status(500).json({message: 'problem with api database', error: error})
        })
})

//====================================================================================================================//

router.delete('/actions/:id', validateActionsId, (request, response) => {
    Actions.remove(request.params.id)
        .then(data => {
            response.status(200).json({message: "the action has been removed"})
        })
        .catch(error => {
            response.status(500).json({message: 'problem with api database', error: error})
        })
    
})

router.delete('/:id', validateProjectId, (request, response) => {
    Project.remove(request.params.id)
        .then(data => {
            response.status(200).json({message: "the project has been removed"})
        })
        .catch(error => {
            response.status(500).json({message: 'problem with api database', error: error})
        })
})

//====================================================================================================================//

router.put('/:id', validateProjectId, (request, response) => {
    const changes = request.body;
    Project.update(request.params.id, changes)
        .then(data => {
            response.status(200).json({message: "the project has been removed"})
        })
        .catch(error => {
            response.status(500).json({message: 'problem with api database', error: error})
        })
    
})

router.put('/actions/:id', validateActionsId, (request, response) => {
    const changes = request.body;
    Actions.update(request.params.id, changes)
        .then(data => {
            response.status(200).json({message: "the project has been removed"})
        })
        .catch(error => {
            response.status(500).json({message: 'problem with api database', error: error})
        })
})

//====================================================================================================================//

function validateActionsId(request, response, next) {
    const {id} = request.params;
    Actions.get(id)
        .then(new_project_id => {
            if(new_project_id) {
                request.new_project_id = new_project_id;
                next();
            }else{
                response.status(404).json({message: 'id not found'})
            }
        })
        .catch(error => {
            response.status(500).json({message: 'problem with api database', error: error})
        });
}

function validateProjectId(request, response, next) {
    const {id} = request.params;
    Project.get(id)
        .then(new_project_id => {
            if(new_project_id) {
                request.new_project_id = new_project_id;
                next();
            }else{
                response.status(404).json({message: 'id not found'})
            }
        })
        .catch(error => {
            response.status(500).json({message: 'problem with api database', error: error})
        });
}

function validateProjectActions(request, response, next) {
    const {project_id} = request.params;
    Project.getProjectActions(project_id)
        .then(new_project_id => {
            if(new_project_id) {
                request.new_project_id = new_project_id;
                next();
            }else{
                response.status(404).json({message: 'id not found'})
            }
        })
        .catch(error => {
            response.status(500).json({message: 'problem with api database', error: error})
        });
}

module.exports = router;