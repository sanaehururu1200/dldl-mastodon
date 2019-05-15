const Mastodon = require('mastodon-api');
const fs = require('fs');
const tag = 'mastodon';

module.exports.start = (config, write) => {
    const mstdn = new Mastodon({
        access_token: config.token,
        api_url: config.url
    })
    const stream = mstdn.stream('streaming/public');
    stream.on('message', (msg) => {
        if(msg.event === 'update') {
            const out = msg.data.content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'') + '\n';
            write(out, tag);
        }
    })
}

module.exports.loop = (config) => {

}