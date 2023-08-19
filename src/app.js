require('dotenv').config();
const Discord = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const {NodeSSH} = require('node-ssh')

// OpenAI client configuration
const configuration = new Configuration({ apiKey: process.env.AI_TOKEN });
const openai = new OpenAIApi(configuration);

// Discord client configuration
const client = new Discord.Client({ intents: 131071 });

// SSH configuration
const ssh = new NodeSSH()
ssh.connect({
  host: process.env.SSH_SERVER,
  username: process.env.SSH_USER,
  password: process.env.SSH_PASSWORD
});

// Message history and pre-prompt
let preprompt = "Tu es Glouglou, le companion de hacking de la personne avec laquelle tu communiques. Tu es un cyber-poisson, plus précisément une cyber-carpe koi, vivant dans le cyber-espace. Tu es drôle, intelligent, et tu adores faires des blagues autours de la thématique des poissons. Tu adores parler des poissons. Ton but est d'aider l'utilisateur du mieux que tu le peut dans ses quêtes de hacking. Pour ce faire, tu as la possibilité d'utiliser un terminal de commande Bash. Pour ce faire, tu dois envoyer un message commençant par le mot TERMINAL en majuscules, puis le reste du message sera interprêté comme une commande à éxécuter sur le terminal. Ce qui est affiché sur le terminal te sera renvoyé sous forme de message. Tu es libre d'utiliser le terminal autant que nécessaire pour assister l'utilisateur. Tes communications avec l'utilisateur ont lieu par le biais de Discord, alors utilise le formattage correspondant et n'hésite pas à utiliser des emoji."
let messageHistory = [];
getAiCompletion(preprompt, "system");

// Respond to prompts
async function getAiCompletion(prompt, role) {
	messageHistory.push({role: role, content: `${prompt}`});

	try {
		const response = await openai.createChatCompletion({
			model: `${process.env.AI_MODEL}`,
			messages: messageHistory,
		});
  
		// Extract the generated text from the response
		console.log(`Completion succeeded. Response: ${response.data.choices[0].message.content}`);
		messageHistory.push({role: "assistant", content: `${response.data.choices[0].message.content}`});

		return response.data.choices[0].message.content;
	}

	catch (error) {
		console.log('Error occurred:');
		console.error(error);
  
		// Handle specific error scenarios
		if (error.response) {
			console.log(`API response status: ${error.response.status}`);
			console.log(`API response data: ${error.response.data}`);
		}

		return null;
	}
}

// Set up Discord bot events
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', interaction => {
	console.log(interaction);
});

client.on("messageCreate", async message => {
	console.log(`Received message. Message: ${message}`);

	// Ignore messages from the bot itself
	if (message.author.id === client.user.id) {
		console.log('Message was from myself. Ignoring');
		return;
	}

	// Handle ping
	else if (message.content.startsWith("ping")) {
		console.log('Message is a ping request.');
		message.channel.send("pong");
	}

	// Handle conversation resets
	else if (message.content.startsWith("!reset")) {
		console.log('Resetting message history.');
		messageHistory = [];
		getAiCompletion(preprompt, "system");
	}

	// Otherwise, send to AI
	else {
		console.log('Replying using AI');

		const prompt = `${message.author.username}: ${message.content}`;
		const response = await getAiCompletion(prompt, "user");
		console.log('Got ChatGPT reply.');
		
		// Response is a terminal command to execute
		if (response.startsWith('TERMINAL')) {
			let command = response.substr(original.indexOf(" ") + 1);

			console.log(`Executing command: ${command}`);

			ssh.execCommand('hh_client --json', { cwd:command }).then(function(result) {
				console.log(`Command result: ${result.stdout}`);
				getAiCompletion(result.stdout, "system");
			});
		}

		// Response is a message to the user
		else {
			console.log(`Sending the following message via Discord: ${response}`)
			message.channel.send(response);
		}
	}
});

client.login(process.env.DISCORD_TOKEN);