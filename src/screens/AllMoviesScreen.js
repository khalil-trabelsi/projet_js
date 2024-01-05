import { hideLoading, showLoading, transformDate } from "../utils";

const allmoviesScreen = {
  after_render: async () => {
    let listMovies = [];
    // get movies list
    showLoading
    for (let i = 1; i < 12; i++) {
      let url = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&page=${i}&api_key=688cd3e93675b6046cd154e9d6daf187`;
      let discover2 = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      let discoverJson2 = await discover2.json();

      listMovies.push(...discoverJson2.results);
    }
    hideLoading();
    listMovies = listMovies.filter(elt => elt.backdrop_path != null)
    // console.log(listMovies)
    // pagination
    let current_page = 1;
    let rows = 12;
    const pagination_elt = document.getElementById("pagination");
    const container_elt = document.querySelector("#all_movies .container");
    const displayMovies = (items, container, rows_per_page, page) => {
      container.innerHTML = "";
      page--;
      let start = rows_per_page * page;
      let moviesToDiplay = items.slice(start, start + rows_per_page);
      console.log(moviesToDiplay.length)
      console.log("start: ", start)
      container.innerHTML =
        moviesToDiplay.map(movie => {
          return ` 
           <a class="box" href="/#/movie/${movie?.id}">
             <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.backdrop_path || movie.poster_path}" alt="" />
    
             <div class="info">
           <h4>${movie.title ? movie.title : movie?.name}</h4>
    
              <span class="rate">${movie.vote_average.toFixed(1)}</span>
            </div>
           </a>`
        }).join("")
    }

    const paginationButton = (page, items) => {
      let button = document.createElement("button");
      button.textContent = page;

      if (page == current_page) {
        button.classList.add("active");
      }

      button.addEventListener("click", (e) => {
        current_page = page;
        displayMovies(items, container_elt, rows, current_page);
        document.querySelector("button.active").classList.remove("active")
        button.classList.add("active");
        window.scr = 0;
      })
      return button;
    }

    const setupPagination = (items, container, rows_per_page) => {
      container.innerHTML = "";
      let number_of_pages = Math.floor(items.length / rows_per_page);
      for (let i = 1; i <= number_of_pages; i++) {
        container.appendChild(paginationButton(i, items));
      }
    }
    displayMovies(listMovies, container_elt, rows, current_page);
    setupPagination(listMovies, pagination_elt, rows)
  },
  render: async () => {




    return `
        <section id="all_movies" class="allmovies ">
        <h2 class="main-title">All movies</h2>
        
        <div class="container"> 
      
   
    

      </div>
      <div class="pagenumbers" id="pagination">
      
      </div>
        </section>
       
    
  `
  }
}
export default allmoviesScreen;