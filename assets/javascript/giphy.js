$(document).ready(function() {
    
    var avengersArray = [];
    
    function displayAvengerShow() {
    
        var x = $(this).data("search");
        console.log(x);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=f87fGo11IwG908E6QCnje05YF4IU5PLn&limit=10";
    
        console.log(queryURL);
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                
                var showDiv = $("<div class='col-md-4'>");
        
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
        
                showImage.attr("src", staticSrc);
                showImage.addClass("avengerGiphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#avengeGifs").prepend(showDiv);
        
            }
        });
    }
    
    //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
    $("#addAvenger").on("click", function(event) {
        event.preventDefault();
        var newShow = $("#inputAvenger").val().trim();
        avengersArray.push(newShow);
        console.log(avengersArray);
        $("#inputAvenger").val('');
        displayButtons();
    });
    
    //Function iterates through topics array to display button with array values in "myButtons" section of HTML
    function displayButtons() {
        $("#gifButtons").empty();
        for (var i = 0; i < avengersArray.length; i++) {
            var a = $('<button class="#gifButtons">');
            a.attr("id", "avengers");
            a.attr("data-search", avengersArray[i]);
            a.text(avengersArray[i]);
            $("#gifButtons").append(a);
        }
    }
    
    
    displayButtons();
    
    //Click event on button with id of "show" executes displayNetflixShow function
    $(document).on("click", "#avengers", displayAvengerShow);
    
    //Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
    $(document).on("click", ".avengerGiphy", pausePlayGifs);
    
    //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
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