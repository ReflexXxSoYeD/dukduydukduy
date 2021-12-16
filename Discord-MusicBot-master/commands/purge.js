const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "purge",
    description: "Cleared messages",
    usage: "<number>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: [""],
    /**
     * 
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args) => {
        if(!args[0]) return client.sendTime(message.channel, 
            'Please specify a number of messages to delete ranging from 1 - 99'
            )
        if(isNaN(args[0])) return client.sendTime(message.channel, 
            'Numbers are only allowed'
            )
        if(parseInt(args[0]) > 99) return client.sendTime(message.channel, 
            'The max amount of messages that I can delete is 99'
            )
            await message.channel.bulkDelete(parseInt(args[0]) + 1)
                .catch(err => console.log(err))
            client.sendTime(message.channel, 
                'Deleted ' + args[0]  + " messages."
                )

        setTimeout(async () => {
            message.channel.bulkDelete(1, true)
        }, 5000)
    },        
};