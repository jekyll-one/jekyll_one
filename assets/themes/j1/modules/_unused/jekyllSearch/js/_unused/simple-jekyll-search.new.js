/*!
  * Simple-Jekyll-Search v1.7.12
  * Copyright 2015-2020, Christian Fei
  * Licensed under the MIT License.
  */

;(function(){

var $Templater = {
  compile: compile,

  setOptions: setOptions
};

var options = {};
options.pattern = /\{(.*?)\}/g;
options.template = '';
options.middleware = function () {};

// jadams, 2020-07-11: added resultsOutput option
function setOptions (_options) {
  options.pattern = _options.pattern || options.pattern;
  options.template = _options.template || options.template;
  options.results_output = _options.results_output;
  if (typeof _options.middleware === 'function') {
    options.middleware = _options.middleware;
  }
}

/* jadams, 2017-07-09: Added resultsOutput for J1 Searcher
  ------------------------------------------------------------- */
function compile(data) {
  var tags;

  return options.template.replace(options.pattern, function(match, prop) {
    var value = options.middleware(prop, data[prop], options.template);
    var resultsOutput = document.getElementById(options.results_output);
    resultsOutput.style.display = 'none'; // to hide
    if (value !== undefined) {
      return value;
    }
    // jadams: show the results container
    resultsOutput.style.display = 'block';
    // jadams: beautify tags string for results output
    if ( prop == 'tags' ) {
      tags = data[prop].replace(/\s+/g, '');
      data[prop] = tags.replace(/,/g, ' · ');
    }
    if ( prop == 'date' ) {
      if (data[prop].length) {
        data[prop] = data[prop].substring(0,10);
      } else {
        data[prop] = '2020-01-01';
      }
    }

    return data[prop] || match;
  });
}

function fuzzysearch (needle, haystack) {
  var tlen = haystack.length;
  var qlen = needle.length;
  if (qlen > tlen) {
    return false;
  }
  if (qlen === tlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < qlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < tlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

var $fuzzysearch = fuzzysearch;

/* removed: var $fuzzysearch = require('fuzzysearch'); */;

var $FuzzySearchStrategy = new FuzzySearchStrategy();

function FuzzySearchStrategy () {
  this.matches = function (string, crit) {
    return $fuzzysearch(crit, string);
  };
}

var $LiteralSearchStrategy = new LiteralSearchStrategy();

function LiteralSearchStrategy () {
  this.matches = function (string, crit) {
    if (typeof string !== 'string') {
      return false;
    }
    string = string.trim();
    return string.toLowerCase().indexOf(crit.toLowerCase()) >= 0;
  };
}

var $Repository = {
  put: put,
  clear: clear,
  get: get,
  search: search,
  setOptions: setOptions
};

/* removed: var $FuzzySearchStrategy = require('./SearchStrategies/FuzzySearchStrategy'); */;
/* removed: var $LiteralSearchStrategy = require('./SearchStrategies/LiteralSearchStrategy'); */;

var data = [];
var opt = {};
opt.fuzzy = false;
opt.limit = 10;

/* jadams, 2017-07-09: added additional options J1 Template
  ------------------------------------------------------------- */
opt.searchStrategy = opt.fuzzy ? $FuzzySearchStrategy : $LiteralSearchStrategy;
// jadams, 2017-07-09: Added minSearchItemLen as an option
opt.minSearchItemLen = 4;
// jadams, 2017-07-09: Added resultsOutput as an option
opt.resultsOutput = document.getElementById('jss-panel');

function put (data) {
  if (isObject(data)) {
    return addObject(data);
  }
  if (isArray(data)) {
    return addArray(data);
  }
  return undefined;
}
function clear () {
  data.length = 0;
  return data;
}

function get () {
  return data;
}

function isObject (obj) { return !!obj && Object.prototype.toString.call(obj) === '[object Object]'; }
function isArray (obj) { return !!obj && Object.prototype.toString.call(obj) === '[object Array]'; }

function addObject (_data) {
  data.push(_data);
  return data;
}

function addArray (_data) {
  var added = [];
  for (var i = 0; i < _data.length; i++) {
    if (isObject(_data[i])) {
      added.push(addObject(_data[i]));
    }
  }
  return added;
}

/* jadams, 2017-07-09: search function modified
  ------------------------------------------------------------- */
function search(crit) {
  var n = crit.length;

  // jadams: Added|Evaluate minSearchItemLen
  if (n < opt.minSearchItemLen) {
    return [];
  }
  if (!crit) {
    return [];
    //return
  }
  return findMatches(data, crit, opt.searchStrategy, opt);
}

/* jadams, 2017-07-09: added additional options J1 Template
  ------------------------------------------------------------- */
function setOptions(_opt) {
  opt = _opt || {};

  opt.fuzzy = _opt.fuzzy || false;
  opt.limit = _opt.limit || 10;
  // jadams: Added minSearchItemLen as an option
  opt.minSearchItemLen = _opt.minSearchItemLen || 3;
  opt.searchStrategy = _opt.fuzzy ? $FuzzySearchStrategy : $LiteralSearchStrategy;
  // jadams: Added show|hide for resultsOutput as an option
  opt.resultsOutput = _opt.resultsOutput || 'jss-panel';
}

/*
function setOptions (_opt) {
  opt = _opt || {}

  opt.fuzzy = _opt.fuzzy || false
  opt.limit = _opt.limit || 10
  opt.searchStrategy = _opt.fuzzy ? FuzzySearchStrategy : LiteralSearchStrategy
}
*/

function findMatches (data, crit, strategy, opt) {
  var matches = [];
  for (var i = 0; i < data.length && matches.length < opt.limit; i++) {
    var match = findMatchesInObject(data[i], crit, strategy, opt);
    if (match) {
      matches.push(match);
    }
  }
  return matches;
}

function findMatchesInObject (obj, crit, strategy, opt) {
  for (var key in obj) {
    if (!isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit)) {
      return obj;
    }
  }
}

function isExcluded (term, excludedTerms) {
  var excluded = false;
  excludedTerms = excludedTerms || [];
  for (var i = 0; i < excludedTerms.length; i++) {
    var excludedTerm = excludedTerms[i];
    if (!excluded && new RegExp(term).test(excludedTerm)) {
      excluded = true;
    }
  }
  return excluded;
}

var $JSONLoader = {
  load: load
};

function load (location, callback) {
  var xhr = getXHR();
  xhr.open('GET', location, true);
  xhr.onreadystatechange = createStateChangeListener(xhr, callback);
  xhr.send();
}

function createStateChangeListener (xhr, callback) {
  return function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        callback(null, JSON.parse(xhr.responseText));
      } catch (err) {
        callback(err, null);
      }
    }
  };
}

