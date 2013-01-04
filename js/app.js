var Config={},App={views:{},models:{},collections:{}};App.vent=_.extend({},Backbone.Events);App.baseUrl="http://127.0.0.1/player/";App.sc={clientId:"d6c4b803c5bbbf0a96168a9ece96ac0c",redirectUri:App.baseUrl+"callback.html"};var Soundcloud={};SC.initialize({client_id:App.sc.clientId,redirect_uri:App.sc.redirectUri});App.sc.baseUrl="https://api.soundcloud.com/";App.sc.getUrl=function(a,b){var c={},d=SC.accessToken();d?c.oauth_token=d:c.client_id=App.sc.clientId;b=b?_.extend(b,c):c;return this.baseUrl+a+".json?"+$.param(b)};var Helpers={};App.helpers={};App.helpers.zeroPad=function(a,b){if((""+a).length==b)return a;for(var c=b-(""+a).length,d="",e=0;e<c;e++)d+="0";return d+a};App.helpers.prettyRuntime=function(a){var a=Math.round(a/1E3),b=Math.floor(a/60);return b+":"+App.helpers.zeroPad(a-60*b,2)};var Models={Track:{}};App.models.track=Backbone.Model.extend({});var Views={TracksCollection:{}};
App.views.tracksCollection=Backbone.View.extend({events:{"click .play-now":"play","click .add-to-queue":"addToQueue"},initialize:function(){this.render()},render:function(){var a=_.template($("#tracks-collection").html(),{});this.$el.html(a);this.collection.fetch({success:_.bind(this.renderTracks,this)})},renderTracks:function(){_.each(this.collection.models,function(a){a=a.toJSON();_.extend(a,{helpers:App.helpers});a=_.template($("#track").html(),a);this.$(".tracks").append(a)})},play:function(a){a=
$(a.target).closest("tr").attr("data-track-id");App.player.load(this.collection.get(a));App.queue.queue(this.collection.get(a),!0)},addToQueue:function(a){a=$(a.target).closest("tr").attr("data-track-id");App.queue.queue(this.collection.get(a))}});Views.Splash={};
App.views.splash=Backbone.View.extend({events:{"click .sc-connect":"connect"},initialize:function(){this.render()},render:function(){var a=_.template($("#splash").html(),{});this.$el.html(a);this.setupGrid()},connect:function(){var a=this;SC.connect(function(){a.undelegateEvents();$(a.el).removeData().unbind();App.router.navigate("!",!0)})},setupGrid:function(){this.$("#splash-container").height($(document).height());this.$("#splash-container").width($(document).width());this.squaresNum=this.$(".grid").height()*
this.$(".grid").width()/1500;for(var a=0;a<this.squaresNum;a++)this.$(".grid").append($('<div class="cell">'));this.animateGrid()},animateGrid:function(){for(var a=this,b=0;b<this.squaresNum/3;b++){var c=this.$(".cell")[_.random(0,a.squaresNum)];$(c).animate({opacity:_.random(8,12)/20},"slow")}setTimeout(function(){a.animateGrid()},1E3)}});Views.Player={};
App.views.player=Backbone.View.extend({events:{'click .play-pause[data-status="playing"]':"pause",'click .play-pause[data-status="paused"]':"play","click .next":"next","mouseenter #current-track-wave":"showCursor","mousemove #current-track-wave":"showCursor","mouseleave #current-track-wave":"hideCursor","click #current-track-wave":"skip"},initialize:function(){this.nowPlaying=null;this.render()},render:function(){var a={track:this.model?this.model.toJSON():null,helpers:App.helpers},a=_.template($("#player").html(),
a);this.$el.html(a)},load:function(a){var b=this;this.model=a;this.render();this.setInfoWidth();SC.stream("/tracks/"+this.model.get("id"),function(a){b.nowPlaying&&b.nowPlaying.destruct();b.nowPlaying=a;b.play()})},setInfoWidth:function(){var a=this.$("#current-track-info").width();this.$(".info-text").width(a-30-5)},play:function(){var a=this;this.nowPlaying&&(this.$(".play-pause i").removeClass("icon-play").addClass("icon-pause"),this.$(".play-pause").attr("data-status","playing"),this.nowPlaying.playstate?
this.nowPlaying.resume():this.nowPlaying.play({onplay:function(){App.vent.trigger("player:changed")},whileplaying:function(){a.updateIndicator(a.nowPlaying.position/a.model.get("duration"),"played");a.updatePlaytime()},whileloading:function(){a.updateIndicator(a.nowPlaying.bytesLoaded/a.nowPlaying.bytesTotal,"loaded")},onfinish:function(){a.next()}}))},updateIndicator:function(a,b){var c=100*a;this.$(".portion-"+b).css("width",c+"%")},updatePlaytime:function(){this.$(".playtime .elapsed").text(App.helpers.prettyRuntime(this.nowPlaying.position))},
pause:function(){this.nowPlaying&&(this.$(".play-pause i").removeClass("icon-pause").addClass("icon-play"),this.$(".play-pause").attr("data-status","paused"),this.nowPlaying.pause())},next:function(){App.vent.trigger("player:next")},wavePosToMillisecs:function(){},skip:function(){var a=parseInt(this.$(".cursor").css("margin-left"))/this.$("#current-track-wave").width(),a=Math.round(a*this.model.get("duration"));this.nowPlaying.setPosition(a)},showCursor:function(a){a=a.pageX-$(a.target).offset().left;
a=a<=this.$(".portion-loaded").width()?a:this.$(".portion-loaded").width();this.$(".cursor").css({"margin-left":a,opacity:1})},hideCursor:function(){this.$(".cursor").css({opacity:0})}});var Collections={QueuedTracks:{}};App.collections.queuedTracks=Backbone.Collection.extend({model:App.models.track});Views.Queue={};
App.views.queue=Backbone.View.extend({collection:new App.collections.queuedTracks,initialize:function(){App.vent.on("player:next",this.next,this);App.vent.on("player:changed",this.render,this);this.collection.bind("add",this.render,this);this.collection.bind("remove",this.render,this);this.render()},render:function(){var a={tracks:_.invoke(this.collection.models,"toJSON"),current:App.player.model?App.player.model.get("id"):null,helpers:App.helpers},a=_.template($("#queue").html(),a);this.$el.html(a)},
next:function(){this.collection.remove(App.player.model);if(1<=this.collection.length)var a=this.collection.at(0);App.player.load(a)},queue:function(a,b){this.collection.add(a,b?{at:0}:{})}});Collections.TracksSearchResult={};App.collections.tracksSearchResult=Backbone.Collection.extend({model:App.models.track,initialize:function(a){this.options=a},url:function(){return App.sc.getUrl("tracks",this.options)}});Views.Search={};
App.views.search=Backbone.View.extend({events:{"keyup .search-query":"startSearch"},initialize:function(){this.lastSearchTime=Date.now();this.render()},render:function(){var a=_.template($("#search").html(),{});this.$el.html(a)},startSearch:function(){this.searchTimeout&&clearTimeout(this.searchTimeout);this.searchTimeout=setTimeout(_.bind(this.doSearch,this),500)},doSearch:function(){var a={q:$(".search-query").val()},a=new App.collections.tracksSearchResult(a),b=this.$(".results")[0];this.resultsView&&
this.resultsView.$el.removeData().unbind();this.resultsView=new App.views.tracksCollection({collection:a,el:b})}});Views.Main={};
App.views.main=Backbone.View.extend({initialize:function(a){console.log(a);console.log(a.activeSection);this.activeSection=a.activeSection||"search";this.subResource=a.subResource||null;this.render();App.player=new App.views.player({el:this.$(".player")});App.queue=new App.views.queue({el:this.$(".queue")})},render:function(){console.log(this.activeSection);var a={active:this.activeSection},a=_.template($("#main").html(),a);this.$el.html(a);this.view=new App.views[this.activeSection]({el:this.$("#section"),options:{subresource:this.subResource}})}});var AppRouter=Backbone.Router.extend({routes:{"":"main","!":"main","!:activeSection":"main","!:activeSection/:subResource":"main"},splash:function(){new App.views.splash({el:"#app"})},main:function(a,b){new App.views.main({el:"#app",activeSection:a,subResource:b})}});$(function(){App.router=new AppRouter;Backbone.history.start({root:""})});
