goog.provide('Views.Player')

App.views.player = Backbone.View.extend({
  events: {
    'click .play-pause[data-status="playing"]': 'pause',
    'click .play-pause[data-status="paused"]': 'play',
    'click .next': 'next',
    'mouseenter #current-track-wave': 'showCursor',
    'mousemove #current-track-wave': 'showCursor',
    'mouseleave #current-track-wave': 'hideCursor',
    'click #current-track-wave': 'skip'
  },
  initialize: function() {
    this.nowPlaying = null
    this.render()
  },
  render: function() {
    var templateData = {
      track: this.model ? this.model.toJSON() : null,
      helpers: App.helpers
    }
    var template = _.template($('#player').html(), templateData)
    this.$el.html(template)
  },
  load: function(model) {
    var self = this
    this.model = model
    this.render()
    this.setInfoWidth()
    SC.stream("/tracks/" + this.model.get('id'), function(sound) {
      if (self.nowPlaying)
        self.nowPlaying.destruct()
      self.nowPlaying = sound
      self.play()
    })
  },
  setInfoWidth: function() {
    var divWidth = this.$('#current-track-info').width()
    var imgWidth = 30
    this.$('.info-text').width(divWidth - imgWidth - 5)
  },
  play: function() {
    var self = this
    if (this.nowPlaying) {
      this.$('.play-pause i').removeClass('icon-play').addClass('icon-pause')
      this.$('.play-pause').attr('data-status', 'playing')
      if (this.nowPlaying.playstate)
        this.nowPlaying.resume()
      else
        this.nowPlaying.play({
          onplay: function() {
            App.vent.trigger('player:changed')
          },
          whileplaying: function() {
            self.updateIndicator(
              self.nowPlaying.position / self.model.get('duration'),
              'played'
            ),
            self.updatePlaytime()
          },
          whileloading: function() {
            self.updateIndicator(
              self.nowPlaying.bytesLoaded / self.nowPlaying.bytesTotal,
              'loaded'
            )
          },
          onfinish: function() {
            self.next()
          }
        })
    }
  },
  updateIndicator: function(ratio, indicator) {
    var pc = ratio * 100
    this.$('.portion-' + indicator).css('width', pc + '%')
  },
  updatePlaytime: function() {
    this.$('.playtime .elapsed').text(
      App.helpers.prettyRuntime(this.nowPlaying.position))
  },
  pause: function() {
    if (this.nowPlaying) {
      this.$('.play-pause i').removeClass('icon-pause').addClass('icon-play')
      this.$('.play-pause').attr('data-status', 'paused')
      this.nowPlaying.pause()
    }
  },
  next: function() {
    App.vent.trigger('player:next')
  },
  wavePosToMillisecs: function() {

  },
  skip: function() {
    var pointRatio = parseInt(this.$('.cursor').css('margin-left')) / 
      this.$('#current-track-wave').width()
    var position = Math.round(pointRatio * this.model.get('duration'))
    this.nowPlaying.setPosition(position)
  },
  showCursor: function(e) {
    var mousePos = e.pageX - $(e.target).offset().left
    var cursorPos = (mousePos <= this.$('.portion-loaded').width()) ?
      mousePos :
      this.$('.portion-loaded').width()
    this.$('.cursor').css({
      'margin-left': cursorPos,
      'opacity': 1
    })
  },
  hideCursor: function() {
    this.$('.cursor').css({
      'opacity': 0 
    })
  }
})
