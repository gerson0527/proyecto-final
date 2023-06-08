const User = require("../models/User");
const sequelize = require("../utils/connection");
require("../models/User");
require("../models/Category");
require("../models");
const main = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.create({
      firstName: "gerson",
      lastName: "ortiz",
      email: "gersongio052@gmail.com",
      password: "123",
      phone: "32334455",
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
