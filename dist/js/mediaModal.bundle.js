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
/******/ 	return __webpack_require__(__webpack_require__.s = 166);
/******/ })
/************************************************************************/
/******/ ({

/***/ 166:
/***/ (function(module, exports) {

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

var media = wp.media;

// VIEW: MEDIA ITEM:

media.view.AppleMusicItem = wp.Backbone.View.extend({

	tagName: 'li',
	className: 'apple-music-item attachment',

	render: function render() {
		this.template = media.template('apple-music-item-' + this.options.tab);
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

		media.view.Toolbar.prototype.initialize.apply(this, arguments);

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

		//this.get( 'inserter' ).model.set( 'disabled', true );
		media.view.Toolbar.prototype.refresh.apply(this, arguments);
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

		/* fired when you switch router tabs */

		var _this = this;

		this.collection = new Backbone.Collection();
		this.tab = this.options.tab;

		this.createSidebar();
		this.createToolbar();
		this.clearItems();

		if (this.model.get('items')) {

			this.collection = new Backbone.Collection();
			this.collection.reset(this.model.get('items'));

			jQuery('#apple-music-loadmore').attr('disabled', false).show();
		} else {
			jQuery('#apple-music-loadmore').hide();
		}

		this.collection.on('reset', this.render, this);

		this.model.on('change:params', this.changedParams, this);

		this.on('loading', this.loading, this);
		this.on('loaded', this.loaded, this);
		this.on('change:params', this.changedParams, this);
		this.on('change:page', this.changedPage, this);

		jQuery('.apple-music-pagination').click(function (event) {
			_this.paginate(event);
		});

		if (_this.model.get('fetchOnRender')) {
			_this.model.set('fetchOnRender', false);
			_this.fetchItems();
		}
	},

	render: function render() {

		/* fired when you switch router tabs */

		var selection = this.getSelection();

		if (this.collection && this.collection.models.length) {

			this.clearItems();

			var container = document.createDocumentFragment();

			this.collection.each(function (model) {
				container.appendChild(this.renderItem(model));
			}, this);

			this.$el.find('.apple-music-items').append(container);
		}

		selection.each(function (model) {
			var id = '#apple-music-item-apple-music-' + this.tab + '-' + model.get('id');
			this.$el.find(id).closest('.apple-music-item').addClass('selected details');
		}, this);

		jQuery('#apple-music-button').prop('disabled', !selection.length);

		return this;
	},

	renderItem: function renderItem(model) {

		var view = new media.view.AppleMusicItem({
			model: model,
			tab: this.tab
		});

		return view.render().el;
	},

	createToolbar: function createToolbar() {

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
		var toolbar_template = media.template('apple-music-search-' + this.tab);
		html = '<div class="apple-music-toolbar media-toolbar clearfix">' + toolbar_template(this.model.toJSON()) + '</div>';
		this.$el.prepend(html);
	},

	createSidebar: function createSidebar() {
		var sidebar = this.sidebar = new wp.media.view.Sidebar({
			controller: this.controller
		});

		this.views.add(sidebar);
	},

	createSingle: function createSingle(model, id) {
		var sidebar = this.sidebar,
		    that = this,
		    html = '';

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

		var target = jQuery('#' + event.currentTarget.id.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));
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
		this.getSelection().add(this.collection._byId[id]);

		// @TODO why isn't this triggered by the above line?
		this.controller.state().props.trigger('change:selection');
	},

	removeFromSelection: function removeFromSelection(target, id) {

		target.closest('.apple-music-item').removeClass('selected details');

		this.getSelection().remove(this.collection._byId[id]);

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

	loaded: function loaded(response) {
		this.$el.find('.spinner').removeClass('is-active');
	},

	fetchItems: function fetchItems() {

		this.trigger('loading');

		var data = {
			_nonce: appleMusic._nonce,
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

		if (!this.model.get('page')) {

			if (!response.items) {
				this.fetchedEmpty(response);
				return;
			}

			this.model.set('items', response.items);

			this.collection.reset(response.items);
		} else {

			if (!response.items) {
				this.moreEmpty(response);
				return;
			}

			this.model.set('items', this.model.get('items').concat(response.items));

			var collection = new Backbone.Collection(response.items);
			var container = document.createDocumentFragment();

			this.collection.add(collection.models);

			collection.each(function (model) {
				container.appendChild(this.renderItem(model));
			}, this);

			this.$el.find('.apple-music-items').append(container);
		}

		jQuery('#apple-music-loadmore').attr('disabled', false).show();

		this.trigger('loaded loaded:success', response);
	},

	fetchedEmpty: function fetchedEmpty(response) {

		this.$el.find('.apple-music-empty').text(appleMusic.labels.noresults).show();

		this.$el.find('.apple-music-pagination').hide();

		this.trigger('loaded loaded:noresults', response);
	},

	fetchedError: function fetchedError(response) {

		this.$el.find('.apple-music-error').text(response.error_message).show();
		jQuery('#apple-music-loadmore').attr('disabled', false).show();
		this.trigger('loaded loaded:error', response);
	},

	updateInput: function updateInput(event) {

		// triggered when a search is submitted

		var params = this.model.get('params');
		var els = this.$el.find('.apple-music-toolbar').find(':input').each(function (k, el) {
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

		if (0 == this.collection.length) {
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

var post_frame = media.view.MediaFrame.Post;

media.view.MediaFrame.Post = post_frame.extend({

	initialize: function initialize() {

		post_frame.prototype.initialize.apply(this, arguments);

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

		for (var tab in appleMusic.tabs) {

			// Content
			this.on('content:render:' + id + '-content-' + tab, _.bind(this.appleMusicContentRender, this, appleMusic, tab));

			// Set the first tab to default.
			if (typeof defaultSet === 'undefined') {
				controller.content = id + '-content-' + tab;
				var defaultSet = true;
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

		for (var tab in appleMusic.tabs) {
			tab_id = id + '-content-' + tab;
			tabs[tab_id] = {
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
			className: 'clearfix attachments-browser apple-music-content apple-music-content-apple-music apple-music-content-apple-music-' + tab
		}));
	},

	appleMusicToolbarCreate: function appleMusicToolbarCreate(toolbar) {
		toolbar.view = new media.view.Toolbar.AppleMusic({
			controller: this
		});
	}

});

// CONTROLLER:

media.controller.AppleMusic = media.controller.State.extend({

	initialize: function initialize(options) {

		this.props = new Backbone.Collection();

		for (var tab in options.tabs) {

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

		var selection = this.frame.content.get().getSelection(),
		    shortcodes = [];

		selection.each(function (model) {

			if (typeof format === 'undefined') {
				var shortcode = model.get('shortcode');
			} else {
				var shortcode = model.get('shortcode').replace(']', 'format="' + format + '"]');
			}

			shortcodes.push(shortcode);
		}, this);

		if (typeof tinymce === 'undefined' || tinymce.activeEditor === null || tinymce.activeEditor.isHidden()) {
			media.editor.insert(_.toArray(shortcodes).join("\n\n"));
		} else {
			media.editor.insert("<p>" + _.toArray(shortcodes).join("</p><p>") + "</p>");
		}

		selection.reset();
		this.frame.close();
	}

});

AttachmentDisplaySettings = media.view.Settings.AttachmentDisplay.extend({

	template: wp.template('apple-music-sidebar'),

	initialize: function initialize() {
		media.view.Settings.AttachmentDisplay.prototype.initialize.apply(this, arguments);
	},

	/**
  * @returns {wp.media.view.Settings.AttachmentDisplay} Returns itself to allow chaining
  */
	render: function render() {
		_.extend(this.options, {
			description: this.options.model.attributes.description,
			content: this.options.model.attributes.content
		});

		media.view.Settings.AttachmentDisplay.prototype.render.call(this);

		return this;
	}
});

/***/ })

/******/ });
//# sourceMappingURL=mediaModal.bundle.js.map