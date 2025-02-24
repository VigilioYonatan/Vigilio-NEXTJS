"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            name: { type: Sequelize.STRING, allowNull: false },
            email: { type: Sequelize.STRING, allowNull: false, unique: true },
            age: { type: Sequelize.INTEGER, allowNull: false },
            role: { type: Sequelize.ENUM("admin", "client"), allowNull: false },
            enabled: { type: Sequelize.BOOLEAN, allowNull: false },
            hobbies: { type: Sequelize.JSON, allowNull: false },
            address: { type: Sequelize.JSON },
            photo: { type: Sequelize.JSON },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable("users");
    },
};
