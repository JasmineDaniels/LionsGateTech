const { Post, User, Comment } = require('../models');
//const { getAttributes } = require('../models/User');
const router = require('express').Router();

// router.get('/', (req, res) => {
//     res.render('home')
// })

//GET all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                { 
                    model: User, 
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                    'comment',
                    'author',
                    'createdAt'
                    ]
                }
            ],
        })

        const posts = postData.map((post) => post.get({plain: true}));
        res.render('home', {posts})
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
});

router.get('/login', (req, res) => {
    res.render('signin')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/dash', (req, res) => {
    res.render('dash')
})

// GET user posts by id - DASH (user_id ?)
router.get('/dash/:id', async (req, res) => {
    try {

        const userData = await User.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Post,
                attributes: [
                    'title',
                    'post_content',
                    'createdAt'
                ]
            }
        })
        
        const posts = userData.get({ plain: true })
        res.render('dash', posts )
    } catch (error) {
        res.status(500).json(error);
    }
    
})



module.exports = router;