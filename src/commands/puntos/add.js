const { MessageEmbed } = require('discord.js');

const db = require('../../models/teams');

module.exports = {
  name: "add",
  alias: ["agregar"],
  description: "Agrega dinero",
  usage: "<user>",
  timeout: 2000,
  async execute(client, message, args) {

    const author = message.member;

    // ID for DB
    let verde_id = '995446299077922836';
    let azul_id = '995446608890175578';
    let rojo_id = '995446813601583154';
    let amarillo_id = '995446942127620106';

    // Teams Bal
    let puntosVerde = await client.teamBal(verde_id);
    let puntosAzul = await client.teamBal(azul_id);
    let puntosRojo = await client.teamBal(rojo_id);
    let puntosAmarillo = await client.teamBal(amarillo_id);

    // Roles
    let rol = message.guild.roles.cache.find(r => r.id === '995422094861012992');
    let verde = message.guild.roles.cache.find(r => r.id === '995446299077922836');
    let azul = message.guild.roles.cache.find(r => r.id === '995446608890175578');
    let rojo = message.guild.roles.cache.find(r => r.id === '995446813601583154');
    let amarillo = message.guild.roles.cache.find(r => r.id === '995446942127620106');

    if (!author.roles.cache.has(rol.id)) return message.channel.send(":x:| No puedes utilizar este comando ya que no eres un tesorero del curso");

    const emoji = '<:amogusexe:881577541838712872>';

    const puntos = args[0];

    const razon = args.slice(2).join(" ") ? args.slice(2).join(" ") : "Razon sin especificar"

    const member = message.mentions.members.first() || client.users.cache.get(args[1]);

    if (!puntos) return message.reply("Ingresa la cantidad a agregar");

    if (!member) return message.reply("Debes mencionar a alguien");

    if (isNaN(puntos)) return message.reply("Debes ingresar un **numero** a agregar");

    client.add(member.id, parseInt(puntos));

    console.log(`Se han agregado ${puntos} a ${member.user.tag}`);

    // Teams

    if (member.roles.cache.has(verde.id)) { // Equipo Verde
      client.teamAdd(verde_id, parseInt(puntos));

      let puntosTotales = parseInt(puntosVerde) + parseInt(puntos);

      const embed = new MessageEmbed()
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`:white_check_mark:| Se agregaron ${emoji}${puntos.toLocaleString('en-US')} a ${member}`)
        .addField("Total de puntos del equipo:", `El equipo **Verde** queda con un total de **${emoji}${puntosTotales.toLocaleString('en-US')}**`)
        .setFooter(`Agregados por: ${message.author.tag}`)
        .setTimestamp()
        .setColor("GREEN");

      message.channel.send({ embeds: [embed] });
    }

    if (member.roles.cache.has(azul.id)) { // Equipo Azul
      client.teamAdd(azul_id, parseInt(puntos));

      let puntosTotales = parseInt(puntosAzul) + parseInt(puntos);

      const embed = new MessageEmbed()
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`:white_check_mark:| Se agregaron ${emoji}${puntos.toLocaleString('en-US')} a ${member}`)
        .addField("Total de puntos del equipo:", `El equipo **Azul** queda con un total de **${emoji}${puntosTotales.toLocaleString('en-US')}**`)
        .setFooter(`Agregados por: ${message.author.tag}`)
        .setTimestamp()
        .setColor("BLUE");

      message.channel.send({ embeds: [embed] });
    }

    if (member.roles.cache.has(rojo.id)) { // Equipo Rojo
      client.teamAdd(rojo_id, parseInt(puntos));

      let puntosTotales = parseInt(puntosRojo) + parseInt(puntos);

      const embed = new MessageEmbed()
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`:white_check_mark:| Se agregaron ${emoji}${puntos.toLocaleString('en-US')} a ${member}`)
        .addField("Total de puntos del equipo:", `El equipo **Rojo** queda con un total de **${emoji}${puntosTotales.toLocaleString('en-US')}**`)
        .setFooter(`Agregados por: ${message.author.tag}`)
        .setTimestamp()
        .setColor("RED");

      message.channel.send({ embeds: [embed] });
    }

    if (member.roles.cache.has(amarillo.id)) { // Equipo Amarillo
      client.teamAdd(amarillo_id, parseInt(puntos));

      let puntosTotales = parseInt(puntosAmarillo) + parseInt(puntos);

      const embed = new MessageEmbed()
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`:white_check_mark:| Se agregaron ${emoji}${puntos.toLocaleString('en-US')} a ${member}`)
        .addField("Total de puntos del equipo:", `El equipo **Amarillo** queda con un total de **${emoji}${puntosTotales.toLocaleString('en-US')}**`)
        .setFooter(`Agregados por: ${message.author.tag}`)
        .setTimestamp()
        .setColor("YELLOW");

      message.channel.send({ embeds: [embed] });
    }

  }

} 