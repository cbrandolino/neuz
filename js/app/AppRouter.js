goog.provide('AppRouter')
goog.require('Config')
goog.require('Soundcloud')
goog.require('Views.Splash')

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'main',
    '!': 'main',
    '!splash': 'splash',
    '!auth': 'auth'
  },

  // Check for soundcloud auth status.
  // Redirect to splash page id user is not authenticated.
  auth: function(callback) {
    var self = this
    SC.get('/me', function(user, error) {
      if (error)
        self.navigate("!splash", true)
      else
        callback()
    }) 
  },

  splash: function() {
    new App.views.splash({el: '#app'})
  },

  main: function() {
    this.auth(function(){
      console.log('home')
    })
  }
})

$(function() {
  App.router = new AppRouter
  Backbone.history.start({root: ''})
})
