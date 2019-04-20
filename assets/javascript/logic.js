var topics = ["Rainbow", "cat", "LOL"]

function displayGif() {
    var search = $(this).attr("data-search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      search + "&api_key=p1UosfDNRC8b4YXyXpenGlggwdDADNh5&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var searchImage = $("<img>");
          searchImage.addClass("gif").attr("src", results[i].images.fixed_width_still.url).attr("data-state", "still");

          searchImage.attr("data-still", results[i].images.fixed_width_still.url)

          searchImage.attr("data-animate",results[i].images.fixed_width.url);

          gifDiv.prepend(p);
          gifDiv.prepend(searchImage);

          $("#gifsResults").prepend(gifDiv);
        } $(".gif").on("click", function() {
            var state = $(searchImage).attr("data-state")
            console.log(state)
        
            if (state === "still") {
              $(searchImage).attr("src", $(searchImage).attr("data-animate"));
              $(searchImage).attr("data-state", "animate")
            } else {
              $(searchImage).attr("src", $(searchImage).attr("data-still"));
              $(searchImage).attr("data-state", "still")
            }
        });
      });
};

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
      var btn = $("<button>");
      btn.addClass("gifBtn").attr("data-search", topics[i]).text(topics[i]);
      $("#buttons-view").append(btn);
    }
}

$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gifInput").val().trim();
    topics.push(gif);

    renderButtons();
});

$(document).on("click", ".gifBtn", displayGif);

renderButtons();