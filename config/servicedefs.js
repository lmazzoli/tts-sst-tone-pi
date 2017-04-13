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
var watson = require('watson-developer-cloud');
var extend = require('util')._extend;
var creds=require('./creds.json');
var vcapServices = require('vcap_services');

 
// Create the service wrapper for Personality Insights API
var personality_insights = watson.personality_insights({
  version: 'v2',
  username: creds.PI_username,
  password: creds.PI_password,
});

//create the service wrapper for Watson Speech to Text API
var speech_to_text = extend({
  version: 'v1',
  url: creds.STT_URL,
  username: process.env.STT_USERNAME || creds.STT_username,
  password: process.env.STT_PASSWORD || creds.STT_password,
}, vcapServices.getCredentials('speech_to_text'));
  
  
//Export the Watson Sppech to TExt & Personality API definitions to be referenced and used in other files.
  
exports.STT=speech_to_text;
exports.PI=personality_insights;