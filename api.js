const dboperations = require('./dboperations');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
    console.log('middleware');
    next();
});

router.use((request,response,next)=>{
    console.log('middleware');
    next();
});

router.route('/employees').get((request,response) => 
    dboperations.getEmployees().then(result => 
        response.json(result[0])
    )
);

router.route('/employee/:id').get((request,response) => 
    dboperations.getEmployeeById(request.params.id).then(result => 
        response.json(result[0])
    )
)

router.route('/employee').post((request,response) => 
    dboperations.addEmployee({...request.body}).then(result => response.status(201).json(result) )
);

router.route('/employee').put((request,response) => 
    dboperations.updateEmployee({...request.body}).then(result => response.status(201).json(result) )
);

router.route('/employee').delete((request,response) => 
    dboperations.deleteEmployee(request.params.id).then(result => response.status(201).json(result) )
);