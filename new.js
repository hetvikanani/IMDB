const apikey = "3612b02f98cda3c13e89bc986d7052b1";
const accestoken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjEyYjAyZjk4Y2RhM2MxM2U4OWJjOTg2ZDcwNTJiMSIsInN1YiI6IjVlZGUxMjY0ZjE3NTljMDAyMGQyZmU1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.POzmwZBVZTEHD5Z3URgQkQJu6VTxoj7mxzzkc4MecoM";
const input = document.querySelector("#input");
const btn = document.querySelector("#searchbtn");
const movies = document.querySelector(".movies");

const tmdb = async () => {
  movies.innerHTML = "";
  const responce = await fetch(
    ` https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${input.value}`
  );
  //   const responce = await fetch(
  //     `https://api.themoviedb.org/3/movie/590403?api_key=${apikey}&append_to_response=videos&query=${input.value}`
  //   );
  const data = await responce.json();
  console.log(data);
  data.results.forEach((onemovie) => {
    let movie = document.createElement("div");
    movie.classList.add("movie");
    console.log(onemovie.poster_path);
    let path = "";
    if (onemovie.poster_path === null) {
      path = "https://picsum.photos/seed/picsum/200/300";
    } else {
      path = "https://image.tmdb.org/t/p/w500/" + onemovie.poster_path;
    }
    movie.innerHTML = `
    <div class="movie">
        <a href="movieinfo.html?q=${onemovie.id}">
       <img src="${path}" />
       </a>
        <div class="movieinfo">
          <h2>${onemovie.title}</h2>
          <span>${getmonth(onemovie.release_date)} </span>
        </div>
    </div>`;
    movies.append(movie);
  });
};
btn.addEventListener("click", tmdb);
input.addEventListener("keypress", tmdb);

const getmonth = (releasedate) => {
  const mlist = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(releasedate).getMonth();
  return (
    mlist[date] +
    " " +
    releasedate.substring(8, releasedate.lenght) +
    ", " +
    releasedate.substring(0, 4)
  );
};
