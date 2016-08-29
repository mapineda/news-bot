var request = require('request');


var CONFIG = {
    "webhook_url": "https://hooks.slack.com/services/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", // The URL for your Slack webhook (see below)
    "channel": "#bots", // The channel to which the bot will post.
    "bot_username": "NewsBot", // The username of the bot.
    "bot_icon_emoji": ":newspaper:", // The emoji icon of the bot that appears in the chat.
    "post_color": "#FF6600", // The accent color of the posts (HN Orange by default :) )
    "fallback": "Newsbot: Your automated news aggregator." // The default fallback, should the client be unable to display the messsage.
};


selectAndPost();

function selectAndPost() {
    // Choose a random URL pool from HN, with greater probability of selecting top stories.
    var api_url = ["https://hacker-news.firebaseio.com/v0/topstories.json", "https://hacker-news.firebaseio.com/v0/newstories.json","https://hacker-news.firebaseio.com/v0/beststories", "https://hacker-news.firebaseio.com/v0/showstories.json", "https://hacker-news.firebaseio.com/v0/topstories.json"];
    var api_url = api_url[Math.floor(Math.random() * api_url.length)];

    request({
        url: api_url
    }, function cb(err, httpResponse, body) {

        if (err) {
            console.error("Newsbot failed to fetch " + api_url + "!");
	    // Retry if set in config.
	    if(CONFIG.retry) {
		    selectAndPost();
	    }
        } else {
            body = JSON.parse(body);
            var linkID = body[Math.floor(Math.random() * body.length)];
            var url = "https://hacker-news.firebaseio.com/v0/item/" + linkID + ".json";

            request(url, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    console.error("News Scraper failed to fetch " + url + "!");
                } else {
                    body = JSON.parse(body);
                    postLink(body.title, body.url, body.score, body.by);
                }
            });
        }
    });
}

function postLink(title, link, score, author) {

    // Construct the call to the Slack webhoook using the scraped link and configuration options.
    var data = {
        "channel": CONFIG.channel,
        "username": CONFIG.bot_username,
        "icon_emoji": CONFIG.bot_icon_emoji,
        "attachments": [{
            "title": title,
            "title_link": link,
            "fallback": CONFIG.fallback,
            "color": CONFIG.post_color,
            "fields": [{
                "title": "Author",
                "value": author,
                "short": true
            }, {
                "title": "Score",
                "value": score,
                "short": true
            }]
        }]
    };

    var options = {
        url: CONFIG.webhook_url,
        body: JSON.stringify(data),
        json: true,
        method: "post"
    };

    request(options, function cb(err, httpResponse, body) {
        if (err) {
            console.error("Newsbot failed to post to Slack! Message: " + JSON.stringify(body));
        }
    });
}
