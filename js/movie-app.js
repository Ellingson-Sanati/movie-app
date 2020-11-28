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
            $("h1").html(movieListHtml(response))
        });

    const movieHtml = (movie) => {
        let html = `<li class="col-xs-12 col-md-6 col-lg-4  mb-3">
                        <div class="card" style="width: 18rem;">
                            <img src="${movie.poster}" class="card-img-top poster">
                            <div class="card-body text-center">
                                <h2 id= "${movie.title}" class="card-title text-uppercase">${movie.title}</h2>
                                <h5 class="mb-3">User Rating: ${movie.rating}</h5>
                                <button id="edit-movie-btn">Edit</button>
                                <button id="delete-movie-btn">Delete</button>
                            </div>
                        </div>
                    </li>`
        return html
    }




    const movieListHtml = (movieList) => {
        let html = "<ul class='row list-unstyled'>";
        (typeof movieList == 'object') ?
        movieList.forEach(movie => {html += movieHtml(movie)})
            :
            html += movieHtml(movieList)
        html += "</ul>"
        return html
    }


//***Section 2

//Create/Post to add new movies -Make an html form
            //title, rating
//On submit event.preventDefault

    //Instead- make a post request to/movies in the request.body - include title, rating






    $('body').on('click', '#add-movie-submit', function(e) {
        e.preventDefault();
        createNewMovieObj();
    })

    const createNewMovieObj = () => {
        const newMovieObj = {
            title: $('#create-movie-title').val(),
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
            .then(response => {
                //ADD FUNCTION TO CREATE HTML/VALIDATION MESSAGE STATING MOVIE WAS ADDED
                fetch('https://even-ripple-allium.glitch.me/movies')
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        $("h1").html(movieListHtml(response))
                    });
                console.log(response.json())
    }) /* movie was added successfully */
            .catch(error => console.error(error)); /* handle errors */
    }




//****Section 3

//Option to edit movies- Create button which brings up form

//Form should have movies info pre-populated

//On submit event.preventDefault


const editMovieForm = movie => {
        let html = `<div>
    <form id="${movie.name}" class="edit-movie">
        <div class="form-group">
            <label for="edit-movie-title">Movie Title</label>
            <input type="text" class="form-control" id="edit-movie-title" value="${movie.name}">
        </div>
        <div class="form-group">
            <label for="edit-movie-rating">Movie Rating</label>
            <select class="form-control form-control-sm" id="edit-movie-rating" value="${movie.rating}">
                <option class="rating" id="rating-1" value="1">1 (This movie was terrible!) </option>
                <option class="rating" id="rating-2" value="2">2</option>
                <option class="rating" id="rating-3" value="3">3</option>
                <option class="rating" id="rating-4" value="4">4</option>
                <option class="rating" id="rating-5" value="5">5 (I could watch this over and over!)</option>
            </select>
        </div>
        <button id="edit-movie-submit" type="submit" class="btn btn-primary">Edit Movie</button>
        <button id="edit-movie-cancel" type="submit" class="btn btn-danger">Cancel Edit</button>
    </form>
</div>`
    return html
}


