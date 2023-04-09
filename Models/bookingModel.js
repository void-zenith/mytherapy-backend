module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "booking",
    {
      booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      therapy_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      booking_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      booking_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  return Booking;
};
