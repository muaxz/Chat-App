const {Sequelize} = require("sequelize")

const DB = new Sequelize("heroku_58f773fba02a511","bb73fa96e2419d","736fa0b2",{
    dialect:"mysql",
    host:"us-cdbr-east-06.cleardb.net",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 60000
    }
})


module.exports = DB;