const { MessageEmbed } = require("discord.js");

module.exports=  {
    name : 'eval', 
    description: "Unknown",
    usage: "",
    /**
     * 
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run : async(client, message, args) => {
        if (!message.author.id !== "") return;

        const code = args.join(" ");
        if(!code) return client.sendTime(message.channel, "Please provide some code to evaluate");

        try {
            const result = await eval(code);
            let output = result;
            if(!typeof result !== "string") {
                output = inspect(result);
            }

            client.sendTime(message.channel, output, { code: "js" })
        } catch (error) {
            client.sendTime(message.channel, "Evaluated content is too long to display");
        }
    },    
};