const User = require("./User");
const Comment = require("./Comment");
const Post = require("./Post");

Post.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})

Post.hasMany(Comment, {

})