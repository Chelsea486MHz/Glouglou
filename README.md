![Glouglou logo](logo.png)

# Your personal hacking companion, on Discord!

🐟 > Glouglou is your personal hacking companion, helping you with coding, hacking, or working with computers in general. All from the comfort of Discord!

🐠 > Glouglou has access to his own little machine somewhere in the cloud, where he can run commands and better help you with whatever you're doing.

🐡 > Using GPT-3.5 and SSH key-based authentication, Glouglou's abilities are yours to define.

# Installing Glouglou

✨🐟 Glouglou is docker-based. If you have a server somewhere, he'll be glad to make it into his home! Your personal computer will do just fine as well. Just figure out which internet-connected machine you want him to run on, and execute the following command to bring Glouglou to life!

```
$ git clone https://github.com/Chelsea486MHz/Glouglou
$ cd Glouglou
$ docker compose up -d
```

✨🐟 Make sure to properly configure `docker-compose.yml` first! Here is an example configuration:

```
version: '3'

services:
  macron:
    build: .
    environment:
      DISCORD_TOKEN: your-discord-token
      OPENAI_TOKEN: your-openai-token
      OPENAI_MODEL: gpt-3.5-turbo
      SSH_SECRET: your-ssh-private-key
      SSH_TARGET: your-server.tld
```

✨🐟 The `DISCORD_TOKEN` variable is the authentication token you created for your Discord app. Since Glouglou is running as a Discord bot, he needs the token! Add Glouglou to your server from the Discord developer interface, and don't forget to set the correct intents.

✨🐟 Both the `SSH_TARGET` and `SSH_SECRET` variables are related to the server you're about to hand to Glouglou. Create an SSH keypair, give it to glouglou, and give the address of his own machine he'll be controlling over SSH. Be careful! Glouglou is not bound by our human reasoning and **will** break things. Don't do something irresponsible here. Glouglou's server can be anything from a simple container somewhere in the cloud to a dedicated server in his subnet. Choose wisely!

# Reset Glouglou

✨🐟 **Glouglou is magic!** But sometimes he can get confused in the depths of his mind. To reset Glouglou, use the `!reset` command to reset the chat history. Give the bot some time to run the pre-prompt again.

# Technical details

Built using [Node.JS](https://nodejs.org/en).

Made possible with [Discord.js](https://discord.js.org/).

The Docker image is based on [Alpine Linux](https://www.alpinelinux.org/).

# 🐡🐠🐟🐳🐋🦪🪼🐙🦑🦀🦞🐧🦭🐬🪸🦈