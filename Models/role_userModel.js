module.exports = (sequelize, DataTypes) => {
  const RoleUser = sequelize.define(
    "roleuser",
    {
      roleuserid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: {
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
  return RoleUser;
};
