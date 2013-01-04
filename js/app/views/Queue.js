goog.provide('Views.Queue')
goog.require('Collections.QueuedTracks')
goog.require('Views.Player')
goog.require('Config')

App.views.queue = Backbone.View.extend({
  collection: new App.collections.queuedTracks(),
  initialize: function() {
    App.vent.on('player:next', this.next, this)
    App.vent.on('player:changed', this.render, this)
    this.collection.bind('add', this.render, this)
    this.collection.bind('remove', this.render, this)
    this.render()
  },
  render: function() {
    var templateData = {
      tracks: _.invoke(this.collection.models, 'toJSON'),
      current: (App.player.model) ?
        App.player.model.get('id') :
        null,
      helpers: App.helpers
    }
    var template = _.template($('#queue').html(), templateData)
    this.$el.html(template)
  },
  next: function() {
    this.collection.remove(App.player.model)
    if (this.collection.length >= 1)
      var newTrack = this.collection.at(0)
    App.player.load(newTrack)
  },
  queue: function(model, first) {
    var options = first ? {at: 0} : {}
    this.collection.add(model, options)
  }
})
