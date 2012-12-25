goog.provide('AppRouter')
goog.require('Config')
goog.require('Soundcloud')
goog.require('Views.Splash')
goog.require('Views.Main')

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'main',
    '!': 'main',
    '!splash': 'splash'
  },

  // Check for soundcloud auth status.
  // Redirect to splash page id user is not authenticated.
  auth: function(callback) {
    var self = this
    if (SC.isConnected())
      callback()
    else
      self.navigate("!splash", true)
  },

  splash: function() {
    new App.views.splash({el: '#app'})
  },

  main: function() {
    this.auth(function(){
      new App.views.main({el: '#app'})
    })
  }
})

$(function() {
  App.router = new AppRouter
  Backbone.history.start({root: ''})
})
