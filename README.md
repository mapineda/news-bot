# 🌟 NewsBot

![newsBot](https://heroku-www-files.s3.amazonaws.com/starbot/starbot-banner.png)


### Supported `/slash` commands

Create a `/newsbot` [custom slash command](https://api.slack.com/slash-commands), using the URL: `{app-name}.herokuapp.com/commands/newsbot`. *Take note of the provided `token`, this is used to verify requests come from Slack.*

- `/newsbot` or `/newsbot help` - List available commands
- `/newsbot repos` - Display trending GitHub projects

### Install

```shell
$ npm install
```

### Copy `.env-example` to `.env`

```shell
$ cp .env-example .env
```

### Configure

```shell
SLACK_TEAM_TOKEN=xoxb...8WRqKWx
NODE_ENV=development
PORT=3000
```
### Run

```shell
$ npm start

🚀 Newsbot LIVES on PORT 3000 🚀
```

### License

**[This project is licensed under the terms of the MIT license.](http://license-me.herokuapp.com)**
 -- [_Need your own? There's a button for that :wink:_](https://github.com/mattcreager/license)
