ShopMessage Assignment for React Developer
==========================================

NPM Packages used
------------
- Amcharts4
- MomentJS
- Axios

Demo
---------
[http://shopmsg-candidate-test.herokuapp.com](http://shopmsg-candidate-test.herokuapp.com)

Screencast
------------


Issues
------------
**CORS** - Kept getting a CORS policy error when trying to get data from the API. Both on the development machine and production in Heroku. Tried searching for a fix on front-end but most recommend fixing it through the API server. 

Workaround - Used this plugin in chrome [allow-controle-allow-origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en). Works on local machine and heroku.

**Webpack build** - I was getting errors working on a build from a windows machine. Webpack build is outputting chunks with '0_' prefix, but the script request in index.html has '1_' as the prefix. Changed it to '0_' for it to work. But the base clone of the repository works fine during build on an osx laptop. Weird. 