goog.provide('Views.TracksCollection')
goog.require('Helpers')

App.views.tracksCollection = Backbone.View.extend({
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
      model.prettyRuntime = App.helpers.prettyRuntime(model.duration)
      var template = _.template($('#track').html(), model)
      this.$('.tracks').append(template)
    })
  }
})
