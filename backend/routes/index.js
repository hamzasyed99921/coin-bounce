const express = require('express')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth');
const blogController = require('../controllers/bolgController');
const commentController = require('../controllers/commentController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
  })

// user

// resister
router.post('/register', authController.register)

// login
router.post('/login', authController.login)

// logout
router.post('/logout', auth, authController.logout)

// refresh
router.get('/refresh', authController.refresh)

// Blog Routes

// create
router.post('/blog', auth, blogController.create)

// get All
router.get('/blog/all', auth, blogController.getAll)

// get blog by id
router.get('/blog/:id', auth , blogController.getById)

// update 
router.put('/blog/:id', auth , blogController.update)

// delete
router.delete('/blog/:id', auth, blogController.delete)

// Comment Routes
// create
router.post('/comment', auth, commentController.create)
// get by id
router.get('/comment/:id', auth, commentController.getById)

module.exports = router