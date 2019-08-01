const path = require('path');
const fs = require('fs');
const request = require('request');

request('https://reddit.com/r/popular.json', (err, res, body) => {

    if(err) console.log(err);
  
    const mappedData = JSON.parse(body).data.children.map(item => ({
        title: item.data.title,
        url: item.data.url,
        author: item.data.author
    }))

    fs.writeFileSync('popular-articles.json', JSON.stringify(mappedData));

    console.log('Finished');
});