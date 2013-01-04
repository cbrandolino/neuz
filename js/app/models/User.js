goog.provide('Models.User')

App.models.user = Backbone.Model.extend({
  initialize: function(options) {
    this.userId = options.userId
    this.options = _.omit(options, 'userId')
  },
  url: function() {
    return App.sc.getUrl('users/' + this.userId, this.options)
  } 
})
