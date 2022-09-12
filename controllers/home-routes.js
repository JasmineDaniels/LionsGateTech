const { Post, User, Comment } = require('../models');
const { isAuth } = require('../utils/helpers');
const router = require('express').Router();

//GET All - HOMEPG VIEW
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [
                ['createdAt', 'DESC'],
                // [Comment, 'createdAt', 'DESC']
            ],
            include: [
                { 
                    model: User, 
                    attributes: ['username']
                },
                {
                    model: Comment,
                    // order: [
                    //     [Comment, 'createdAt', 'DESC']
                    // ],
                    include: [
                        {
                            model: User, 
                            attributes: [
                                'username',
                            ]
                        }
                    ]
                }
            ],
        })

        const posts = postData.map((post) => post.get({plain: true}));
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
});

//GET All Posts - API - WIP
router.get('/api/posts', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{model:Comment}, {model: User}],
        })

        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET all Comments - API
router.get('/api/comments', async (req, res) => {
    try {
        const postData = await Comment.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }],
        })

        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE Comment - API - Homepage
router.post('/api/comments', isAuth, async (req, res) => {
    try {
        
        const commentData = await Comment.create({
            user_id: req.session.user_id, 
            comment: req.body.comment,
            post_id: req.body.post_id,
        })

        if (!commentData) {
            res.status(404).json({message: `Your comment could not be posted at this time..`})
        }
        res.status(200).json(commentData)
    } catch (error) {
        res.status(500).json(error)
    }
    
})

//LOGIN VIEW
router.get('/login', (req, res) => {
    if (req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('signin')
})

//SIGN UP VIEW
router.get('/signup', (req, res) => {
    res.render('signup')
})

// GET user posts - DASH VIEW
router.get(`/dash`, isAuth, async (req, res) => {
    try {   
        
        const userData = await User.findOne({
            where: {
                username: req.session.user
            },
            include: [
                {
                    model: Post,
                    attributes: [
                        'title',
                        'post_content',
                        'createdAt',
                        'id'
                    ],
                    include: {
                        model: User, 
                        attributes: [
                            'username',
                        ]
                    }
                }
            ]
        }); 
        
        const posts = userData.get({ plain: true })
        res.render('dash', {
            posts,
            loggedIn: req.session.loggedIn,
        })
        
    } catch (error) {
        res.status(500).json(error);
    }
    
})

// CREATE user post - API - DASH 
router.post('/dash/api/posts', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.body.user_id,
        });

        if(!postData){
            res.status(404).json({message: `Post could not be completed at this time..`})
            return;
        } 
        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE user post - API - DASH
router.put('/dash/api/posts/:id', async (req, res) => {
    try {
        const postData = await Post.update( req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!postData){
            res.status(404).json({ message: 'No posts with this id..' })
            return;
        }
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
})

// DELETE user post - API - DASH
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