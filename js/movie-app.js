$(document).ready(function (){

    //Fetch movies endpoint. Log results


//****Section 1
//Use a document.ready Hardcode loading... to html file

//AJAX REQUEST to get a listing of the movies

//Append to the DOM

    fetch('https://even-ripple-allium.glitch.me/movies')
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let movieList = movieListHtml(response)
            console.log(movieList)
            $("h1").html(movieListHtml(response))
        });

    const movieHtml = (movie) => {
        let html = `<li><p>${movie.title}</p>
    <p>${movie.rating}</p><img src="${movie.poster}"></li> `
        return html
    }

    const movieListHtml = (movieList) => {
        let html = "<ul>"
        movieList.forEach(movie => {
            html += movieHtml(movie)
        })
        html += "</ul>"
        return html
    }


//***Section 2

//Create/Post to add new movies -Make an html form
            //title, rating
//On submit event.preventDefault

    //Instead- make a post request to/movies in the request.body - include title, rating






    $('body').on('click', 'add-movie-submit', function(e) {
        e.preventDefault();
        createNewMovieObj();
    })

    const createNewMovieObj = () => {
        const newMovieObj = {
            name: $('#create-movie-title').val(),
            rating: $('#create-movie-rating').val()
        };
        const url = 'https://even-ripple-allium.glitch.me/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovieObj),
        };
        fetch(url, options)
            .then(response =>
                //ADD FUNCTION TO CREATE HTML/VALIDATION MESSAGE STATING MOVIE WAS ADDED
                console.log(response.json())) /* movie was added successfully */
            .catch(error => console.error(error)); /* handle errors */
    }




//****Section 3

//Option to edit movies- Create button which brings up form

//Form should have movies info pre-populated

//On submit event.preventDefault

//****Section 4

//Next to Edit movie button - have a Delete movie button

//Delete request send to /movies to delete that specific movie

});