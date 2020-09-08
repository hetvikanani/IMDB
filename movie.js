const id = window.location.search.split("=");
const apikey = "3612b02f98cda3c13e89bc986d7052b1";
const body = document.querySelector("body");

const tmdb = async () => {
  const responce = await fetch(
    `https://api.themoviedb.org/3/movie/${id[1]}?api_key=${apikey}&append_to_response=videos`
  );
  const data = await responce.json();
  console.log(data);
  document.title = data.title;
  const div = document.createElement("div");

  let x = "";
  data.genres.forEach((data) => {
    x = x + data.name + "   ";
  });
  let utube = "";
  if (data.videos.results.length !== 0) {
    utube = data.videos.results[0].key;
  } else {
    utube = null;
  }
  const hr = Math.floor(data.runtime / 60);
  const minit = Math.floor((data.runtime / 60 - hr) * 60);
  const movietime = `${hr}h ${minit}m`;

  div.innerHTML = `
  <div class="page_wrap movie_wrap">
  <main id="main" class="smaller subtle show_search_false">
  <section class="inner_content movie_content backdrop poster">
                  <div class="header large border first">
                      <div class="keyboard_s custom_bg">
                          <div class="single_column">
                              <section id="original_header" class="images inner">
                                  <div class="poster_wrapper true">
                                      <div class="poster">
                                          <div class="image_content backdrop">
                                              <img class="poster lazyload" src="https://image.tmdb.org/t/p/w300/${
                                                data.poster_path
                                              }" ></div>
                                          </div>
                                          </div>
                                          <div class="header_poster_wrapper true">
                                              <section class="header poster">
                                                  <div class="title ott_true" dir="auto">
                                                      <h2 class="6">
                                                          <a href="">${
                                                            data.title
                                                          }</a>
                                                          <span class="tag release_date">${data.release_date.substring(
                                                            0,
                                                            4
                                                          )}</span>
                                                      </h2>
                                                      <div class="facts">
                                                          <span class="certification">${x}</span>
                                                          <span class="release"> ${
                                                            data.release_date
                                                          }</span>
                                                          <span class="runtime">${movietime}</span>
                                                      </div>
                                                  </div>
                                                 
                                                  <ul class="auto actions">
                                                      <li class="chart">
                                                          <div class="consensus details">
                                                              <div class="outer_ring">
                                                                  <div class="user_score_chart" >
                                                                      <div class="percent">
                                                                          <span class="icon icon-r${Math.floor(
                                                                            data.popularity *
                                                                              10
                                                                          )}"></span>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div class="text">User<br>Score</div>
                                                      </li>
                                                      <li class="video none">
                                                          <a target='_'class="no_click play_trailer" href="https://www.youtube.com/watch?v=${utube}" ><span class="glyphicons_v2 play invert svg"></span>
                                                              Play Trailer</a>
                                                      </li>
                                                  </ul>
                                                  <iframe width="400" height="200" src="https://www.youtube.com/embed/${utube}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                  <div class="header_info">
                                                      <h3 class="tagline" dir="auto">Their quest begineth.</h3>
                                                      <h3 dir="auto">Overview</h3>
                                                      <div class="overview" dir="auto">
                                                          <p>${
                                                            data.overview
                                                          }</p>
                                                      </div>
                                                  </div>
                                              </section>
                                          </div>
                              </section>
                          </div>
                      </div>
                  </div>
                  
                  `;
  body.append(div);
  const main = document.querySelector(".inner_content");
  main.style.backgroundImage =
    "url('https://i.picsum.photos/id/579/200/300.jpg')";
};

tmdb();
