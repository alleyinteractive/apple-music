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

const { media } = wp;

const AttachmentDisplaySettings = media.view.Settings.AttachmentDisplay.extend({
  template: wp.template('apple-music-sidebar'),

  initialize() {
    media
      .view
      .Settings
      .AttachmentDisplay
      .prototype
      .initialize
      .apply(this);
  },

  /**
   * @returns {wp.media.view.Settings.AttachmentDisplay} Returns itself to allow chaining
   */
  render() {
    const playerTabs = ['songs', 'albums', 'playlists'];
    _.extend(this.options, {
      description: this.options.model.attributes.description,
      content: this.options.model.attributes.content,
      shouldDisplayPlayer: playerTabs.includes(this.options.tab),
    });

    media.view.Settings.AttachmentDisplay.prototype.render.call(this);

    return this;
  },
});

// VIEW: MEDIA ITEM:

media.view.AppleMusicItem = wp.Backbone.View.extend({
  tagName: 'li',
  className: 'apple-music-item attachment',

  render() {
    this.template = media.template('apple-music-item');
    this.model.set('tab', this.attributes.tab);
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  },
});

// VIEW - BOTTOM TOOLBAR

media.view.Toolbar.AppleMusic = media.view.Toolbar.extend({
  initialize() {
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
          click() {
            this.controller.state().appleMusicInsert();
          },
        },
      },
    });

    media.view.Toolbar.prototype.initialize.apply(this);

    this.set('pagination', new media.view.Button({
      tagName: 'button',
      classes: 'apple-music-pagination button button-secondary',
      id: 'apple-music-loadmore',
      text: appleMusic.labels.loadmore,
      priority: - 20,
    }));
  },

  refresh() {
    const selection = this
      .controller
      .state()
      .props
      .get('_all')
      .get('selection');

    jQuery('#apple-music-button').prop('disabled', ! selection.length);

    // this.get('inserter').model.set('disabled', true);
    media.view.Toolbar.prototype.refresh.apply(this);
  },
});

// VIEW - MEDIA CONTENT AREA

