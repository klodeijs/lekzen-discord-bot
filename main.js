var lex = require(__dirname + "/lexer.js");

let lexThis = "ry(re) mek[ ve(I < II)[ nine[/hello/]\\ ] ]";

let lexedIt = lex.find_tokens(lexThis);

console.log(lexedIt);


//do this later, for now we're testing if the lexer works
/*
var discord = require("discord.js");
const client = new discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login('');
 */