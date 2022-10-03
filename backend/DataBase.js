const {Sequelize} = require("sequelize")

const DB = new Sequelize("heroku_58f773fba02a511","bb73fa96e2419d","736fa0b2",{
    dialect:"mysql",
    host:"us-cdbr-east-06.cleardb.net",
})


module.exports = DB;