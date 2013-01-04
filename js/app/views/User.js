goog.provide('Views.User')
goog.require('Models.User')

App.views.user = Backbone.View.extend({
  initialize: function(options) {
    this.userId = options.subResource
    this.model = new App.models.user({userId: this.userId})
    this.model.bind('change', this.render, this)
    this.model.fetch()
  },
  render: function() {
    var templateData = {
      user: this.model.toJSON()
    }
    console.log(templateData.user)
    var template = _.template($('#user').html(), templateData)
    this.$el.html(template)
  }
})
