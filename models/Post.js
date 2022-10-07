const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = require("../config/conenction");

class Post extends Model {}

Comment.init (
    {
        title: {
            type: DataTypes.STRING
        },
            body: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize
    }
)

module.exports = Post;