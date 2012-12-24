goog.provide('Config')

var App         = {}
App.views       = {}
App.models      = {}
App.collections = {}

App.baseUrl = 'http://127.0.0.1/player/'

App.sc = {
  clientId: 'd6c4b803c5bbbf0a96168a9ece96ac0c',
  redirectUri: App.baseUrl + 'callback.html'
}
