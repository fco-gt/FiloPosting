const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "remove",
  alias: [],
  description: "Desverifica al usuario",
  usage: "<user>",
  timeout: 2000,
  execute(client, message, args) {

    const author = message.member;

    const emoji = '';

    let rol = message.guild.roles.cache.find(r => r.id === '');

    if (!author.roles.cache.has(rol.id)) return message.channel.send(":x:| No puedes utilizar este comando por que no eres un tesorero del curso");

    const member = message.mentions.members.first();

    if (!args[0]) return message.reply("Ingresa la cantidad a remover");

    const razon = args.slice(2).join(" ") ? args.slice(2).join(" ") : "Razon sin especificar";

    if (isNaN(args[0])) return message.reply("Debes ingresar un numero");

    if (!member) return message.reply("Menciona a alguien");

    client.rmv(member.id, parseInt(args[0]));

    let icono = message.author.displayAvatarURL({
      format: 'png',
      dynamic: true,
    });

    const embed = new MessageEmbed()
      .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`:white_check_mark:| Se quitaron ${emoji}${args[0].toLocaleString('en-US')} a ${member}`)
      .addField("Razón:", razon)
      .setFooter(`Quitados por: ${message.author.tag}`)
      .setTimestamp()
      .setColor("RED");

    message.channel.send({ embeds: [embed] });

    console.log(`Se han quitado ${args[0]} a ${member.user.tag}`);

  }

} 