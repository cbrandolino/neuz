goog.provide('Views.Splash')

App.views.splash = Backbone.View.extend({
  events: {
    'click .sc-connect': 'connect'
  },
  initialize: function() {
    this.render()
  },
  render: function() {
    var template = _.template($('#splash').html(), {})
    this.$el.html(template)
    this.setupGrid()
  },

  // Connect to soundcloud and go to app after success
  connect: function() {
    var self = this
    SC.connect(function() {
      self.undelegateEvents();
      $(self.el).removeData().unbind()
      App.router.navigate('!', true)
    })
  },

  // Grid creation and animations
  setupGrid: function() {
    this.$('#splash-container').height($(document).height())
    this.$('#splash-container').width($(document).width())
    this.squaresNum = this.$('.grid').height() * this.$('.grid').width() / 1500
    for (var i = 0; i < this.squaresNum; i ++) {
      this.$('.grid').append($('<div class="cell">'))
    }
    this.animateGrid()
  },
  animateGrid: function() {
    var self = this
    for (var i = 0; i < this.squaresNum / 3; i++) {
      var square = this.$('.cell')[_.random(0, self.squaresNum)]
      $(square).animate({'opacity': _.random(8, 12) / 20}, 'slow')
    } 
    setTimeout(function() {
      self.animateGrid()
    }, 1000)
  }
})
