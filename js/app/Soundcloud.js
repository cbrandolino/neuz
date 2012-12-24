goog.provide('Soundcloud')
goog.require('Config')

SC.initialize({
  client_id: App.sc.clientId,
  redirect_uri: App.sc.redirectUri
})
