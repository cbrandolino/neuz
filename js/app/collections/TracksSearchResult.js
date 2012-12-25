goog.provide('Collections.TracksSearchResult')
goog.require('Models.Track')
goog.require('Soundcloud')

App.collections.tracksSearchResult = Backbone.Collection.extend({
  model: App.models.track,
  initialize: function(options) {
    this.options = options
  },
  url: function() {
    return App.sc.getUrl('tracks', this.options)
  } 
})
