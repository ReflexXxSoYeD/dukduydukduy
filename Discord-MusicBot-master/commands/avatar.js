const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "View a member profile",
    usage: "<@mention>",
    aliases: ["ar"],
    /**
     * 
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        message.channel.send(
            new MessageEmbed()
            .setColor(client.botconfig.EmbedColor)
            .setTitle(`${member.user.tag}'s avatar`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        );
    },
};