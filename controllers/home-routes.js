const { Post, User, Comment } = require('../models');
const router = require('express').Router();

//GET All - HOMEPG VIEW
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

router.get('/api/comments', async (req, res) => {
    try {
        const postData = await Comment.findAll({
            include: [{model: User}],
        })

        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE Comment - Homepage
router.post('/api/comments', async (req, res) => {
    try {
        const commentData = await Comment.create({
            author: req.body.author,
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

router.get('/login', (req, res) => {
    res.render('signin')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/dash', (req, res) => {
    res.render('dash')
})

// GET user posts by id - DASH (user_id ? / withAUTH)
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

// CREATE user post - DASH
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

//UPDATE user post - DASH
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

// DELETE user post
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