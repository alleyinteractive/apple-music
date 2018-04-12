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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


(function (blocks, components, i18n, element, _) {
	var el = element.createElement;

	blocks.registerBlockType('gutenberg-examples/example-05-recipe-card', {
		title: i18n.__('Apple Music'),
		icon: 'block-default',
		category: 'layout',
		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: 'h2'
			},
			mediaID: {
				type: 'number'
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src'
			},
			ingredients: {
				type: 'array',
				source: 'children',
				selector: '.ingredients'
			},
			instructions: {
				type: 'array',
				source: 'children',
				selector: '.steps'
			}
		},
		edit: function edit(props) {
			var focusedEditable = props.focus ? props.focus.editable || 'title' : null;
			var attributes = props.attributes;

			var onSelectImage = function onSelectImage(media) {
				return props.setAttributes({
					mediaURL: media.url,
					mediaID: media.id
				});
			};

			return el('div', { className: props.className }, el(blocks.RichText, {
				tagName: 'h2',
				inline: true,
				placeholder: i18n.__('Apple Music'),
				value: attributes.title,
				onChange: function onChange(value) {
					props.setAttributes({ title: value });
				},
				focus: focusedEditable === 'title' ? focus : null,
				onFocus: function onFocus(focus) {
					props.setFocus(_.extend({}, focus, { editable: 'title' }));
				}
			})
			/*					el( 'div', { className: 'recipe-image' },
   						el( blocks.MediaUpload, {
   							onSelect: onSelectImage,
   							type: 'image',
   							value: attributes.mediaID,
   							render: function( obj ) {
   								return el( components.Button, {
   										className: attributes.mediaID ? 'image-button' : 'button button-large',
   										onClick: obj.open
   									},
   									! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.mediaURL } )
   								);
   							}
   						} )
   					),*/
			/*					el( 'h3', {}, i18n.__( 'Ingredients' ) ),
   					el( blocks.RichText, {
   						tagName: 'ul',
   						multiline: 'li',
   						placeholder: i18n.__( 'Write a list of ingredients…' ),
   						value: attributes.ingredients,
   						onChange: function( value ) {
   							props.setAttributes( { ingredients: value } );
   						},
   						focus: focusedEditable === 'ingredients' ? focus : null,
   						onFocus: function( focus ) {
   							props.setFocus( _.extend( {}, focus, { editable: 'ingredients' } ) );
   						},
   						className: 'ingredients',
   					} ),
   					el( 'h3', {}, i18n.__( 'Instructions' ) ),
   					el( blocks.RichText, {
   						tagName: 'div',
   						inline: false,
   						placeholder: i18n.__( 'Write instructions…' ),
   						value: attributes.instructions,
   						onChange: function( value ) {
   							props.setAttributes( { instructions: value } );
   						},
   						focus: focusedEditable === 'instructions' ? focus : null,
   						onFocus: function( focus ) {
   							props.setFocus( _.extend( {}, focus, { editable: 'instructions' } ) );
   						},
   					} ),*/
			);
		},
		save: function save(props) {
			var attributes = props.attributes;

			return el('div', { className: props.className }, el('h2', {}, attributes.title), attributes.mediaURL && el('div', { className: 'recipe-image' }, el('img', { src: attributes.mediaURL })), el('h3', {}, i18n.__('Ingredients')), el('ul', { className: 'ingredients' }, attributes.ingredients), el('h3', {}, i18n.__('Instructions')), el('div', { className: 'steps' }, attributes.instructions));
		}
	});
})(window.wp.blocks, window.wp.components, window.wp.i18n, window.wp.element, window._);

/***/ })
/******/ ]);
//# sourceMappingURL=blocks.bundle.js.map