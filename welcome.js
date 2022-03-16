const config = require("./config.json"); //her welcome channel id and roles id


//define fornt build package
const Canvas = require("canvas"); 

//define the discord.js package
const Discord = require("discord.js");

//fornt building package
const { registerFont, createCanvas } = require('canvas')
registerFont("./source/font/batmfa__.ttf", { family: 'batmfa'})


//welcome design start
module.exports = function (client) {

    const description = {
        name: "WelcomeImages",
        filename: "welcome.js",
        version: "1.0.0"
    }


    //Bot login message
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}") | Bot is running perfectly`)

    //send message with image every time when some one joins the server
    client.on("guildMemberAdd", async member => {
        //If not in a guild return
        if(!member.guild) return;
        //creat a new canvas
        const canvas = Canvas.createCanvas(1772, 633);
        //make it "2d"
        const ctx = canvas.getContext('2d');
        //set the bacground image
        const background = await Canvas.loadImage(`./source/image/welcomeFace.png`);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#8525FA';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set username in middle
      var textString3 = `${member.user.username}`;
      //if the text is too big then smaller the text size
      if (textString3.length >= 14) {
        ctx.font = 'bold 60px "batmfa"';
        ctx.fillStyle = '#cc5f00';
        ctx.fillText(textString3, 700, canvas.height / 2 + 20);
      }
      //else dont do that
      else {
        ctx.font = 'bold 100px "batmfa"';
        ctx.fillStyle = '#cc5f00';
        ctx.fillText(textString3, 700, canvas.height / 2 + 20);
      }
      //define the Discriminator Tag
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 40px "batmfa"';
      ctx.fillStyle = '#b500d1';
      ctx.fillText(textString2, 710, canvas.height / 2 + 58);
      //set member count in last
      var textString4 = `Member #${member.guild.memberCount}`;
      ctx.font = 'bold 60px "batmfa"';
      ctx.fillStyle = '#00ced1';
      ctx.fillText(textString4, 700, canvas.height / 2 + 180);
      //set the guild name in first
      var textString4 = `Welcome to ${member.guild.name}`;
      ctx.font = 'bold 60px "batmfa"';
      ctx.fillStyle = '#b12fed';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      // create a circular mask
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //draw the user avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      //get it in a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
        .setDescription(`**Welcome to ${member.guild.name}!**
      Hello <@${member.id}>!, Welcome to the field!`)
        .setImage("attachment://welcome-image.png")
        .attachFiles(attachment);
      //define the welcome channel
      const channel = member.guild.channels.cache.find(ch => ch.id === config.WELCOME_CHANNEL);
      //send the welcome embed to there
      channel.send(welcomeembed);
      //member roles add on welcome every single role
      let roles = config.ROLES;
      for(let i = 0; i < roles.length; i++ )
      member.roles.add(roles[i]);
    })
}



//Coded by Xenon Colt | Shahriar Haque