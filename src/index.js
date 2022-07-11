const { Client, Discord, Collection, MessageEmbed } = require("discord.js");

const client = new Client({
  intents: 32767,
});

// Configs
require('dotenv').config();
const mongoose = require('mongoose');

// Export Client
module.exports = client;

// Schemas
const schema = require('./models/schema');
const teams_schema = require('./models/teams');

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();;

// Initializing the project
require("./handler")(client); // Command Handler
require('./configs/db');

// Points
client.bal = (id) => new Promise(async ful => {
  const data = await schema.findOne({ id });
  if (!data) return ful(0);
  ful(data.coins);
})

client.add = (id, coins) => {
  schema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins += coins;
    } else {
      data = new schema({ id, coins })
    }
    data.save();
  })
}

client.rmv = (id, coins) => {
  schema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins -= coins;
    } else {
      data = new schema({ id, coins: -coins })
    }
    data.save();
  })
}

// Teams
client.teamBal = (id) => new Promise(async ful => {
  const data = await teams_schema.findOne({ id });
  if (!data) return ful(0);
  ful(data.coins);
})

client.teamAdd = (id, coins) => {
  teams_schema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins += coins;
    } else {
      data = new teams_schema({ id, coins })
    }
    data.save();
  })
}

client.teamRemove = (id, coins) => {
  teams_schema.findOne({ id }, async (err, data) => {
    if(err) throw err;
    if (data) {
      data.coins -= coins;
    } else {
      data = new teams_schema({ id, coins: -coins })
    }
    data.save();
  })
}

// Login
client.login(process.env.TOKEN);