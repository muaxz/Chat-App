const sequelize = require("../DataBase")
const SequelizeType = require("sequelize")


const Room = sequelize.define("room",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:SequelizeType.INTEGER
    },
    room_name:{
        type:SequelizeType.STRING
    },
    room_limit:{
        type:SequelizeType.INTEGER
    }
})


module.exports = Room;