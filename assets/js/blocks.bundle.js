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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
/******/ })
/************************************************************************/
/******/ ({

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__i18n__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__i18n___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__i18n__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apple_music___ = __webpack_require__(75);
// Entry point for Apple Music Gutenberg block.

// Import internationalization

// import blocks


/***/ }),

/***/ 74:
/***/ (function(module, exports) {

// set the localization for Gutenberg.
var setLocaleData = window.wp.i18n.setLocaleData;


setLocaleData({ '': {} }, 'apple-music');

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var __ = window.wp.i18n.__;
var registerBlockType = window.wp.blocks.registerBlockType;

/**
 * Register Apple Music block
 */

/* unused harmony default export */ var _unused_webpack_default_export = (registerBlockType('apple-music/widget', {
  title: __('Apple Music', 'apple-music'),
  description: __('Embed the apple music player into a post.', 'apple-music'),
  category: 'widgets',
  icon: 'format-audio',
  keywords: [__('Apple Music', 'apple-music')],
  supports: {
    html: false
  },
  attributes: {
    query: {
      type: 'array',
      source: 'children',
      selector: '.display-music'
    },
    musicType: {
      type: 'string',
      default: 'artists'
    },
    musicID: {
      type: 'integer'
    },
    item: {
      type: 'object'
    },
    height: {
      type: 'string'
    },
    width: {
      type: 'string',
      default: '100%'
    },
    embedType: {
      type: 'string',
      default: 'preview-player'
    },
    iframeSrc: {
      type: 'string'
    }
  },
  edit: '',
  save: ''
}));

/***/ })

/******/ });
//# sourceMappingURL=blocks.bundle.js.map