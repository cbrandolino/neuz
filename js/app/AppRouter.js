goog.provide('AppRouter')
goog.require('Config')
goog.require('Soundcloud')
goog.require('Views.Splash')
goog.require('Views.Main')

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'main',
    '!': 'main',
    '!:activeSection': 'main',
    '!:activeSection/:subResource': 'main'
  },

  splash: function() {
    new App.views.splash({el: '#app'})
  },

  main: function(activeSection, subResource) {
    new App.views.main({
      el: '#app',
      activeSection: activeSection,
      subResource: subResource
    })
  }
})

$(function() {
  App.router = new AppRouter
  Backbone.history.start({root: ''})
})
