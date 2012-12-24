goog.provide('Views.Splash')

App.views.splash = Backbone.View.extend({
  initialize: function() {
    this.render()
  },
  render: function() {
    var template = _.template($('#splash').html(), {})
    this.$el.html(template)
  }
})
