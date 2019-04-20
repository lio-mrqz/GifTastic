var gifArr = ["Rainbow", "cat", "LOL"]

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
          searchImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(searchImage);

          $("#gifsResults").prepend(gifDiv);
        }
      });
};

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < gifArr.length; i++) {
      var btn = $("<button>");
      btn.addClass("gifBtn").attr("data-search", gifArr[i]).text(gifArr[i]);
      $("#buttons-view").append(btn);
    }
}

$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gifInput").val().trim();
    gifArr.push(gif);

    renderButtons();
});

$(document).on("click", ".gifBtn", displayGif);

renderButtons();