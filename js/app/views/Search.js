goog.provide('Views.Search')

App.views.search = Backbone.View.extend({
  events: {
    'keyup .search-query': 'doSearch'
  },
  initialize: function() {
    this.render()
  },
  render: function() {
    var templateData = {}
    var template = _.template($('#search').html(), templateData)
    this.$el.html(template)
  },
  doSearch: function() {
    console.log()
  }
})
