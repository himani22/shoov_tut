'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },     
  'iPhone7': {
    'device': 'iPhone 7',
    'realMobile': 'true',
    'os_version': "10.0"
  },
  'iPhone7Plus': {
    'device': 'iPhone 7 Plus',
    'realMobile': 'true',
    'os_version': '10.0'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  },
    'Samsung': {
    'device' : 'Samsung Galaxy S8 Plus',
    'realMobile' : 'true',
    'os_version' : '7.0',
  },
    'Samsung1': {
    'device' : 'Samsung Galaxy S8 Plus',
    'realMobile' : 'true',
    'os_version' : '7.0',
  },
  'iphone5': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Apple iPhone 5'
      }
    }
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'https://www.google.co.in';

var pageName = baseUrl.split("/"); 
var FinPageName = pageName[3] + "_"+pageName[4]+"_" + pageName[5];
//console.log("**********Gaurav ++++++" + FinPageName + "^^^^^^^^" + testName +"_____"+ caps.os + caps.os_version + caps.browser + caps.browser_version + caps.resolution+FinPageName);
var ssFileName = testName+"_"+caps.os+"_"+caps.os_version+"_"+caps.browser+"_"+caps.browser_version+"_"+caps.resolution+"___"+FinPageName;
console.log("*******" + ssFileName);
var resultsCallback = process.env.DEBUG ? console.log : shoovWebdrivercss.processResults;

describe('Visual monitor testing', function() {

  this.timeout(999999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the Category page',function(done) {
    client
      .url(baseUrl)
      //.webdrivercss(testName + '.Category', {
        .webdrivercss(ssFileName, {
        name: '1',
        exclude: [],
        remove: [],
        hide: [],
        screenWidth: selectedCaps == 'iphone7' ? [1024,768] : undefined,
      }, browser.setViewportSize({
        width: 1024,
        height: 768
    }), resultsCallback)
      .call(done);
  });
});
