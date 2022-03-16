//define discord.js package
const Discord = require("discord.js"); //import discord libraries
const client = new Discord.Client();

const config = require("./config.json"); //Here bot token, welcome channel id, role id

//define welcome package
const welcome = require("./welcome"); //welcome costomize message
welcome(client);



//ready to bot log in 
client.on("ready", ()=>console.log("READY"));

//start bot
client.login(config.BOT_TOKEN);



//Coded by Xenon Colt | Shahriar Haque