const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const chalk = require("chalk")
const fs = require("fs")
const moment = require("moment")
const db = require("quick.db")
const request = require("request")
const ms = require("parse-ms")
const express = require("express")
const http = require("http")
const app = express()
const logs = require("discord-logs")
require("moment-duration-format")
logs(client)
require("./util/eventLoader")(client)
var prefix = ayarlar.prefix
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.gif = {
  kategoriler: ["805150044885221396",], //gif kategori idleri
  log: "805797510630473738", //Gif-Log (kanal id)
  sunucu: "Sunucu adı", //Sunucunuzun İsmi
  rastgele: {
    PP: "805153402027245568", //Random PP (kanal id)
    GIF: "805153411040542750" //Random Gif (kanal id)
  }
  
}
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



// Sadece GİF/PP ATMAK

 client.on('message', async msg =>{
  
   let categories = client.gif.kategoriler
    
   if(msg.attachments.size == 0&&categories.includes(msg.channel.parentID)){
  
  if(msg.author.bot) return;
  
  msg.delete({timeout:500})
  
 msg.reply("**Bu Kanal da sadece Paylaşım yapabilirsiniz.**").then(m=>m.delete({timeout:1000}))
  
}


client.on('message', async msg =>{
  
  let categories = client.gif.kategoriler
   
  if(msg.attachments.size == 0&&categories.includes(msg.channel.parentID)){
 
 if(msg.author.bot) return;
 
 msg.delete({timeout:500})
 
msg.reply("**Bu Kanal da sadece Paylaşım yapabilirsiniz.**").then(m=>m.delete({timeout:1000}))
 
}

})
  
  
  
  /////////////// log kanal
  
  if(msg.attachments.size > 0 && categories.includes(msg.channel.parentID)){

  db.add(`toplam.${msg.author.id}`,msg.attachments.size)

  let pp = 0
  let gif = 0
  msg.attachments.forEach(atch=>{
   if(atch.url.endsWith('.webp')||atch.url.endsWith('.png')||atch.url.endsWith('.jpeg')||atch.url.endsWith('.jpg')){
     db.add(`pp.${msg.author.id}`,1)
     pp = pp + 1
   }
    if(atch.url.endsWith('.gif')){
     db.add(`gif.${msg.author.id}`,1)
      gif = gif +1
    }
  })
  let mesaj = ``
  if(gif > 0 && pp === 0){
    mesaj = `${gif} GIF`
  }
if(pp > 0 && gif === 0){
    mesaj = `${pp} PP`
  }
if(gif > 0 && pp > 0){
    mesaj = `${pp} PP, ${gif} GIF`
  }

let embed =  new Discord.MessageEmbed()
.setAuthor(`GİF Soul • Log `, msg.guild.iconURL ({dynamic: true}))
.setThumbnail(msg.guild.iconURL())
.setDescription(`\`•\` <@${msg.author.id}>,<#${msg.channel.id}> kanalına **${mesaj}** gönderdi.\n\n Kullanıcı şu zamana kadar : \n\n **${db.fetch(`gif.${msg.author.id}`)||0}** tane GIF, **${db.fetch(`pp.${msg.author.id}`)||0}** tane fotoğraf, toplamda **${db.fetch(`toplam.${msg.author.id}`)||0}** paylaşım yaptı.`)
.setFooter(`${msg.author.username} tarafından gönderildi!.`, msg.author.avatarURL({dynamic: true}))
//.setThumbnail(message.author.displayAvatarURL())
.setColor("BLACK");
msg.guild.channels.cache.get(client.gif.log).send(embed)  
  

if (db.fetch(`toplam.${msg.author.id}`) == 50) {
  msg.member.roles.add(ayarlar.level5)//rol id

  let embed =  new Discord.MessageEmbed()
  .setDescription(`:tada: ${msg.author} tebrikler 5 seviyeye ulaştın, Bu yüzden <@&782538554361249802> rolüne terfi edildin!`)
  .setFooter(`${msg.author.username}`, msg.author.avatarURL({dynamic: true}))
  .setTimestamp()
  msg.guild.channels.cache.get(ayarlar.levelkanal).send(embed)  
    


}else 

if (db.fetch(`toplam.${msg.author.id}`) == 100) {
msg.member.roles.add(ayarlar.level10)//rol id

msg.channel.send(`${msg.author} :sunglasses:`)
let embed22 =  new Discord.MessageEmbed()
.setDescription(`:tada: ${msg.author} tebrikler 10 seviyeye ulaştın, Bu yüzden <@&782538554361249802> rolüne terfi edildin!`)
.setFooter(`${msg.author.username}`, msg.author.avatarURL({dynamic: true}))
.setTimestamp()
msg.guild.channels.cache.get(ayarlar.levelkanal).send(embed22)  

}else 

if (db.fetch(`toplam.${msg.author.id}`) == 200) {
  msg.member.roles.add(ayarlar.level15)//rol id

  let embed23 =  new Discord.MessageEmbed()
  .setDescription(`:tada: ${msg.author} tebrikler 15 seviyeye ulaştın, Bu yüzden <@&782538554361249802> rolüne terfi edildin!`)
  .setFooter(`${msg.author.username}`, msg.author.avatarURL({dynamic: true}))
  .setTimestamp()
  msg.guild.channels.cache.get(ayarlar.levelkanal).send(embed23)  

}else 

  if (db.fetch(`toplam.${msg.author.id}`) == 300) {
    msg.member.roles.add(ayarlar.level20)//rol id
    
    let embed24 =  new Discord.MessageEmbed()
    .setDescription(`:tada: ${msg.author} tebrikler 20 seviyeye ulaştın, Bu yüzden <@&782538554361249802> rolüne terfi edildin!`)
    .setFooter(`${msg.author.username}`, msg.author.avatarURL({dynamic: true}))
    .setTimestamp()
    msg.guild.channels.cache.get(ayarlar.levelkanal).send(embed25) 
    
  }else 

  if (db.fetch(`toplam.${msg.author.id}`) == 400) {
    msg.member.roles.add(ayarlar.level25)//rol id
    
    let embed26 =  new Discord.MessageEmbed()
    .setDescription(`:tada: ${msg.author} tebrikler 25 seviyeye ulaştın, Bu yüzden <@&782538554361249802> rolüne terfi edildin!`)
    .setFooter(`${msg.author.username}`, msg.author.avatarURL({dynamic: true}))
    .setTimestamp()
    msg.guild.channels.cache.get(ayarlar.levelkanal).send(embed26) 
    
  }else 

  if (db.fetch(`toplam.${msg.author.id}`) == 500) {
    msg.member.roles.add(ayarlar.level30)//rol id

    let embed27 =  new Discord.MessageEmbed()
    .setDescription(`:tada: ${msg.author} tebrikler 30 seviye yani son seviyeye ulaştın! Tebrikler :tada:`)
    .setFooter(`${msg.author.username}`, msg.author.avatarURL({dynamic: true}))
    .setTimestamp()
    msg.guild.channels.cache.get(ayarlar.levelkanal).send(embed27) 

}}})

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});





