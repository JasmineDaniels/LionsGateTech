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
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Create a new user
router.post('/signup', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await User.create(userData)

        req.session.save(() => {
          if (newUser){
            req.session.user = {
              username: newUser.username,
            }
            req.session.loggedIn = true
            
          } else {
            req.session.loggedIn = false
          }
        })
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Login an existing user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    if (!userData){ 
      res.status(404).json(`Sorry, there are no users with this username..`)
      return;
    }
    const isValid = await userData.checkPassword(req.body.password)
    
    if (!isValid){
      res.status(400).json({message: `Password or Username is incorrect`})
      return;
    }

    req.session.user = userData.username
    req.session.user_id = userData.id
    req.session.loggedIn = true
    res.status(200).json({user: userData, message: `You're successfully logged in!`})
      
  } catch (error) {
      res.status(400).json(error)
  }
})

//Update a user
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });

    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

//Logout user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
      // res.redirect('/login')
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;