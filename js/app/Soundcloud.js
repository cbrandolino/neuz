goog.provide('Soundcloud')
goog.require('Config')

SC.initialize({
  client_id: App.sc.clientId,
  redirect_uri: App.sc.redirectUri
})

App.sc.baseUrl = 'https://api.soundcloud.com/'
App.sc.getUrl = function(endpoint, options) {
  var defaultOptions = {}
  var token = SC.accessToken()
  if (token)
    defaultOptions.oauth_token = token
  else
    defaultOptions.client_id = App.sc.clientId

  var options = options ?
    _.extend(options, defaultOptions):
    defaultOptions
  return this.baseUrl + endpoint + '.json?' + $.param(options)
}
