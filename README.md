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

Issues
------------
**CORS** - Kept getting a CORS policy error when trying to get data from the API. Both on the development machine and production in Heroku. Tried searching for a fix on front-end but most recommend fixing it through the API server. 

Workaround - Used this plugin in chrome [allow-controle-allow-origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en). Works on local machine and heroku.

**Deployment** - Not sure if it's on my build only, but when creating the build for deployment, the main file vendor.chunk in v1.0 folder (production) gets a prefix of '0'. But the index.html file in templates is requesting for 1_vendor.chunk so I was getting a 404. Adjusted the index.html in templates to '0' for it to work.

