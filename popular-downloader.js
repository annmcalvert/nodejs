const path = require('path');
const fs = require('fs');
const request = require('request');

request('https://reddit.com/r/popular.json', (err, res, body) => {

    if (err) console.log(err);

    const postWithMedia = JSON.parse(body).data.children
        .filter(item => item.data.media && item.data.media.oembed)
        .map(item => ({
            id: item.data.id,
            thumbnail_url: item.data.media.oembed.thumbnail_url
        }));


    postWithMedia.forEach(item => {
        request.head(item.thumbnail_url, (err, res, body) => {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            const fileExtention = res.headers['content-type'].replace("image/", "");
            request(item.thumbnail_url).pipe(fs.createWriteStream(`./downloads/${item.id}.${fileExtention}`)).on('close', () => console.log('done'));
        });
    });

    console.log('Finished');
});