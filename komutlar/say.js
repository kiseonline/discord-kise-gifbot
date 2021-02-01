const { MessageEmbed } = require("discord.js");
const { Discord } = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
   let embed = new MessageEmbed().setColor("RANDOM")
  message.channel.send(embed.setDescription(`• Sunucumuzda toplam \`${message.guild.memberCount}\`\ üye bulunmaktadır.`)).then(x => x.delete({timeout: 5000}));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['say'],
  permLevel: 0
}
exports.help = {
  name: 'say',
  description: "",
  usage: ''
}
