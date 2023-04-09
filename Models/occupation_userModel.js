module.exports = (sequelize, DataTypes) => {
    const OccupationUser = sequelize.define(
      "occupationuser",
      {
        occuserid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        occupation_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { timestamps: false }
    );
    //
    return OccupationUser;
  };
  