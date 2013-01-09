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
    var template = _.template($('#main').html())
    this.$el.html(template)
    this.renderSection()
  },
  renderSection: function() {
    if (this.view)
      this.view.remove()

    this.$('#section').html($('<div>'))
    this.view = new App.views[this.activeSection]({
      el: this.$('#section').children('div'), 
      subResource: this.subResource
    })

    var templateData = {
      active: this.activeSection
    }
    var template = _.template($('#main-nav').html(), templateData) 
    this.$('#sidenav').html(template)
  },
  navigate: function(activeSection, subResource) {
    this.activeSection = activeSection || 'search'
    this.subResource = subResource || null
    this.renderSection() 
  }
})
