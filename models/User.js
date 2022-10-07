const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/conenction");

class Post extends Model {}

User.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
                type: DataTypes.STRING,
                allowNull: false
        },
        password: {
            
        }
    },
    {   hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.username = newUserData.username.toLowerCase();
                newUserData.password = await bcrypt.hash(newUserData.password);
                return newUserData;
            },
            beforeUpdate: async(updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.passowrd);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user"
    }
)

module.exports = User;