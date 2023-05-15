const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel.js")(sequelize, DataTypes);
db.document = require("./documentModel.js")(sequelize, DataTypes);
db.image = require("./imageModel.js")(sequelize, DataTypes);
db.role = require("./roleModel.js")(sequelize, DataTypes);
db.role_user = require("./role_userModel.js")(sequelize, DataTypes);
db.booking = require("./bookingModel")(sequelize, DataTypes);
db.occupation = require("./OccupationModel.js")(sequelize, DataTypes);
db.occupation_user = require("./occupation_userModel")(sequelize, DataTypes);
// db.booking = require("./bookingModel.js")(sequelize, DataTypes);

db.user.hasOne(db.document, {
  foreignKey: "user_id",
});
db.user.hasOne(db.image, {
  foreignKey: "user_id",
});

db.user.hasOne(db.role_user, {
  foreignKey: "user_id",
});
db.role.hasMany(db.role_user, {
  foreignKey: "role_id",
});
db.role_user.belongsTo(db.role, {
  foreignKey: "role_id",
});

db.user.hasOne(db.occupation_user, {
  foreignKey: "user_id",
});
db.occupation.hasMany(db.occupation_user, {
  foreignKey: "occupation_id",
});
db.occupation_user.belongsTo(db.occupation, {
  foreignKey: "occupation_id",
});
db.occupation_user.belongsTo(db.user, {
  foreignKey: "user_id",
});

db.user.hasMany(db.booking, {
  foreignKey: "user_id",
});
db.sequelize.sync({ force: false }).then(() => {
  console.log("resync complete!");
});

module.exports = db;
