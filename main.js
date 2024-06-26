// var movies = []

// console.log(movies[Math.floor(Math.random() * movies.length)]);

var movieArray = []
var movieName = document.getElementById("movie-name");
var movieNameSubmitButton = document.getElementById("movie-name-submit-button");
var movieList = document.getElementById("movie-list");
var randomizeButton = document.getElementById("randomize-button");
var movieResult = document.getElementById("movie-result");
var movies = document.getElementsByClassName("movie");
var closeButtons = document.getElementsByClassName("close");

setup();

function setup() {
    addExisitngMoviesToArray();
    addCloseButtonsToExistingMovies();
    addRemovalFunctionalityToExistingCloseButtons();
}

// Add initial list items to the array
function addExisitngMoviesToArray() {
    for(var i = 0; i < movieList.children.length; i++) {
        movieArray.push(movieList.children[i].innerText);
    }

    // Iterating over an array rather than using a for loop for each child element //
    // Array.from(movieList.children).forEach((movie) => {
    //     movieArray.push(movie.innerText);
    // })

}

// Add the close button to the movie
function addCloseButtonsToExistingMovies() {
    for(var i = 0; i < movies.length; i++) {
        var span = document.createElement("span");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        movies[i].parentElement.appendChild(span);
    }
}

// Get the movie name from the parent li, find it in the array and remove it
function addRemovalFunctionalityToExistingCloseButtons() {
    for(var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", function() {
            this.parentElement.remove();
            var oldText = this.parentElement.innerText;
            var newText = oldText.substring(0, oldText.length - 1);
            var index = movieArray.indexOf(newText);
            movieArray.splice(index, 1);
        })
    }
}

// Add the functionality to add a movie by either hitting enter or clicking Submit
movieNameSubmitButton.addEventListener("click", newMovie);
movieName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        newMovie();
    }
});

function newMovie() {
    var li = document.createElement("li");
    var movieNameSpan = document.createElement("span");
    movieNameSpan.className = "movie";
    var inputValue = movieName.value;
    var text = document.createTextNode(inputValue);
    movieNameSpan.appendChild(text);
    li.appendChild(movieNameSpan);

    if (inputValue === "") {
        alert("Movie name cannot be blank");
    } else if (movieArray.includes(inputValue)) {
        alert("Movie is already in the list");
    }
    else {
        movieList.appendChild(li);
        movieArray.push(inputValue);
    }

    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.addEventListener("click", function() {
        this.parentElement.remove();
        var oldText = this.parentElement.innerText;
        var newText = oldText.substring(0, oldText.length - 1);
        var index = movieArray.indexOf(newText);
        movieArray.splice(index, 1);
    })

    movieName.value = "";
}

// Add the functionality to select a random movie
randomizeButton.addEventListener("click", getRandomMovie);

function getRandomMovie() {
    for (i = 0; i < movieList.children.length; i++) {
        movieList.children[i].children[0].classList.remove("random-movie");
    }
    movieList.children[Math.floor(Math.random() * movieList.children.length)].children[0].classList.add("random-movie");
}