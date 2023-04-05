module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
    {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
    //
  return Role;
};
