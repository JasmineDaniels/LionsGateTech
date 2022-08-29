const { Post, User, Comment } = require('../models');
//const { getAttributes } = require('../models/User');
const router = require('express').Router();


//GET All - HOMEPG
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
                    'createdAt',
                    'id'
                ]
            }
        })
        
        const posts = userData.get({ plain: true })
        res.render('dash', posts )
    } catch (error) {
        res.status(500).json(error);
    }
    
})

router.post('/dash/api/posts', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.body.user_id,
        })
        console.log(postData)

        if(!postData){
            res.status(404).json({message: `Post could not be completed at this time..`})
            return;
        } 
        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/dash/api/posts/:id', async (req, res) => {
    try {
        const postData = await Post.update( req.body, {
            where: {
                id: req.params.id,
            },
        });
        console.log(postData)

        if (!postData){
            res.status(404).json({ message: 'No posts with this id..' })
            return;
        }
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/dash/api/posts/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData){
            res.status(404).json({ message: 'No posts with this id..' })
            return;
        }
        res.json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;