function getXHR () {
  return (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
}

var _$OptionsValidator_3 = function OptionsValidator (params) {
  if (!validateParams(params)) {
    throw new Error('-- OptionsValidator: required options missing');
  }
  if (!(this instanceof OptionsValidator)) {
    return new OptionsValidator(params);
  }

  var requiredOptions = params.required;

  this.getRequiredOptions = function () {
    return requiredOptions;
  };

  this.validate = function (parameters) {
    var errors = [];
    requiredOptions.forEach(function (requiredOptionName) {
      if (parameters[requiredOptionName] === undefined) {
        errors.push(requiredOptionName);
      }
    });
    return errors;
  };

  function validateParams (params) {
    if (!params) {
      return false;
    }
    return params.required !== undefined && params.required instanceof Array;
  }
};

var $utils = {
  merge: merge,
  isJSON: isJSON
};

function merge (defaultParams, mergeParams) {
  var mergedOptions = {};
  for (var option in defaultParams) {
    mergedOptions[option] = defaultParams[option];
    if (mergeParams[option] !== undefined) {
      mergedOptions[option] = mergeParams[option];
    }
  }
  return mergedOptions;
}

function isJSON (json) {
  try {
    if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

var _$src_8 = {};

;(function (window, document) {
  // Global variables
  var message = {};

  var options = {
    searchInput:          null,
    resultsContainer:     null,
    results_output:       null,
    json:                 [],
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    templateMiddleware:   function () {},
    noResultsText:        'No results found',
    limit:                10,
    fuzzy:                false,
    exclude:              []
  };

  var requiredOptions   = ['searchInput', 'resultsContainer', 'results_output', 'json'];
  /* removed: var $Templater         = require('./Templater'); */;
  /* removed: var $Repository        = require('./Repository'); */;
  /* removed: var $JSONLoader        = require('./JSONLoader'); */;
  var optionsValidator  = _$OptionsValidator_3({ required: requiredOptions });
  /* removed: var $utils             = require('./utils'); */;
  var logger;
  var logText;

  /*
    Public API
  */
  window.SimpleJekyllSearch = function SimpleJekyllSearch (_options) {
    logger = log4javascript.getLogger('j1.core.j1_searcher');
    logger.info('start initialization');

    var errors = optionsValidator.validate(_options);
    if (errors.length > 0) {
      logger.error('missing required options: ' + requiredOptions);
      // throwError('You must specify the following required options: ' + requiredOptions);
    }

    options = $utils.merge(options, _options);

    $Templater.setOptions({
      template: options.searchResultTemplate,
      results_output: options.results_output,
      middleware: options.templateMiddleware
    });

    $Repository.setOptions({
      fuzzy: options.fuzzy,
      limit: options.limit
    });

    if ($utils.isJSON(options.json)) {
      initWithJSON(options.json);
    } else {
      initWithURL(options.json);
    }

    return true;
  };

  // for backwards compatibility
  window.SimpleJekyllSearch.init = window.SimpleJekyllSearch;

  if (typeof window.SimpleJekyllSearchInit === 'function') {
    window.SimpleJekyllSearchInit.call(this, window.SimpleJekyllSearch);
  }

  function initWithJSON (json) {
    $Repository.put(json);
    registerInput();
  }

  function initWithURL (url) {
    $JSONLoader.load(url, function (err, json) {
      if (err) {
        logger.error('failed to get data at: ' + url);
        // throwError('failed to get JSON (' + url + ')');
      }
      initWithJSON(json);
    });
  }

  function emptyResultsContainer () {
    options.resultsContainer.innerHTML = '';
  }

  function appendToResultsContainer (text) {
    options.resultsContainer.innerHTML += text;
  }

  function registerInput () {
    options.searchInput.addEventListener('keyup', function (e) {
      var key = e.which;
      if (isWhitelistedKey(key)) {
        emptyResultsContainer();
        var query = e.target.value;
        if (isValidQuery(query)) {
          render($Repository.search(query));
          // highlight the query (word) in description text
          // see: https://stackoverflow.com/questions/17232820/change-the-color-of-a-text-in-div-using-jquery-contains
          // see: https://stackoverflow.com/questions/187537/is-there-a-case-insensitive-jquery-contains-selector
          $('.result-group-item-text:contains(' +query+ ')').each(function () {
            var regex = new RegExp(query,'gi');
            $(this).html($(this).text().replace(regex, '<code style="color: red !important; font-weight: 700;font-size: 125% !important">' +query+ '</code>'));
          });
          // highlight the query (word) in (documents) tagline
          $('h6.result-item:contains(' +query+ ')').each(function () {
            var regex = new RegExp(query,'gi');
            $(this).html($(this).html().replace(regex, '&nbsp;<code style="color: red !important; font-weight: 700;font-size: 135% !important">' +query+ '</code>&nbsp;'));
          });
        }
      }
    });
  }

   /* jadams, 2017-07-09: added resultsOutput for J1 Searcher
      -------------------------------------------------------------------------- */
  function render (results) {
    if (results.length === 0) {
      var resultsOutput = document.getElementById(options.results_output);
      resultsOutput.style.display = 'none'; // to hide
      return appendToResultsContainer(options.noResultsText);
    }
    for (var i = 0; i < results.length; i++) {
      appendToResultsContainer($Templater.compile(results[i]));
    }
  }

  function isValidQuery (query) {
    return query && query.length > 0;
  }

  function isWhitelistedKey (key) {
    return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(key) === -1;
  }

  function throwError (message) {
    throw new Error('SimpleJekyllSearch --- ' + message);
  }

})(window, document);

}());
