goog.provide('Views.Search')
goog.require('Views.TracksCollection')
goog.require('Collections.TracksSearchResult')

App.views.search = Backbone.View.extend({
  events: {
    'keyup .search-query': 'startSearch'
  },
  initialize: function() {
    this.lastSearchTime = Date.now()
    this.render()
  },
  render: function() {
    var templateData = {}
    var template = _.template($('#search').html(), templateData)
    this.$el.html(template)
  },
  startSearch: function() {
    if (this.searchTimeout)
      clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(
      _.bind(this.doSearch, this), 
      500)
  },
  doSearch: function() {
    var searchTerm = $('.search-query').val()
    var options = {
      q: searchTerm
    }
    var searchCollection = new App.collections.tracksSearchResult(options)
    var el = this.$('.results')[0]

    // In case we already have a results view, unbind its events
    // before creating a new one
    if (this.resultsView) 
      this.resultsView.$el.removeData().unbind()

    // Instantiate a generic tracksCollection view with our results
    this.resultsView = new App.views.tracksCollection({
      collection: searchCollection,
      el: el
    })
  }
})
