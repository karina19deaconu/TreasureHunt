const Sequelize = require('sequelize');

const sequelize = new Sequelize("treasure_hunt", "root", "", {
    dialect: "mysql",
    host: "localhost",
    logging: false,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    },
    port: 7777,
});

module.exports = sequelize;

//formular

const {Sequelize, DataTypes} = require('sequelize');

const database = require('../config/db');

module.exports = (database, DataTypes) => {
    return database.define("inscriere", {
    Id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    nume: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenume: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefon: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    gmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
})
}

//

const Inscrieri = require('../models').inscriere;

const validare = {
    adaugaInscriere: (req, res) => {
        const {nume, prenume, telefon, gmail} = req.body;

        Inscrieri.create({nume, prenume, telefon, gmail})
            .then((inscriere) => {
                res.status(200).send(inscriere);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('A aparut o eroare!');
            });
    },
};

module.exports = validare;

//validare

const express = require('express');
const router = express.Router();

const validare_inscriere = require('../validare/inscriere');

router.post('/adauga', validare_inscriere.adaugaInscriere);

router.get('/getAll', validare_inscriere.getAllInscrieri);

module.exports = router;

//

const model_inscriere = require('./inscriere');
const db = require('../config/db');
//const { Sequelize } = require('sequelize');

const inscriere = model_inscriere(db, Sequelize);

module.exports = {
    inscriere,
    connection: db
}