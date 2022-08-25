var express         = require('express');
var app             = express();
var cors            = require('cors');
var dal             = require('./dal.js');
const e             = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'MIT Capstone - Full-Stack Banking Application',
            version: '1.0.0'
        }
    },
    apis: ['./index.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

/**
 * @swagger
 *  /account/create/{name}/{email}/{password}/{uid}:
 *      get:
 *          description: Log the user in
 *          parameters:
 *              - in: path
 *                name: name
 *              - in: path
 *                name: email
 *              - in: path
 *                name: password
 *              - in: path
 *                name: uid
 *          responses:
 *              200:
 *                  description: Success
 */
// create user account
app.get('/account/create/:name/:email/:password/:uid', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password,req.params.uid).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});

/**
 * @swagger
 * paths:
 *  /account/login/{email}/{password}:
 *      get:
 *          description: Log the user in
 *          parameters:
 *              - in: path
 *                name: email
 *              - in: path
 *                name: password
 *          responses:
 *              200:
 *                  description: Success
 */
// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

/**
 * @swagger
 * paths:
 *  /account/find/{email}:
 *      get:
 *          description: Find user account
 *          parameters:
 *              - in: path
 *                name: email
 *          responses:
 *              200:
 *                  description: Success
 */
// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

/**
 * @swagger
 * paths:
 *  /account/update/{email}/{amount}:
 *      get:
 *          description: Update balance (deposit/withdraw)
 *          parameters:
 *              - in: path
 *                name: email
 *              - in: path
 *                name: amount
 *          responses:
 *              200:
 *                  description: Success
 */
// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

/**
 * @swagger
 * /account/all:
 *  get:
 *      description: Get all accounts
 *      responses:
 *          200:
 *              description: Success
 */
// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on port: ' + port);