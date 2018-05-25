/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp-content/plugins/apple-music/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 170);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(21);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(37);
var defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(20);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(171);
module.exports = __webpack_require__(175);


/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);

/* global appleMusic, Backbone, tinymce, wp, _ */

/*
 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 */

var _wp = wp,
    media = _wp.media;


var AttachmentDisplaySettings = media.view.Settings.AttachmentDisplay.extend({
  template: wp.template('apple-music-sidebar'),

  initialize: function initialize() {
    media.view.Settings.AttachmentDisplay.prototype.initialize.apply(this);
  },


  /**
   * @returns {wp.media.view.Settings.AttachmentDisplay} Returns itself to allow chaining
   */
  render: function render() {
    var playerTabs = ['songs', 'albums', 'playlists'];
    _.extend(this.options, {
      description: this.options.model.attributes.description,
      content: this.options.model.attributes.content,
      shouldDisplayPlayer: playerTabs.includes(this.options.tab)
    });

    media.view.Settings.AttachmentDisplay.prototype.render.call(this);

    return this;
  }
});

// VIEW: MEDIA ITEM:

media.view.AppleMusicItem = wp.Backbone.View.extend({
  tagName: 'li',
  className: 'apple-music-item attachment',

  render: function render() {
    this.template = media.template('apple-music-item');
    this.model.set('tab', this.attributes.tab);
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
});

// VIEW - BOTTOM TOOLBAR

media.view.Toolbar.AppleMusic = media.view.Toolbar.extend({
  initialize: function initialize() {
    _.defaults(this.options, {
      event: 'inserter',
      close: false,
      items: {
        // See wp.media.view.Button
        inserter: {
          id: 'apple-music-button',
          style: 'primary',
          text: appleMusic.labels.insert,
          priority: 80,
          click: function click() {
            this.controller.state().appleMusicInsert();
          }
        }
      }
    });

    media.view.Toolbar.prototype.initialize.apply(this);

    this.set('pagination', new media.view.Button({
      tagName: 'button',
      classes: 'apple-music-pagination button button-secondary',
      id: 'apple-music-loadmore',
      text: appleMusic.labels.loadmore,
      priority: -20
    }));
  },
  refresh: function refresh() {
    var selection = this.controller.state().props.get('_all').get('selection');

    jQuery('#apple-music-button').prop('disabled', !selection.length);

    // this.get('inserter').model.set('disabled', true);
    media.view.Toolbar.prototype.refresh.apply(this);
  }
});

// VIEW - MEDIA CONTENT AREA

media.view.AppleMusic = media.View.extend({
  events: {
    'click .apple-music-item-area': 'toggleSelectionHandler',
    'click .apple-music-item .check': 'removeSelectionHandler',
    'submit .apple-music-toolbar form': 'updateInput'
  },

  initialize: function initialize() {
    var _this = this;

    /* fired when you switch router tabs */

    this.collection = new Backbone.Collection();
    this.tab = this.options.tab;

    this.createSidebar();
    this.createToolbar();
    this.clearItems();

    if (this.model.get('items')) {
      this.collection = new Backbone.Collection();
      this.collection.reset(this.model.get('items'));

      jQuery('#apple-music-loadmore').attr('disabled', true).show();
    } else {
      jQuery('#apple-music-loadmore').hide();
    }

    this.collection.on('reset', this.render, this);

    this.model.on('change:params', this.changedParams, this);

    this.on('loading', this.loading, this);
    this.on('loaded', this.loaded, this);
    this.on('change:params', this.changedParams, this);
    this.on('change:page', this.changedPage, this);

    setTimeout(function () {
      jQuery('.apple-music-pagination').click(function (event) {
        _this.paginate(event);
      });
    }, 0);

    if (this.model.get('fetchOnRender')) {
      this.model.set('fetchOnRender', false);
      this.fetchItems();
    }
  },
  render: function render() {
    var _this2 = this;

    /* fired when you switch router tabs */

    var selection = this.getSelection();

    if (this.collection && this.collection.models.length) {
      this.clearItems();

      var container = document.createDocumentFragment();

      this.collection.each(function (model) {
        container.appendChild(_this2.renderItem(model));
      });

      this.$el.find('.apple-music-items').append(container);
    }

    selection.each(function (model) {
      var id = '#apple-music-item-apple-music-' + _this2.tab + '-' + model.get('id');
      _this2.$el.find(id).closest('.apple-music-item').addClass('selected details');
    });

    jQuery('#apple-music-button').prop('disabled', !selection.length);

    return this;
  },
  renderItem: function renderItem(model) {
    var view = new media.view.AppleMusicItem({
      model: model,
      attributes: {
        tab: this.tab
      }
    });

    return view.render().el;
  },
  createToolbar: function createToolbar() {
    var html = '';
    // @TODO this could be a separate view:
    html = '<div class="apple-music-error attachments"></div>';
    this.$el.prepend(html);

    // @TODO this could be a separate view:
    html = '<div class="apple-music-empty attachments"></div>';
    this.$el.prepend(html);

    // @TODO this could be a separate view:
    html = '<ul class="apple-music-items attachments clearfix"></ul>';
    this.$el.append(html);

    // @TODO this could be a separate view:
    var toolbarTemplate = media.template('apple-music-search');
    html = '<div class="apple-music-toolbar media-toolbar clearfix">' + toolbarTemplate(this.model.toJSON()) + '</div>'; // eslint-disable-line max-len
    this.$el.prepend(html);
  },
  createSidebar: function createSidebar() {
    var sidebar = new wp.media.view.Sidebar({
      controller: this.controller
    });

    this.sidebar = sidebar;
    this.views.add(sidebar);
  },
  createSingle: function createSingle(model) {
    var sidebar = this.sidebar;


    sidebar.set('display', new AttachmentDisplaySettings({
      controller: this.controller,
      model: model,
      priority: 160,
      tab: this.tab
    }));
    sidebar.$el.addClass('visible');
  },
  removeSelectionHandler: function removeSelectionHandler(event) {
    var target = jQuery('#' + event.currentTarget.id);
    var id = target.attr('data-id');

    this.removeFromSelection(target, id);

    event.preventDefault();
  },
  toggleSelectionHandler: function toggleSelectionHandler(event) {
    if (event.target.href) {
      return;
    }

    var target = jQuery('#' + event.currentTarget.id.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1'));
    var id = target.attr('data-id');

    if (this.getSelection().get(id)) {
      this.removeFromSelection(target, id);
      this.disposeSingle();
    } else {
      this.addToSelection(target, id);
      this.createSingle(this.getSelection().get(id), id);
    }
  },
  disposeSingle: function disposeSingle() {
    var sidebar = this.sidebar;

    sidebar.unset('details');
    sidebar.unset('display');
    // Hide the sidebar on mobile
    sidebar.$el.removeClass('visible');
  },
  addToSelection: function addToSelection(target, id) {
    this.clearSelection();
    this.$el.find('.apple-music-item').removeClass('selected details');

    target.closest('.apple-music-item').addClass('selected details');
    this.getSelection().add(this.collection._byId[id]); // eslint-disable-line no-underscore-dangle

    // @TODO why isn't this triggered by the above line?
    this.controller.state().props.trigger('change:selection');
  },
  removeFromSelection: function removeFromSelection(target, id) {
    target.closest('.apple-music-item').removeClass('selected details');

    this.getSelection().remove(this.collection._byId[id]); // eslint-disable-line no-underscore-dangle

    // @TODO why isn't this triggered by the above line?
    this.controller.state().props.trigger('change:selection');
  },
  clearSelection: function clearSelection() {
    this.getSelection().reset();
  },
  getSelection: function getSelection() {
    return this.controller.state().props.get('_all').get('selection');
  },
  clearItems: function clearItems() {
    this.$el.find('.apple-music-item').removeClass('selected details');
    this.$el.find('.apple-music-items').empty();
    this.$el.find('.apple-music-pagination').hide();
  },
  loading: function loading() {
    this.$el.find('.spinner').addClass('is-active');
    this.$el.find('.apple-music-error').hide().text('');
    this.$el.find('.apple-music-empty').hide().text('');
    jQuery('#apple-music-loadmore').attr('disabled', true);
  },
  loaded: function loaded() {
    this.$el.find('.spinner').removeClass('is-active');
  },
  fetchItems: function fetchItems() {
    this.trigger('loading');

    var data = {
      _nonce: appleMusic._nonce, // eslint-disable-line no-underscore-dangle
      tab: this.tab,
      params: this.model.get('params'),
      page: this.model.get('page'),
      max_id: this.model.get('max_id')
    };

    media.ajax('apple_music_request', {
      context: this,
      success: this.fetchedSuccess,
      error: this.fetchedError,
      data: data
    });
  },
  fetchedSuccess: function fetchedSuccess(response) {
    var _this3 = this;

    if (!this.model.get('page')) {
      if (!response.items) {
        this.fetchedEmpty(response);
        return;
      }

      this.model.set('items', response.items);

      this.collection.reset(response.items);
    } else {
      if (!response.items) {
        this.fetchedEmpty(response);
        return;
      }

      this.model.set('items', this.model.get('items').concat(response.items));

      var collection = new Backbone.Collection(response.items);
      var container = document.createDocumentFragment();

      this.collection.add(collection.models);

      collection.each(function (model) {
        container.appendChild(_this3.renderItem(model));
      });

      this.$el.find('.apple-music-items').append(container);
    }

    jQuery('#apple-music-loadmore').attr('disabled', !response.meta.loadMore).show();

    this.trigger('loaded loaded:success', response);
  },
  fetchedEmpty: function fetchedEmpty(response) {
    this.$el.find('.apple-music-empty').text(appleMusic.labels.noresults).show();

    this.$el.find('.apple-music-pagination').hide();

    this.trigger('loaded loaded:noresults', response);
  },
  fetchedError: function fetchedError(response) {
    this.$el.find('.apple-music-error').text(response.error_message).show();
    jQuery('#apple-music-loadmore').attr('disabled', true).show();
    this.trigger('loaded loaded:error', response);
  },
  updateInput: function updateInput(event) {
    // triggered when a search is submitted

    var params = this.model.get('params');
    this.$el.find('.apple-music-toolbar').find(':input').each(function addParam() {
      var n = jQuery(this).attr('name');
      if (n) {
        params[n] = jQuery(this).val();
      }
    });

    this.clearSelection();
    jQuery('#apple-music-button').attr('disabled', 'disabled');
    this.model.set('params', params);
    this.trigger('change:params'); // why isn't this triggering automatically? might be because params is an object

    event.preventDefault();
  },
  paginate: function paginate(event) {
    if (0 === this.collection.length) {
      return;
    }

    var page = this.model.get('page') || 1;

    this.model.set('page', page + 1);
    this.trigger('change:page');

    event.preventDefault();
  },
  changedPage: function changedPage() {
    // triggered when the pagination is changed

    this.fetchItems();
  },
  changedParams: function changedParams() {
    // triggered when the search parameters are changed

    this.model.set('page', null);
    this.clearItems();
    this.fetchItems();
  }
});

// VIEW - MEDIA FRAME (MENU BAR)

var postFrame = media.view.MediaFrame.Post;

media.view.MediaFrame.Post = postFrame.extend({
  initialize: function initialize() {
    postFrame.prototype.initialize.apply(this);

    var id = 'apple-music-service-apple-music';
    var controller = {
      id: id,
      router: id + '-router',
      toolbar: id + '-toolbar',
      menu: 'default',
      title: appleMusic.labels.title,
      tabs: appleMusic.tabs,
      priority: 100 // places it above Insert From URL
    };

    var tabKeys = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(appleMusic.tabs);
    var defaultSet = void 0;
    for (var i = 0, len = tabKeys.length; i < len; i += 1) {
      var tab = tabKeys[i];
      // Content
      this.on('content:render:' + id + '-content-' + tab, _.bind(this.appleMusicContentRender, this, appleMusic, tab));

      if ('undefined' === typeof defaultSet) {
        controller.content = id + '-content-' + tab;
        defaultSet = true;
      }
    }

    this.states.add([new media.controller.AppleMusic(controller)]);

    // Tabs
    this.on('router:create:' + id + '-router', this.createRouter, this);
    this.on('router:render:' + id + '-router', _.bind(this.appleMusicRouterRender, this, appleMusic));

    // Toolbar
    this.on('toolbar:create:' + id + '-toolbar', this.appleMusicToolbarCreate, this);
  },
  appleMusicRouterRender: function appleMusicRouterRender(service, view) {
    var id = 'apple-music-service-apple-music';
    var tabs = {};

    var tabKeys = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(appleMusic.tabs);
    for (var i = 0, len = tabKeys.length; i < len; i += 1) {
      var tab = tabKeys[i];
      var tabId = id + '-content-' + tab;
      tabs[tabId] = {
        text: appleMusic.tabs[tab]
      };
    }

    view.set(tabs);
  },
  appleMusicContentRender: function appleMusicContentRender(service, tab) {
    /* called when a tab becomes active */
    this.content.set(new media.view.AppleMusic({
      controller: this,
      model: this.state().props.get(tab),
      tab: tab,
      className: 'clearfix attachments-browser apple-music-content apple-music-content-apple-music apple-music-content-apple-music-' + tab // eslint-disable-line max-len
    }));
  },
  appleMusicToolbarCreate: function appleMusicToolbarCreate(toolbar) {
    toolbar.view = new media.view.Toolbar.AppleMusic({ // eslint-disable-line no-param-reassign
      controller: this
    });
  }
});

// CONTROLLER:

media.controller.AppleMusic = media.controller.State.extend({
  initialize: function initialize(options) {
    this.props = new Backbone.Collection();

    var tabKeys = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(options.tabs);
    for (var i = 0, len = tabKeys.length; i < len; i += 1) {
      var tab = tabKeys[i];
      this.props.add(new Backbone.Model({
        id: tab,
        params: {},
        page: null,
        fetchOnRender: options.tabs[tab].fetchOnRender
      }));
    }

    this.props.add(new Backbone.Model({
      id: '_all',
      selection: new Backbone.Collection()
    }));

    this.props.on('change:selection', this.refresh, this);
  },
  refresh: function refresh() {
    this.frame.toolbar.get().refresh();
  },
  appleMusicInsert: function appleMusicInsert() {
    var format = $('.media-sidebar input[name="format"]:checked').val();

    var selection = this.frame.content.get().getSelection();
    var shortcodes = [];
    var shortcode = void 0;

    selection.each(function (model) {
      if ('undefined' === typeof format) {
        shortcode = model.get('shortcode');
      } else {
        shortcode = model.get('shortcode').replace(']', 'format="' + format + '"]');
      }

      shortcodes.push(shortcode);
    }, this);

    if ('undefined' === typeof tinymce || null === tinymce.activeEditor || tinymce.activeEditor.isHidden()) {
      media.editor.insert(_.toArray(shortcodes).join('\n\n'));
    } else {
      media.editor.insert('<p>' + _.toArray(shortcodes).join('</p><p>') + '</p>');
    }

    selection.reset();
    this.frame.close();
  }
});

// Create custom apple music button
function openMediaModal(evt) {
  evt.preventDefault();
  media({
    frame: 'post',
    state: 'apple-music-service-apple-music'
  }).open();
}

// Bind button function
document.addEventListener('DOMContentLoaded', function () {
  var musicButton = document.querySelector('.apple-music-button');
  if (null !== musicButton) {
    musicButton.addEventListener('click', openMediaModal);
  }
});

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(173), __esModule: true };

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(174);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(31);
var $keys = __webpack_require__(22);

__webpack_require__(45)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ 175:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(36);
var enumBugKeys = __webpack_require__(30);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ 23:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ 24:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ 25:
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(29)('keys');
var uid = __webpack_require__(25);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(17);
var hide = __webpack_require__(11);
var has = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ 30:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(8)(function () {
  return Object.defineProperty(__webpack_require__(26)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(42)(false);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(38);
var toAbsoluteIndex = __webpack_require__(43);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(8);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(35);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ 9:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ })

/******/ });
//# sourceMappingURL=mediaModal.bundle.js.map