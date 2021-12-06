"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      profile: {
        type: Sequelize.STRING,
      },
      email_verified: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      email_key: {
        type: Sequelize.STRING,
      },
      signup_method: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      total_scraps: {
        type: Sequelize.INTEGER,
      },
      total_subscribes: {
        type: Sequelize.INTEGER,
      },
      total_price: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
