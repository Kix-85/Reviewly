import { apiKey,fetchContent,makeTitle } from "./helper.js";
const urlparams=new URLSearchParams(window.location.search)
const id=urlparams.get("id")

const apiUrlDetails=`https://api.themoviedb.org/3/movie/939243?language=en-US&api_key=9813ce01a72ca1bd2ae25f091898b1c7`
fetchDetails(apiUrlDetails).then(data=>{
    const content=document.getElementById("content")
    console.log(data);
    content.innerHTML=`
        <h1>${data.title}</h1>
        <p>${data.overview || "No Description Available"}</p>
        <p>Release Date: ${data.release_date || "Unknown"}</p>
        <p>Runtime: ${data.runtime} minutes</p>
        <p>Genres: ${data.genres.map(genre => genre.name).join(", ")}</p>
        <p>Rating: ${data.vote_average} (${data.vote_count} votes)</p>
    `
})