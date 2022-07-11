const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "bal",
  alias: ["balance"],
  description: "Balance",
  usage: "<user>",
  timeout: 2000,
  async execute(client, message, args) {

    let usuario = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    const emoji = '';

    const bal = await client.bal(usuario.id);

    const balance = bal.toLocaleString('en-US');

    const embed = new MessageEmbed()
      .setAuthor({ name: usuario.username, iconURL: usuario.displayAvatarURL({ dynamic: true }) })
      .setTitle(`Informacion de ${usuario.username}`)
      .addField(`Puntos:`, `${emoji}${balance}`, true)
      .setThumbnail(usuario.displayAvatarURL({ dynamic: true }))
      .setFooter(`Points System | Jardín del Filo`)
      .setColor("RANDOM")

    message.channel.send({ embeds: [embed] });

  }

} 