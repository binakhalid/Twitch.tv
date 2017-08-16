function getFeaturedStreams() {
  var featureLink = "https://wind-bow.gomix.me/twitch-api/streams/featured?callback=?";

  $.getJSON(featureLink, function(featureObj) {
    var featured = featureObj.featured;
    console.log(featured);

    $.each(featured, function(index /*key*/ , streamObj /*value*/ ) {
      var streamDetails = streamObj.stream;
      var channelName = streamDetails.channel.display_name;
      var channelImg = streamObj.image;
      var gameName = streamDetails.game;
      var streamViewers = streamDetails.viewers;
      var streamLink = "https://www.twitch.tv/"+channelName;
      // html to display Channel properties
      var displayStatus = "<p class='streamStatus'> ONLINE </p>";
      var openLink = "<a href='" + streamLink + "' target='_blank'>";
      var displayImage = "<img src='" + channelImg + "' /> ";
      var displayChannelName = "<h2>" + channelName + " </h2></a>";
      var displayGameName = "<details><ul><li> Game: " + gameName + "</li>";
      var displayViewers = "<li> Viewers: " + streamViewers + " </li></ul></details>";

      var featuredStreams = $("<article class='display result-" + channelName + "'>" +displayStatus + openLink + displayImage + displayChannelName + displayGameName + displayViewers + "</article>");

      $('.streams-container').append(featuredStreams);
    });
  });
};

function getFccStatus() {
  var fccURL = "https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?"

  $.getJSON(fccURL, function(channelObj) {
    var fccStreamObj = channelObj.stream;
    $(".fcc-link").attr({
        'href': "https://www.twitch.tv/freecodecamp"
      });
    $(".channel-Fcc").html("Free Code Camp");
    $(".logo").attr({
        'src': "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png"
      });
    
    if (fccStreamObj) {
      $(".streamStatus").html("ONLINE");
      $(".game").html(fccStreamObj.game);
      $(".viewers").html(" " + fccStreamObj.viewers);
    } else {
      $(".streamStatus").html("OFFLINE");
      $(".fcc-details").css('visibility', 'hidden')
      $(".result-freecodecamp").attr({
        "class": "off"
      });
    }
  })
}

getFeaturedStreams();
getFccStatus();