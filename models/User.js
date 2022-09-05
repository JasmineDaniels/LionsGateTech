const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPW){
        return bcrypt.compareSync(loginPW, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10],
            },
        },
    },
    {
        hooks:{
            // beforeBulkCreate: async (newUserData) => {
            //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
            //     return newUserData
            // },
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            },
            beforeUpdate: async (updatedUserData) => {
                if (updatedUserData.password) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                }   
                return updatedUserData
            },
  
        },
        sequelize,
        timestamps:false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;