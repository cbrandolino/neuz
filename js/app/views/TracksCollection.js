goog.provide('Views.TracksCollection')
goog.require('Helpers')

App.views.tracksCollection = Backbone.View.extend({
  events: {
    'click .play-now': 'play',
    'click .add-to-queue': 'addToQueue'
  },
  initialize: function() {
    this.render()
  },
  render: function() {
    var template = _.template($('#tracks-collection').html(), {})
    this.$el.html(template)
    this.collection.fetch({success: _.bind(this.renderTracks, this)})
  },
  renderTracks: function() {
    _.each(this.collection.models, function(model) {
      var model = model.toJSON()
      var templateData = _.extend(model, {helpers: App.helpers})
      var template = _.template($('#track').html(), model)
      this.$('.tracks').append(template)
    })
  },
  play: function(e) {
    var trackId = $(e.target).closest('tr').attr('data-track-id')
    App.player.load(this.collection.get(trackId))
    App.queue.queue(this.collection.get(trackId))
  },
  addToQueue: function(e) {
    var trackId = $(e.target).closest('tr').attr('data-track-id')
    App.queue.queue(this.collection.get(trackId)) 
  }
})
