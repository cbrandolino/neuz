goog.provide('Views.TracksCollection')

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
      console.log(model.toJSON())
      var template = _.template($('#track').html(), model.toJSON())
      this.$('.tracks').append(template)
    })
  }
})
