const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt')

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll()

        if (!userData){
            res.status(404).json(`No users yet..`)
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET a user
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        if(!userData){
            res.status(404).json(`Opps no user by that id..`)
            return;
        } 
        res.json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Create a new user
router.post('/signup', async (req, res) => {
    try {
        const userData = req.body;
        userData.password = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create(userData)
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Login an existing user
router.post('/login', async (req, res) => {
    const userData = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    if (!userData){
        res.status(404).json(`Sorry, there are no users with this username..`)
        return;
    }

    const isValid = await bcrypt.compare(req.body.password, userData.password)
    isValid ? 
    res.json({message: `You're successfully logged in!`, isValid}) :
    res.json({message: `Password is incorrect`, isValid})
})

//Update a user

//Delete a user
router.delete('/:id', async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!userData) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;