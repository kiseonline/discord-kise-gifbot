const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
    let avatar = victim.avatarURL({ dynamic: true, size: 2048 });
    let embed = new MessageEmbed()
        .setColor("2F3136")
        .setAuthor(victim.tag, avatar)
        .setDescription(`[Resim Adresi](${avatar})`)
        .setImage(avatar)
    message.channel.send(embed);
};
exports.conf = {
  aliases: ['av'],
  permLevel: 0
};

exports.help = {
  name: 'avatar'
};