client.on("userUpdate", async(eski, yeni) => {
  if(eski.avatarURL() === yeni.avatarURL()) return;
  let avatar = (yeni.avatarURL({dynamic:true,size:1024})).split("?")[0];
  if((avatar).endsWith(".gif")) {
    client.channels.cache.get(client.gif.rastgele.PP).send(new Discord.MessageEmbed().setColor('BLUE').setFooter(`Gif Turkey`).setImage(avatar));
  } else {
    client.channels.cache.get(client.gif.rastgele.GIF).send(new Discord.MessageEmbed().setColor('BLUE').setFooter(`Gif Turkey`).setImage(avatar));
  };
});


//// KANALA FOTO HARİÇ MESAJ YOLLAMAMA
 
//client.on("message", m => {
  //if (m.channel.id !== "773665743580430416","773665772215992351","773666012717514792","773666043750121512","773665165861191721","773665182588207146","773664765439639575","773664783093202954","773659454041620512","773659627106598922","773663832559714307","773663862108585984","773664485776031744","773664504340807702","773664107932942356","773664127867944970","773665494712188939","773665511476297789","","","","","","","","","","") { //buraya o kanalın ID'si yazılacak.
   // return;
  //}
 // if (m.author.id === m.guild.ownerID) return;
  //if (m.attachments.size < 1) {
   // m.delete();
  //}
// });
  


//// SA - AS

client.on('message', message =>{
const sa = message.content.toLowerCase()

if(sa === 'sa' || sa === 'sea' || sa === 'selam aleyküm' || sa === 'Selam Aleyküm') {
message.reply(`**Aleyküm Selam, Hoş Geldin** <@${message.author.id}>`);
}
})

client.on('guildMemberAdd', member => {
  if(!member.guild.id === '798871882761109504') return;
  if(member.bot) return;
  member.guild.members.cache.get(member.id).roles.add(ayarlar.uyerol)
  // client.channels.cache.get('log kanal id').send(`${member.tag}, isimli kişi giriş yaptı. Ona ${member.guild.roles.cache.get('rol id').name} isimli rolü verdim.`) // İsterseniz log kanalı seçebilirsiniz (hoşgeldin mesajı attırır gibide kullanabilirsiniz.)
  })

console.log('Bot AKTİF!')
client.login(ayarlar.token).catch(err=> console.error('TOKEN HATASI!!'));

client.on('ready', ()=>{
  let sesKanal = client.channels.cache.get(ayarlar.voiceC);
  if (!sesKanal) return console.log(`Ses Kanalı Bulunamadı.`);
  sesKanal.join().then(console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Ses Kanalına Bağlanıldı.`)).catch(err => console.error(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Ses Kanalına Bağlanılamadı.`));

});