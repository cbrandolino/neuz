goog.provide('Views.Main')
goog.require('Views.Search')
goog.require('Views.Player')

App.views.main = Backbone.View.extend({
  initialize: function(options) {
    this.activeSection = options.activeSection || 'search'
    this.subResource = options.subResource || null
    this.render()
    // Instantiate the two global views, player and queue
    App.player = new App.views.player({el: this.$('.player')})
    App.queue = new App.views.queue({el: this.$('.queue')})
  },
  render: function() {
    var templateData = {
      active: this.activeSection
    }
    var template = _.template($('#main').html(), templateData)
    this.$el.html(template)
    this.view = new App.views[this.activeSection]({
      el: this.$('#section'), 
      options: {subresource: this.subResource}
    })
  }
})
