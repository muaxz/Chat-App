const {Sequelize} = require("sequelize")

const DB = new Sequelize("chat","root","2231223122aA",{
    dialect:"mysql",
    host:"localhost",
})


module.exports = DB;