/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express    = require('express'),
  app          = express(),
  watson       = require('watson-developer-cloud'),
  extend       = require('util')._extend,
  i18n         = require('i18next'),
  router       = express.Router(), // eslint-disable-line new-cap
  vcapServices = require('vcap_services');
  

//i18n settings
require('./config/i18n')(app);

// Bootstrap application settings
require('./config/express')(app);

// Watson Personality Insights service settings
var pivar=require('./config/servicedefs.js');



app.get('/', function(req, res) {
  res.render('index', { ct: req._csrfToken });
});

app.post('/api/profile', function(req, res, next) {
  var parameters = extend(req.body, { acceptLanguage : i18n.lng() });

// Setting the profile for Watson Personality Insights.
 	pivar.PI.profile(parameters, function(err, profile) {
    if (err)
      return next(err);
    else
      return res.json(profile);
  });
});

// Call Watson Speech to Text service
app.use('/api/speech-to-text/', require('./stt-token.js'));

// error-handler settings
require('./config/error-handler')(app);

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);


