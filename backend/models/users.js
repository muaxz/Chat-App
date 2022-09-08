const sequelize = require("../DataBase")
const SequelizeType = require("sequelize")
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
    }
})


module.exports = User;