const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let user = message.mentions.members.first() ? message.mentions.members.first() : message.member


  let gifsayisi = await db.fetch(`gif.${user.user.id}`)
  let ppsayisi = await db.fetch(`pp.${user.user.id}`)

  if (!gifsayisi) gifsayisi = 0
  if (!ppsayisi) ppsayisi = 0

  let toplam = gifsayisi + ppsayisi

      
let kiseemb = new Discord.MessageEmbed()
.setAuthor(`BİLGİLENDİRME `, message.guild.iconURL ({dynamic: true}))
.setColor("RANDOM")
.setDescription(`<@${user.user.id}> üyesi sunucumuzda, Toplam : **(** \`${toplam}\`**)** Paylaşım Yapmıştır. \n\n \`•\` **Paylaşılan** \`•\`  Gif Sayısı : **(** \`${gifsayisi}\`**)**       \`>\`       Pp Sayısı : **(** \`${ppsayisi}\`**)**`)
.setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL({dynamic: true}))
  message.channel.send(kiseemb).then(message => message.delete({timeout: 20000}));



  
  
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bilgi', 'istatistik'],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Kise Gif Bilgi',
  usage: 'bilgi'
}