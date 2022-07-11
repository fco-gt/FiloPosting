// Client Configs
const { MessageEmbed, Collection, Guild } = require('discord.js');
const client = require("../bot");

// Configs
const Timeout = new Collection();
const ms = require('ms');

// Message
client.on("messageCreate", async (message) => {

  if(message.author.bot) return;

  if (!message.guild) return;

  // Prefix
  const p = process.env.prefix;

  // Conditionals
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.startsWith(p)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(p.length)
    .trim()
    .split(" ");

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.alias ?.includes(cmd.toLowerCase()));

  if (command) {
    if (command.timeout) { // Timeout
      if (Timeout.has(`${command.name}${message.author.id}`)) return message.reply(`:x:| No spamees comandos`)
      
      Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
      setTimeout(() => {
        Timeout.delete(`${command.name}${message.author.id}`)
      }, command.timeout)
    }
  }
  if (!command) return;
});