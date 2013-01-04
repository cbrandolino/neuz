goog.provide('Collections.QueuedTracks')
goog.require('Models.Track')

App.collections.queuedTracks = Backbone.Collection.extend({
  model: App.models.track
})
