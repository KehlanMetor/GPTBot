import { Client, GatewayIntentBits, Routes } from 'discord.js';
import config from './config.json' assert {type: 'json'};
import axios from 'axios';

const client =  new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

client.on('ready', () => {
    console.log('🍃 GPTBot is ready !');
})

async function gpt(q) {
    const options = {
        method: 'POST',
        url: 'https://chatgpt146.p.rapidapi.com/q',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': config.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'chatgpt146.p.rapidapi.com'
        },
        data: {
          prompt: q
        }
      };
      
      try {
          const response = await axios.request(options);
          const response1 = response.data;
          global.response2 = response1["content"]
      } catch (error) {
          console.error(error);
      }
      
};

client.on('messageCreate', (message) => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "gpt") {
        let text = args.join(" "); // Remember arrays are 0-based!.
        (async () => {
            await gpt(text); // Appel de la fonction asynchrone
            message.reply(global.response2) // Accès à la variable globale à l'extérieur de la fonction
            // Output: Hello, I am a global variable within an async function!
          })();
      }
});

client.login(config.TOKEN)