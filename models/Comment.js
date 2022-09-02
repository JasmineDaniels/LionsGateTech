const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        // author: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
    },
    {
        // hooks: {
        //     beforeCreate: async (commentData) => {
        //         commentData.author = await User.findByPk({
        //             where: {
        //                 id: commentData.user_id,
        //             },
                    
        //         })
        //     }
        // },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;