goog.provide('Views.Main')
goog.require('Views.Search')

App.views.main = Backbone.View.extend({
  initialize: function() {
    this.activeSection = 'search'
    this.render()
  },
  render: function() {
    var templateData = {
      active: this.activeSection
    }
    var template = _.template($('#main').html(), templateData)
    this.$el.html(template)
    this.view = new App.views[this.activeSection]({el: this.$('#section')})
  }
})
