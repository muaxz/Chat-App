const sequelize = require("../DataBase")
const SequelizeType = require("sequelize")
const RoomModel = require("./rooms")
const UserModel = require("./users")


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

Message.belongsTo(RoomModel)
RoomModel.hasMany(Message)
Message.belongsTo(UserModel)

module.exports = Message;