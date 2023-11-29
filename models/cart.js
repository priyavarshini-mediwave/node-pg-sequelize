const { DataTypes } = require("sequelize");

module.exports = function model(sequelize, types) {
  const Cart = sequelize.define(
    "cart",
    {
      cart_items_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },

      user_id: {
        type: types.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "user_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      item_id: {
        type: types.UUID,
        references: {
          model: {
            tableName: "items",
          },
          key: "item_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "cart",
    }
  );

  Cart.associate = function (models) {
    Cart.belongsTo(models.users, {
      as: "users",
      foreignKey: "user_id",
      sourceKey: "user_id",
    }),
      Cart.belongsTo(models.items, {
        as: "items",
        foreignKey: "item_id",
        sourceKey: "item_id",
      });
  };

  return Cart;
};
