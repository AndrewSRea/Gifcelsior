$(document).ready(function() {
    
    var topics = ["capButton", "ironButton", "thorButton", "hulkButton",
                  "widowButton", "hawkButton", "gifButtons"];
    
    function displayAvengerShow() {
    
        var x = $(this).data("search");
        console.log(x);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=3VYz2Ld7JFYXNsjVDPbpa2RrUGCVpEaG&limit=10";
    
        console.log(queryURL);
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                
                var showDiv = $("<div class='avengeGifs'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                showImage.attr("src", staticSrc);
                showImage.addClass("avengeGiphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#avengeGifs").prepend(showDiv);
            }
        });
    }
    
    $("#addAvenger").on("click", function(event) {
        event.preventDefault();
        var newShow = $("#inputAvenger").val().trim();
        topics.push(newShow);
        console.log(topics);
        $("#inputAvenger").val('');
        displayButtons();
    });
    
    function displayButtons() {
        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            console.log(topics[i])
            var a = $('<button class="button avengeButton">');
            a.attr("id", "show");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#gifButtons").append(a);
        }
    }
    
    displayButtons();
    
    $(document).on("click", "#show", displayAvengerShow);
    
    $(document).on("click", ".avengeGiphy", pausePlayGifs);
    
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
    
});