//EDIT MOVIE button handler
$('body').on('click', '#edit-movie-btn', function (e){
    $(this).attr("disabled", "disabled");
    const oldMovieObj = {
        name: $(this).parent().children().html(),
        rating: $(this).parent().children().next().html()
    }
    const getMovieRating = Number(oldMovieObj.rating.charAt(oldMovieObj.rating.length-1));
    const newMovieObj = {};
    fetch('https://even-ripple-allium.glitch.me/movies')
        .then(response =>
            response.json()
        )
        .then(function(response) {
            $('option').each( function(index, element) {
                if (getMovieRating == $(element).attr('value')) {
                    $(element).attr("selected", "selected");
                }
            })
        });
    $(this).attr("disabled", "");
    $(this).parent().replaceWith(editMovieForm(oldMovieObj))
})

    const editMovieObj = function(e) {
        console.log(e.target);
        let movieNameMatcher = e.target.parentElement.parentElement.parentElement.children[1].children[0].id;
        let updatedMovie;
        let updatedMovieID = '';
        let movieCard = e.target.parentElement.parentElement.parentElement.parentElement;
        fetch('https://even-ripple-allium.glitch.me/movies')
            .then(response => response.json())
            .then(response => {
                console.log(response)
                updatedMovie = response.filter(movie =>
                    movie.title == movieNameMatcher
                )
                updatedMovie = updatedMovie[0];
                console.log(updatedMovie);
                updatedMovie.title = $('#edit-movie-title').val();
                updatedMovie.rating = $('#edit-movie-rating').val();
                updatedMovieID = updatedMovie.id;
                const url = `https://even-ripple-allium.glitch.me/movies/${updatedMovieID}`;
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedMovie),
                };
                fetch(url, options)
                    .then(response => {
                        //ADD FUNCTION TO CREATE HTML/VALIDATION MESSAGE STATING MOVIE WAS ADDED
                        console.log(response.json())
                        $(movieCard).replaceWith(movieHtml(updatedMovie))
                    }) /* movie was added successfully */
                    .catch(error => console.error(error)); /* handle errors */
            })

    }

//EDIT MOVIE submit handler
$('body').on('click', '#edit-movie-submit', function(e) {
    e.preventDefault();
    $(this).attr('disabled', 'disabled');
    editMovieObj(e);
})

//CANCEL EDIT MOVIE submit handler
    $('body').on('click', '#edit-movie-cancel', function(e) {
        debugger
        e.preventDefault();
        $(this).attr('disabled', 'disabled');
        let movieNameMatcher = e.target.parentElement.parentElement.parentElement.children[1].children[0].id;
        let movieCard = e.target.parentElement.parentElement.parentElement.parentElement;
        var updatedMovieID;
        fetch('https://even-ripple-allium.glitch.me/movies')
            .then(response => response.json())
            .then(response => {
                console.log(response)
                updatedMovie = response.filter(movie =>
                    movie.title == movieNameMatcher
                )
                updatedMovie = updatedMovie[0];
                console.log(updatedMovie);
                updatedMovie.title = $('#edit-movie-title').val();
                updatedMovie.rating = $('#edit-movie-rating').val();
                updatedMovieID = updatedMovie.id
            }).then( response => fetch(`https://even-ripple-allium.glitch.me/movies/${updatedMovieID}`))
            .then(response => response.json())
            .then(response => {
                console.log(response)
                $(movieCard).replaceWith(movieHtml(response));
            })
    });

//****Section 4

//Next to Edit movie button - have a Delete movie button

//Delete request send to /movies to delete that specific movie


    $('body').on('click', '#delete-movie-btn', function (e){

        console.log(e.target);
        let movieNameMatcher = e.target.parentElement.parentElement.children[1].children[0].id;
        let deleteMovie;
        let deleteMovieID = '';
        let movieCard = $(this).parent().parent().parent()[0];
        fetch('https://even-ripple-allium.glitch.me/movies')
            .then(response => response.json())
            .then(response => {

                console.log(response)

                deleteMovie = response.filter(movie =>
                    movie.title == movieNameMatcher
                )
                deleteMovie = deleteMovie[0];
                console.log(deleteMovie);
                deleteMovieID = deleteMovie.id;
                const url = `https://even-ripple-allium.glitch.me/movies/${deleteMovieID}`;
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }

                };
                fetch(url, options)
                    .then(response => {
                        //ADD FUNCTION TO CREATE HTML/VALIDATION MESSAGE STATING MOVIE WAS ADDED
                        console.log(response.json())
                        $(movieCard).remove()
                        /* movie was added successfully */
                    }).catch(error => console.error(error)); /* handle errors */
            })
    })




});