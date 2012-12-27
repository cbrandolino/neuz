goog.provide('Helpers')
goog.require('Config')

App.helpers = {}

App.helpers.zeroPad = function(number, totalLength) {
  if ((''+number).length == totalLength)
    return number
  var padding = totalLength - (''+number).length
  var padString = ''
  for (var i = 0; i < padding; i++)
    padString += '0'
  return padString + number
}

App.helpers.prettyRuntime = function(msec) {
  var seconds = Math.round(msec / 1000)
  var minutes = Math.floor(seconds / 60)
  var extraSeconds = seconds - minutes * 60
  return minutes + ':' + App.helpers.zeroPad(extraSeconds, 2)
}
