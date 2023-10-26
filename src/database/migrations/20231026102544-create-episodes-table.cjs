'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('episodes', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      synopsis: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      order: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      video_url: {
        type: Sequelize.DataTypes.STRING
      },
      seconds_long: {
        type: Sequelize.DataTypes.INTEGER
      },
      course_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('episodes')
  }
};
