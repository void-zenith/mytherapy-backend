module.exports = (sequelize, DataTypes) => {
    const Occupation = sequelize.define(
      "occupation",
      {
        occupation_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        occupation: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { timestamps: false }
    );
    return Occupation;
  };
  