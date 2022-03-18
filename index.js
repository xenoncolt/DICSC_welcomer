//define discord.js package
const Discord = require("discord.js"); //import discord libraries
const client = new Discord.Client();
const moment = require("moment");

const config = require("./config.json"); //Here bot token, welcome channel id, role id

//define welcome package
const welcome = require("./welcome"); //welcome costomize message
welcome(client);




//ready to bot log in 
client.on("ready", () => {
    console.log("READY");

    client.user.setStatus("dnd")

    let stateswitch = false;
    setInterval(()=>{


        stateswitch = !stateswitch;

        if (stateswitch) 
        
        client.user.setActivity(`${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} Visitor`, { type: "WATCHING" });

        else 
        
        client.user.setActivity(`since ${moment(client.user.createdTimestamp).format("HH:mm:ss")} ${moment(client.user.createdTimestamp).format("DD/MM/YYYY")}`, { type: "PLAYING" });

    }, (10*1000));
    //client.user.setActivity(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} members`)
});


//start bot
client.login(config.BOT_TOKEN);


// coded by Xenon Colt | Shahriar Haque