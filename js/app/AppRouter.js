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
    // If the app has already been bootstrapped, just load the
    // new section's view.
    if (App.mainView)
      App.mainView.navigate(activeSection, subResource)
    // Otherwise, initialize the mainView etc.
    else
      App.mainView = new App.views.main({
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
