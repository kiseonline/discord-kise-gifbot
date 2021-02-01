const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  
    if(args[0] == 'pp'){
      
   
  const kisee = message.guild.members.cache.filter(m=>db.has(`pp.${m.user.id}`)&&!m.user.bot).array().sort((a, b) => { return (db.fetch(`pp.${b.user.id}`) || 0) - (db.fetch(`pp.${a.user.id}`) || 0) });
	const top10 = kisee.splice(0, args[1] || 10)
  var sira = 1
  const map = top10.map(s=>`**・** ${sira++}. <@${s.user.id}> | \`${db.fetch(`pp.${s.user.id}`)||0}\` pp`).join('\n')
  let embed = new Discord.MessageEmbed()
  .setAuthor('SUNUCUADI • TOP 10')
  .setDescription(map||`• Kimse paylaşım yapmamıştır.`)
  message.channel.send(embed)
      return
    } 

    if(args[0] == 'gif'){
      
   
  const kisee = message.guild.members.cache.filter(m=>db.has(`gif.${m.user.id}`)&&!m.user.bot).array().sort((a, b) => { return (db.fetch(`gif.${b.user.id}`) || 0) - (db.fetch(`gif.${a.user.id}`) || 0) });
	const top10 = kisee.splice(0, args[1] || 10)
  var sira = 1
  const map = top10.map(s=>`${sira++}. <@${s.user.id}> | \`${db.fetch(`gif.${s.user.id}`)||0}\` gif`).join('\n')
  let embed = new Discord.MessageEmbed()
  .setAuthor('SUNUCUADI • TOP 10')
  .setDescription(map||`• Kimse paylaşım yapmamıştır. 🥰`)
  message.channel.send(embed)   
      
   return 
  }
  
  const kisee = message.guild.members.cache.filter(m=>db.has(`toplam.${m.user.id}`)&&!m.user.bot).array().sort((a, b) => { return (db.fetch(`toplam.${b.user.id}`) || 0) - (db.fetch(`toplam.${a.user.id}`) || 0) });
	const top10list = kisee.splice(0, args[0] || 10)
  var sira = 1
  const listee = top10list.map(s=>` \`${sira++}-)\` <@!${s.user.id}>・Toplam: **${db.fetch(`toplam.${s.user.id}`)||0}** Fotoğraf: **${db.fetch(`pp.${s.user.id}`)||0}** Gif: **${db.fetch(`gif.${s.user.id}`)||0}** 🥰`).join('\n')
  let embed = new Discord.MessageEmbed()
  .setAuthor(`SUNUCUADI • Sıralama `, message.guild.iconURL ({dynamic: true}))
  .setDescription(listee||`• Kimse paylaşım yapmamıştır.`)
  message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'top',
  description: '',
  usage: ''
}