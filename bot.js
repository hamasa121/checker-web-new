require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

app.use(express.json());
let visitCount = 0;

client.once('ready', () => {
    console.log(`Bot online as ${client.user.tag}`);
});

app.post('/visit', async (req, res) => {
    visitCount++;
    const channel = client.channels.cache.get('1355919528877363270');    
    if (channel) {
        await channel.send(`🔥 Visitor #${visitCount} hit Token Checker! Chaos level: MAX! 🔥`);
        console.log(`Visit #${visitCount} logged`);
        res.json({ message: `Visit #${visitCount} logged` });
    } else {
        console.log('Channel not found');
        res.status(500).json({ error: 'Channel not found' });
    }
});

app.listen(3000, () => console.log('Server live on http://localhost:3000'));
