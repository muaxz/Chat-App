const sequelize = require("../DataBase")
const SequelizeType = require("sequelize")


const Message = sequelize.define("message",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:SequelizeType.INTEGER
    },
    message:{
        type:SequelizeType.TEXT
    }
})


module.exports = Message;