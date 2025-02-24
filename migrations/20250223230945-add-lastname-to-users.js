"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        // await queryInterface.addColumn("users", "lastname", {
        //     type: Sequelize.STRING,
        //     allowNull: true, // Puede ser `false` si la columna debe ser obligatoria
        // });
        await queryInterface.sequelize.query(`
          ALTER TABLE users ADD COLUMN lastname VARCHAR(255) NULL AFTER name;
      `);
    },

    async down(queryInterface) {
        await queryInterface.removeColumn("users", "lastname");
    },
};
