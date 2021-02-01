const Discord = require('discord.js');
const MessageEmbed = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

 
  let user = message.mentions.members.first()
	let kiseemb = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(ayar.Footer).setColor("2F3136").setTimestamp();
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(kiseemb.setDescription(`Dostumm yetkin yetmiyorrr`)).then(message => message.delete({timeout: 15000}));
  if(!user) return message.channel.send(kisegod.setDescription(`Kime puan ekleyeceğimi nerden bilebilirim ?`)).then(message => message.delete({timeout: 15000}));
  
  if(!args[1]) return message.channel.send(kisegod.setDescription(`${message.author}, Paylaşım kategorisi girmen şart dostummm.`)).then(message => message.delete({timeout: 15000}));
   
  if(!['gif','pp'].includes(args[1])) return message.channel.send(`${message.author}, Paylaşım kategorisi girmen şart dostummm.`).then(message => message.delete({timeout: 15000}));
   
   if(!args[2]) return message.channel.send(kisegod.setDescription(`${message.author}, Ekliyeceğin miktarı yazmalısın!`)).then(message => message.delete({timeout: 15000}));
  
   if(isNaN(args[2]))return message.channel.send(kisegod.setDescription(`${message.author}, Ekleyeceğin miktar sayı olmalı!`)).then(message => message.delete({timeout: 15000}));


  db.add(`${args[1]}.${user.user.id}`,args[2])
  db.add(`toplam.${user.user.id}`,args[2])
  
  message.channel.send(kisegod.setDescription(`${message.author}, ${user} Kullanıcısına ${args[2]} Miktarındaki puanı ekledim!`)).then(message => message.delete({timeout: 15000}));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ekle',
  description: '',
  usage: ''
}