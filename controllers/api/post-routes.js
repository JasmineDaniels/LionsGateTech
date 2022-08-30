const router = require('express').Router();
const sequelize = require('../../config/connection');
const { QueryTypes } = require('sequelize');
const { Post, User, Comment } = require('../../models')

//Get All Posts - WIP
// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             include: [{model:Comment}, {model: User}],
//         })

//         res.status(200).json(postData)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

// Get one post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
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

// Create a post - DASH
router.post('/', async (req, res) => {
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

//Update a post
// router.put('/dash/api/posts/:id', async (req, res) => {
//     try {
//         const postData = await Post.update( req.body, {
//             where: {
//                 id: req.params.id,
//             },
//         });
//         console.log(postData)

//         if (!postData){
//             res.status(404).json({ message: 'No posts with this id..' })
//             return;
//         }
//         res.status(200).json(postData);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })




router.get('/comments', async (req, res) => {
    try {
        const comment = await sequelize.query(`select username, comment from comment inner join user on user.id = author;`, {type: QueryTypes.SELECT});
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json(error)
    }
    
})

module.exports = router;

// Create a post by id - DASH (user_id)
// router.post('/', (req, res) => {
//     try {
//         const postData = Post.create({
//             title: req.body.title,
//             post_content: req.body.post_content,
//             user_id: req.body.user_id,
//         })

//         if(!postData){
//             res.status(404).json({message: `Post could not be completed at this time..`})
//         } 
//         res.status(200).json(postData)
//     } catch (error) {
//         res.status(500).json(error)
//     }
    
// })