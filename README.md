![Glouglou logo](logo.png)

# Ton compagnon de hacking personnel

🐟 > Dit bonjour à Glouglou, ton compagnon de hacking personnel. Il t'aide à coder, bricoler du code, et ce depuis le comfort de Discord !

🐠 > Glouglou a accès à son propre serveur dans le cloud. Il peut y éxécuter des commandes et mieux t'aider à faire ton travail !

🐡 > En utilisant l'API OpenAI et une authentification par SSH, les capacités de Glouglou ne sont limitées que par ton imagination !

# Héberger Glouglou

✨🐟 Glouglou fonctionne avec Docker. Si tu as un serveur quelquepart, il sera ravi d'y élire domicile ! Ton ordinateur fonctionnera tout aussi bien, à toi de décider sur quelle machine disposant d'une connection internet tu souhaites le loger. Pour invoquer Glouglou sur ta machine, utilises la commande suivante :

```
$ git clone https://github.com/Chelsea486MHz/Glouglou
$ cd Glouglou
$ docker compose up -d
```

✨🐟 Assures-toi d'avoir correctement configuré le fichier `docker-compose.yml` avant !


```
version: '3'

services:
  app:
    build: .
    restart: unless-stopped
    environment:
      SSH_SERVER: terminal
      SSH_USER: root
      SSH_PASSWORD: root
      DISCORD_TOKEN: your-discord-app-token
      AI_TOKEN: your-openai-api-key
      AI_MODEL: gpt-3.5-turbo
    volumes:
      - ./ssh/key:/app/key

  terminal:
    build:
      context: .
      dockerfile: Dockerfile-terminal
    restart: unless-stopped
    volumes:
      - ./ssh/config:/tmp/ssh/config
```

✨🐟 La variable `DISCORD_TOKEN` fait référence au jeton d'authentification Discord que tu as généré sur le portail développeur de Discord. Glouglou interface avec Discord en tant que "bot", alors crée une application Discord sur ton portail avec une jolie image de profil pour Glouglou, son pseudo, et configure correctement ses intents.

✨🐟 Les variables `SSH` font références à la machine que tu veux confier à Glouglou. Il aura la capacité d'éxécuter ce qu'il veut dessus, alors fait attention et assures-toi de savoir ce que tu fais ! Tu dois générer ta propre paire de clés dans le dossier `ssh` à la racine de ce dépôt.

# Utiliser Glouglou

✨🐟 **Glouglou est magique.** Mais des fois, il se... perd dans sa tête. Si ça arrive, redémarre la conversation avec la commande `!reset` dans le chat Discord.

# Détails techniques

Construit depuis [Node.js](https://nodejs.org/en).

Rendu possible par [Discord.js](https://discord.js.org/).

Image Docker basée sur [Alpine Linux](https://www.alpinelinux.org/).

# 🐡🐠🐟🐳🐋🦪🪼🐙🦑🦀🦞🐧🦭🐬🪸🦈