import { parseRequestUrl, transformDate } from "../utils";

const MovieScreen = {
    render: async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        let movieId = parseRequestUrl()?.id;
        console.log(parseRequestUrl())
        // Get movie's info by id
        let api = `https://api.themoviedb.org/3/movie/${movieId}?api_key=688cd3e93675b6046cd154e9d6daf187&language=en-US`
        const response = await fetch(api, options);
        let movie = await response.json();
        let genreListe = movie.genres.map(genre => genre.name).join(", ")
        // get movie's keywords
        let movieKeywords = await fetch(` https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=688cd3e93675b6046cd154e9d6daf187&language=en-US`, options)
        let movieKeywordsJson = await movieKeywords.json();

        // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
        // get trailer video
        const video = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=688cd3e93675b6046cd154e9d6daf187&language=en-US`, options);
        let videoJson = await video.json();
        console.log("video", videoJson.results)
        let trailerVideo = videoJson?.results.filter(video => video.name.includes("Trailer"));
        console.log(trailerVideo)
        // get recommendations
        const recommendations = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=688cd3e93675b6046cd154e9d6daf187&language=en-US`, options)
        const recommendationsJson = await recommendations.json();
        console.log(recommendationsJson);
        console.log(movie);

        return `

        <section class="container  movie"> 
            <div class="backdrops">
            <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.backdrop_path || movie.poster_path}"  />
            </div>
            <div class="mainContent">
            <div class="description">
                <h2>${movie.original_title} <span class="dateh">(${movie.release_date ? transformDate(movie.release_date).year : transformDate(movie.first_air_date)})</span></h2> 
                    <ul class="facts">
                    <li> ${movie.release_date ? transformDate(movie.release_date).fulldate : transformDate(movie.first_air_date).fulldate}</li>
                    <li>
                    ${genreListe
            }
            </li >
        </ul >
          <ul class="movieAction">
            <li>            
                <span">8.2</span>
            </li>
            <li>User Score</li>
            <li><i class="fas fa-list"></i></li>
            <li><i class="fab fa-facebook-f"></i></li>
            <li><i class="fab fa-twitter"></i></li
          </ul>
            </div >
            <div class="headerInfo">
                <h3 class="tagline">${movie.tagline}</h3>
                <h3 class="overview">Overview</h3>
                <p>
                ${movie.overview}
                </p>
                <ul class="release_info">
                    <li>
                        <p>Status</p>
                        <p>${movie.status}</p>
                    </li>
                    <li>
                        <p>Original Language</p>
                        <p>${movie?.spoken_languages[0]?.name}</p>
                    </li>
                    <li>
                        <p>Budget</p>
                        <p>$ ${movie?.budget}</p>
                    </li>
                    <li>
                    <p>Revenue</p>
                    <p>$ ${movie?.revenue}</p>
                </li>
         
                </ul>
                <div>
                <p>Keywords</p>
                <div class="keywords">
                ${movieKeywordsJson.keywords.map(key => {
                return `<p class="keyword">${key.name}</p>`
            }).join(" ")
            }
                </div>
                </div>
            </div>
            </div>
      
            </section > 
            <section  class="container trailer">
                <h2>Official trailer</h2>
                <div class="video">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerVideo[0]?.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div> 
            </section>

            <section class="recommendation container">
            <div class="recHeader">
            <h2>Recommendations</h2>
      
            </div>
            <div class="wrapper">

                ${recommendationsJson?.results.map(rec => {
                return `        
                <div class="contentBox">        
                    <a class="item" href="/#/movie/${rec.id}" >
                    <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2//${rec.backdrop_path || rec.poster_path}" alt="" />
                
                    <div class="info">
                    <h4>${rec.title ? rec.title : rec?.name}</h4>
                    <span class="rate">
                    ${movie.vote_average.toFixed(1)}
                    </span>
                    <i class="fa-regular fa-circle-play icon"></i>
                    </div>
                 </a>
       

                </div>
                                
                                  
                                  `
            }).join(" ")
            }
            </div>

               
                
            </section>
            
            
            
            `;
    },
    after_render: async () => {

    }
}
export default MovieScreen;