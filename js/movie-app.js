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
        let html = `<li class="col-4 mb-3"><div class="card" style="width: 18rem;">
  <img src="${movie.poster}" class="card-img-top poster">
  <div class="card-body text-center">
    
    <h2 class="card-title text-uppercase">${movie.title}</h2>
    <h5 class="mb-3">User Rating: ${movie.rating}</h5><button id="edit-movie-btn">Edit</button>
  </div>
</div></li> `
        return html
    }




    const movieListHtml = (movieList) => {
        let html = "<ul class='row list-unstyled'>"
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


const editMovieForm = movie => {
        let html = `<div>
    <form class="edit-movie">
        <div class="form-group">
            <label for="edit-movie-title">Movie Title</label>
            <input type="text" class="form-control" id="edit-movie-title">
        </div>
        <div class="form-group">
            <label for="edit-movie-rating">Movie Rating</label>
            <!--            <input type="text" class="form-control" id="create-movie-rating">-->
            <select class="form-control form-control-sm" id="edit-movie-rating">
                <option value="1">1 (This movie was terrible!) </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 (I could watch this over and over!)</option>
            </select>
        </div>
        <button id="edit-movie-submit" type="submit" class="btn btn-primary">Edit Movie</button>
    </form>
</div>`
    return html
}

$('body').on('click', '#edit-movie-btn', function (e){

    $(this).append(editMovieForm(movie))
})

//****Section 4

//Next to Edit movie button - have a Delete movie button

//Delete request send to /movies to delete that specific movie







});