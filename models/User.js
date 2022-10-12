const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
    // helper method to check password
    checkPassword(loginPassword) {
        // Will compare input password to the passwords we already have stored
        return bcrypt.compareSync(loginPassword, this.password)
    }
}

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
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    // Minimum length is 4
                    len: [4]
                }
        }
    },
    {   
        hooks: {
            // Encrypt password through the model
            beforeCreate: async (newUserData) => {
                newUserData.username = newUserData.username.toLowerCase();
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // Create new password when updated:
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.passowrd);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "User"
    }
)

module.exports = User;