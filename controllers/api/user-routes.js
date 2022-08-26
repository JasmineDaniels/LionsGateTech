const router = require('express').Router();
const User = require('../../models/User');

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

// Create a user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        })
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
})

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