media.view.AppleMusic = media.View.extend({
  events: {
    'click .apple-music-item-area': 'toggleSelectionHandler',
    'click .apple-music-item .check': 'removeSelectionHandler',
    'submit .apple-music-toolbar form': 'updateInput',
  },

  initialize() {
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

    setTimeout(() => {
      jQuery('.apple-music-pagination').click((event) => {
        this.paginate(event);
      });
    }, 0);

    if (this.model.get('fetchOnRender')) {
      this.model.set('fetchOnRender', false);
      this.fetchItems();
    }
  },

  render() {
    /* fired when you switch router tabs */

    const selection = this.getSelection();

    if (this.collection && this.collection.models.length) {
      this.clearItems();

      const container = document.createDocumentFragment();

      this.collection.each((model) => {
        container.appendChild(this.renderItem(model));
      });

      this.$el.find('.apple-music-items').append(container);
    }

    selection.each((model) => {
      const id = `#apple-music-item-apple-music-${this.tab}-${model.get('id')}`;
      this.$el.find(id)
        .closest('.apple-music-item')
        .addClass('selected details');
    });

    jQuery('#apple-music-button').prop('disabled', ! selection.length);

    return this;
  },

  renderItem(model) {
    const view = new media.view.AppleMusicItem({
      model,
      attributes: {
        tab: this.tab,
      },
    });

    return view.render().el;
  },

  createToolbar() {
    let html = '';
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
    const toolbarTemplate = media.template('apple-music-search');
    html = `<div class="apple-music-toolbar media-toolbar clearfix">${toolbarTemplate(this.model.toJSON())}</div>`; // eslint-disable-line max-len
    this.$el.prepend(html);
  },

  createSidebar() {
    const sidebar = new wp.media.view.Sidebar({
      controller: this.controller,
    });

    this.sidebar = sidebar;
    this.views.add(sidebar);
  },

  createSingle(model) {
    const { sidebar } = this;

    sidebar.set('display', new AttachmentDisplaySettings({
      controller: this.controller,
      model,
      priority: 160,
      tab: this.tab,
    }));
    sidebar.$el.addClass('visible');
  },

  removeSelectionHandler(event) {
    const target = jQuery(`#${event.currentTarget.id}`);
    const id = target.attr('data-id');

    this.removeFromSelection(target, id);

    event.preventDefault();
  },

  toggleSelectionHandler(event) {
    if (event.target.href) {
      return;
    }

    const target = jQuery(`#${
      event.currentTarget.id.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1')
    }`);
    const id = target.attr('data-id');

    if (this.getSelection().get(id)) {
      this.removeFromSelection(target, id);
      this.disposeSingle();
    } else {
      this.addToSelection(target, id);
      this.createSingle(this.getSelection().get(id), id);
    }
  },

  disposeSingle() {
    const { sidebar } = this;
    sidebar.unset('details');
    sidebar.unset('display');
    // Hide the sidebar on mobile
    sidebar.$el.removeClass('visible');
  },

  addToSelection(target, id) {
    this.clearSelection();
    this.$el.find('.apple-music-item').removeClass('selected details');

    target.closest('.apple-music-item').addClass('selected details');
    this.getSelection().add(this.collection._byId[id]); // eslint-disable-line no-underscore-dangle

    // @TODO why isn't this triggered by the above line?
    this.controller.state().props.trigger('change:selection');
  },

  removeFromSelection(target, id) {
    target.closest('.apple-music-item').removeClass('selected details');

    this.getSelection().remove(this.collection._byId[id]); // eslint-disable-line no-underscore-dangle

    // @TODO why isn't this triggered by the above line?
    this.controller.state().props.trigger('change:selection');
  },

  clearSelection() {
    this.getSelection().reset();
  },

  getSelection() {
    return this.controller.state().props.get('_all').get('selection');
  },

  clearItems() {
    this.$el.find('.apple-music-item').removeClass('selected details');
    this.$el.find('.apple-music-items').empty();
    this.$el.find('.apple-music-pagination').hide();
  },

  loading() {
    this.$el.find('.spinner').addClass('is-active');
    this.$el.find('.apple-music-error').hide().text('');
    this.$el.find('.apple-music-empty').hide().text('');
    jQuery('#apple-music-loadmore').attr('disabled', true);
  },

  loaded() {
    this.$el.find('.spinner').removeClass('is-active');
  },

  fetchItems() {
    this.trigger('loading');

    const data = {
      _nonce: appleMusic._nonce, // eslint-disable-line no-underscore-dangle
      tab: this.tab,
      params: this.model.get('params'),
      page: this.model.get('page'),
      max_id: this.model.get('max_id'),
    };

    media.ajax('apple_music_request', {
      context: this,
      success: this.fetchedSuccess,
      error: this.fetchedError,
      data,
    });
  },

  fetchedSuccess(response) {
    if (! this.model.get('page')) {
      if (! response.items) {
        this.fetchedEmpty(response);
        return;
      }

      this.model.set('items', response.items);

      this.collection.reset(response.items);
    } else {
      if (! response.items) {
        this.fetchedEmpty(response);
        return;
      }

      this.model.set('items', this.model.get('items').concat(response.items));

      const collection = new Backbone.Collection(response.items);
      const container = document.createDocumentFragment();

      this.collection.add(collection.models);

      collection.each((model) => {
        container.appendChild(this.renderItem(model));
      });

      this.$el.find('.apple-music-items').append(container);
    }

    jQuery('#apple-music-loadmore').attr(
      'disabled',
      ! response.meta.loadMore
    ).show();

    this.trigger('loaded loaded:success', response);
  },

  fetchedEmpty(response) {
    this.$el.find('.apple-music-empty')
      .text(appleMusic.labels.noresults)
      .show();

    this.$el.find('.apple-music-pagination').hide();

    this.trigger('loaded loaded:noresults', response);
  },

  fetchedError(response) {
    this.$el.find('.apple-music-error').text(response.error_message).show();
    jQuery('#apple-music-loadmore').attr('disabled', true).show();
    this.trigger('loaded loaded:error', response);
  },

  updateInput(event) {
    // triggered when a search is submitted

    const params = this.model.get('params');
    this.$el.find('.apple-music-toolbar')
      .find(':input')
      .each(function addParam() {
        const n = jQuery(this).attr('name');
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

  paginate(event) {
    if (0 === this.collection.length) {
      return;
    }

    const page = this.model.get('page') || 1;

    this.model.set('page', page + 1);
    this.trigger('change:page');

    event.preventDefault();
  },

  changedPage() {
    // triggered when the pagination is changed

    this.fetchItems();
  },

  changedParams() {
    // triggered when the search parameters are changed

    this.model.set('page', null);
    this.clearItems();
    this.fetchItems();
  },
});

// VIEW - MEDIA FRAME (MENU BAR)

const postFrame = media.view.MediaFrame.Post;

media.view.MediaFrame.Post = postFrame.extend({
  initialize() {
    postFrame.prototype.initialize.apply(this);

    const id = 'apple-music-service-apple-music';
    const controller = {
      id,
      router: `${id}-router`,
      toolbar: `${id}-toolbar`,
      menu: 'default',
      title: appleMusic.labels.title,
      tabs: appleMusic.tabs,
      priority: 100, // places it above Insert From URL
    };

    const tabKeys = Object.keys(appleMusic.tabs);
    let defaultSet;
    for (let i = 0, len = tabKeys.length; i < len; i += 1) {
      const tab = tabKeys[i];
      // Content
      this.on(
        `content:render:${id}-content-${tab}`,
        _.bind(
          this.appleMusicContentRender,
          this, appleMusic,
          tab
        )
      );

      if ('undefined' === typeof defaultSet) {
        controller.content = `${id}-content-${tab}`;
        defaultSet = true;
      }
    }

    this.states.add([
      new media.controller.AppleMusic(controller),
    ]);

    // Tabs
    this.on(`router:create:${id}-router`, this.createRouter, this);
    this.on(
      `router:render:${id}-router`,
      _.bind(
        this.appleMusicRouterRender,
        this,
        appleMusic
      )
    );

    // Toolbar
    this.on(`toolbar:create:${id}-toolbar`, this.appleMusicToolbarCreate, this);
  },

  appleMusicRouterRender(service, view) {
    const id = 'apple-music-service-apple-music';
    const tabs = {};

    const tabKeys = Object.keys(appleMusic.tabs);
    for (let i = 0, len = tabKeys.length; i < len; i += 1) {
      const tab = tabKeys[i];
      const tabId = `${id}-content-${tab}`;
      tabs[tabId] = {
        text: appleMusic.tabs[tab],
      };
    }

    view.set(tabs);
  },

  appleMusicContentRender(service, tab) {
    /* called when a tab becomes active */
    this.content.set(new media.view.AppleMusic({
      controller: this,
      model: this.state().props.get(tab),
      tab,
      className: `clearfix attachments-browser apple-music-content apple-music-content-apple-music apple-music-content-apple-music-${tab}`, // eslint-disable-line max-len
    }));
  },

  appleMusicToolbarCreate(toolbar) {
    toolbar.view = new media.view.Toolbar.AppleMusic({ // eslint-disable-line no-param-reassign
      controller: this,
    });
  },
});

// CONTROLLER:

media.controller.AppleMusic = media.controller.State.extend({
  initialize(options) {
    this.props = new Backbone.Collection();

    const tabKeys = Object.keys(options.tabs);
    for (let i = 0, len = tabKeys.length; i < len; i += 1) {
      const tab = tabKeys[i];
      this.props.add(new Backbone.Model({
        id: tab,
        params: {},
        page: null,
        fetchOnRender: options.tabs[tab].fetchOnRender,
      }));
    }

    this.props.add(new Backbone.Model({
      id: '_all',
      selection: new Backbone.Collection(),
    }));

    this.props.on('change:selection', this.refresh, this);
  },

  refresh() {
    this.frame.toolbar.get().refresh();
  },

  appleMusicInsert() {
    const format = $('.media-sidebar input[name="format"]:checked').val();

    const selection = this.frame.content.get().getSelection();
    const shortcodes = [];
    let shortcode;

    selection.each((model) => {
      if ('undefined' === typeof format) {
        shortcode = model.get('shortcode');
      } else {
        shortcode = model.get('shortcode').replace(']', `format="${format}"]`);
      }

      shortcodes.push(shortcode);
    }, this);

    if ('undefined' === typeof tinymce
      || null === tinymce.activeEditor
      || tinymce.activeEditor.isHidden()
    ) {
      media.editor.insert(_.toArray(shortcodes).join('\n\n'));
    } else {
      media.editor.insert(`<p>${_.toArray(shortcodes).join('</p><p>')}</p>`);
    }

    selection.reset();
    this.frame.close();
  },
});

// Create custom apple music button
function openMediaModal(evt) {
  evt.preventDefault();
  media({
    frame: 'post',
    state: 'apple-music-service-apple-music',
  }).open();
}

// Bind button function
document.addEventListener('DOMContentLoaded', () => {
  const musicButton = document.querySelector('.apple-music-button');
  if (null !== musicButton) {
    musicButton.addEventListener('click', openMediaModal);
  }
});
