const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");

module.exports = {
    name: "helpmenu",
    description: "Information about the bot",
    usage: "[command]",
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args) => {
        const directories = [
            ...new Set(client.commands.map((cmd) => cmd.directory)),
        ];

        const formatString = (str) =>
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommand = client.commands
                .filter((cmd) => cmd.directory === dir)
                .map((cmd) => {
                    return {
                        name: cmd.name || "there is no name",
                        description: 
                            cmd.description || 
                            "there is no description for this command",
                    };
                });
            
            return {
                directory: formatString(dir),
                commands: getCommand,
            };
        });

        const embed = new MessageEmbed()
            .setDescription(
                "Please choose a category in the dropdown menu"
            );

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("help-menu")
                    .setPlaceholder("Please select a category")
                    .setDisable(state)
                    .addOption(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} category`
                            };
                        })
                    )
            ),
        ];

        const initialMessage = await message.channel.send({
            embeds: [embed],
            components: components(false),
        });

        const filter = (interacion) =>
            interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU",
            time: 5000,
        })

        collector.on('collect', (interacion) => {
            const [ directory ] = interacion.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            );

            const categoryEmbed = new MessageEmbed()
                .setTitle(
                    `${directory} commands`
                ) 
                .setDescription(
                    "Here are the list of commands"
                ) 
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        };
                    })
                );

            interacion.update({ embeds: [categoryEmbed] })
        });

        collector.on('end', () => {
            initialMessage.edit({ components: components(true) })
        })
    },
};