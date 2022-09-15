const sequelize = require("../DataBase")
const SequelizeType = require("sequelize")
const Room = require("./rooms")
const {v4} = require("uuid")


const User = sequelize.define("user",{
    id:{
        primaryKey:true,
        unique:true,
        type:SequelizeType.UUID
    },
    profile_url:{
        type:SequelizeType.STRING
    },
    user_name:{
        type:SequelizeType.STRING
    },
    roomId:{
        type:SequelizeType.INTEGER
    }
})

User.belongsTo(Room)
Room.hasMany(User)

module.exports = User;