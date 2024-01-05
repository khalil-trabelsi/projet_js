import { hideLoading, showLoading, transformDate } from "../utils";
const HomeScreen = {
  // cette fonction est appelée aprés l'affichage de la page à l'aide de la fonction 'render', elle permet à l'utilisateur d'intéragir avec la page demandée
  after_render: async () => {
    const trending_section = document.querySelector(".trending .container");
    const popular_section = document.querySelector("#popular .container");
    const upcoming_section = document.querySelector("#upcoming .container");

    const arrowRight = document.querySelectorAll(".arrowRightBtn");
    const arrowLeft = document.querySelectorAll(".left");
    let firstBox = trending_section.querySelectorAll(".box")[0];
    let firstBoxWidth = firstBox.clientWidth + 20;

    const showHideArrow = (section, n) => {
      let scrollWidth = section.scrollWidth - section.clientWidth; // max scroll width

      console.log(scrollWidth)
      arrowLeft[n].style.display = section.scrollLeft == 0 ? "none" : "block";
      arrowRight[n].style.display = section.scrollLeft == scrollWidth ? "none" : "block"
    }


    // Right/left arrow Move for trending section
    arrowRight[0].addEventListener("click", (e) => {
      e.preventDefault();
      trending_section.scrollLeft += firstBoxWidth;
      setTimeout(() => {
        showHideArrow(trending_section, 0)
      }, 60)
    })
    arrowLeft[0].addEventListener("click", (e) => {
      e.preventDefault();
      trending_section.scrollLeft -= firstBoxWidth;
      showHideArrow(popular_section, 1)

    })
    // Right/left arrow Move for trending section

    arrowRight[1].addEventListener("click", (e) => {
      e.preventDefault();
      popular_section.scrollLeft += firstBoxWidth;
      setTimeout(() => {
        showHideArrow(popular_section, 1)
      }, 60)
    })
    arrowLeft[1].addEventListener("click", (e) => {
      e.preventDefault();
      popular_section.scrollLeft -= firstBoxWidth;
      showHideArrow(popular_section, 1)

    })
    // 
    arrowRight[2].addEventListener("click", (e) => {
      e.preventDefault();
      upcoming_section.scrollLeft += firstBoxWidth;
      setTimeout(() => {
        showHideArrow(upcoming_section, 2)
      }, 60)
    })
    arrowLeft[2].addEventListener("click", (e) => {
      e.preventDefault();
      upcoming_section.scrollLeft -= firstBoxWidth;
      showHideArrow(upcoming_section, 2)

    })


  },
  // Cette fonction récupere les films, et retourne le code html pour la page d'acceuil 
  render: async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    // Get all trending movies info
    showLoading();
    const response = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=688cd3e93675b6046cd154e9d6daf187', options);
    if (!response || !response.ok) {
      return `<div>Error in getting data</div>`
    }
    const movies = await response.json();
    const popularMovies = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=688cd3e93675b6046cd154e9d6daf187', options);
    const popularMoviesJson = await popularMovies.json();
    const upcoming = await fetch('https://api.themoviedb.org/3/movie/upcoming?year=2023&api_key=688cd3e93675b6046cd154e9d6daf187', options);
    const upcomingJson = await upcoming.json();
    const discover = await fetch('https://api.themoviedb.org/3/discover/movie?primary_release_year=2010&sort_by=vote_average.desc&page=1&api_key=688cd3e93675b6046cd154e9d6daf187', options);
    const discoverJson = await discover.json();
    const discover2 = await fetch('https://api.themoviedb.org/3/discover/movie?primary_release_year=2010&sort_by=vote_average.desc&page=32&api_key=688cd3e93675b6046cd154e9d6daf187', options);
    const discoverJson2 = await discover2.json();
    hideLoading();
    console.log("discover", discoverJson);






    return `

      
      <section id="trending" class="trending">
      <h2 class="main-title">Trending</h2>

      <div class="container"> 
      <i class="fa-solid fa-angle-left left" type="button"></i>

      ${movies.results.map(movie => {
      return `  
      <a class="box" href="/#/movie/${movie.id}">
      <img src="https://image.tmdb.org/t/p/w1280//${movie.backdrop_path}" alt="" />
  
      <div class="info">
      <h4>${movie.title ? movie.title : movie?.name}</h4>
        <span class="movie-date">${movie.release_date ? transformDate(movie.release_date).fulldate : transformDate(movie.first_air_date).fulldate}</span>
        <span class="rate">${movie.vote_average.toFixed(1)}</span>
      </div>
    </a>`
    }).join("")}
    <i class="fa-solid fa-angle-right arrowRightBtn right"></i>
    </div>

    </section>
    
    <section id="popular" class="trending">
    <h2 class="main-title">Popular</h2>

    <div class="container"> 
    <i class="fa-solid fa-angle-left left" type="button"></i>

    ${popularMoviesJson.results.reverse().map(movie => {
      return `  
    <a class="box" href="/#/movie/${movie.id}">
    <img src="https://image.tmdb.org/t/p/w1280//${movie.backdrop_path}" alt="" />

    <div class="info">
    <h4>${movie.title ? movie.title : movie?.name}</h4>
      <span class="movie-date">${movie.release_date ? transformDate(movie.release_date).fulldate : transformDate(movie.first_air_date).fulldate}</span>
      <span class="rate">${movie.vote_average.toFixed(1)}</span>
    </div>
  </a>`
    }).join("")}
  <i class="fa-solid fa-angle-right arrowRightBtn right" ></i>
  </div>

  </section>
  <section id="upcoming" class="trending">
  <h2 class="main-title">Upcoming</h2>

  <div class="container"> 
  <i class="fa-solid fa-angle-left left" type="button"></i>

  ${upcomingJson.results.reverse().map(movie => {
      return `  
  <a class="box" href="/#/movie/${movie.id}">
  <img src="https://image.tmdb.org/t/p/w1280//${movie.backdrop_path}" alt="" />

  <div class="info">
  <h4>${movie.title ? movie.title : movie?.name}</h4>
    <span class="movie-date">${movie.release_date ? transformDate(movie.release_date).fulldate : transformDate(movie.first_air_date).fulldate}</span>
    <span class="rate">${movie.vote_average.toFixed(1)}</span>
  </div>
</a>`
    }).join("")}
<i class="fa-solid fa-angle-right arrowRightBtn right" ></i>
</div>

</section>
    <section id="allmovies" class="allmovies ">
    <h2 class="main-title">All movies</h2>
    
    <div class="container"> 
  
    ${discoverJson.results.filter(movie => movie.backdrop_path != null).map(movie => {
      return ` 
    <a class="box" href="/#/movie/${movie.id}">
    <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.backdrop_path || movie.poster_path}" alt="" />
  
    <div class="info">
    <h4>${movie.title ? movie.title : movie?.name}</h4>
      <span class="movie-date">${movie.release_date ? transformDate(movie.release_date).fulldate : transformDate(movie.first_air_date).fulldate}</span>
      <span class="rate">${movie.vote_average.toFixed(1)}</span>
    </div>
  </a>`
    }).join("")}

    ${discoverJson2.results.filter(movie => movie.backdrop_path != null).map(movie => {
      return ` 
    <a class="box" href="/#/movie/${movie.id}">
    <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.backdrop_path || movie.poster_path}" alt="" />
  
    <div class="info">
    <h4>${movie.title ? movie.title : movie?.name}</h4>
      <span class="movie-date">${movie.release_date ? transformDate(movie.release_date).fulldate : transformDate(movie.first_air_date).fulldate}</span>
      <span class="rate">${movie.vote_average.toFixed(1)}</span>
    </div>
  </a>`
    }).join("")}
  </div>

    <a href="/#/movies" class="loadMore">Watch More</a>
    </section>
      
      `
  }
}

export default HomeScreen;



