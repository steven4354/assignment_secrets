// seeds/index.js

const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const models = require('../models');

const mongodbUrl = 'mongodb://localhost/assignment_secret_development';

//requiring faker for random generation
var faker = require('faker');

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {

    // Run your seeds here
    // Example:
    // under the hood password will turn into passwordHash
    return models.User.create({
      name: 'steve',
      email: 'steven4354@gmail.com',
      password: '283948adbds',
      secrets: [faker.lorem.text(), faker.lorem.text(), faker.lorem.text()]
    });
  }
});
