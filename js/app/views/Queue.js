goog.provide('Views.Queue')
goog.require('Collections.QueuedTracks')
goog.require('Views.Player')

App.views.queue = Backbone.View.extend({
  collection: new App.collections.queuedTracks(),
  initialize: function() {
    this.collection.bind('add', this.render, this)
    this.render()
  },
  render: function() {
    var templateData = {
      tracks: _.invoke(this.collection.models, 'toJSON'),
      current: App.player.nowPlaying,
      helpers: App.helpers
    }
    console.log(templateData.tracks)
    var template = _.template($('#queue').html(), templateData)
    this.$el.html(template)
  },
  queue: function(model) {
    this.collection.add(model)
  }
})
