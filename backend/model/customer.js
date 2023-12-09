module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customers",
    {
      dokanId: {
        type: DataTypes.INTEGER,
      },
      customerName: {
        type: DataTypes.STRING,
      },
      customerPhone: {
        type: DataTypes.STRING,
      },
      customerAddress: {
        type: DataTypes.STRING,
      },
      totalAmount: {
        type: DataTypes.DOUBLE,
        default: 0.0,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  return Customer;
};
