import { apiKey,fetchContent,makeCards,makeTitle,search,enter,genreoptions } from "./helper.js";

var pageNumber=1

var api_url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}&api_key=${apiKey}`;

const movieList=document.getElementById("movie-list");

const seeMore=document.getElementById("see-more")

const select=document.getElementById("genre")

const searchBTN =document.getElementById("searchbtn")


enter(searchBTN)

genreoptions(select)

searchBTN.onclick=function(){
    var search_input=document.getElementById("input").value
    console.log(search_input);
    
    search(search_input,true,movieList,"movie")
}

fetchContent(api_url,true).then(movies=>{
    makeCards(movies,movieList,"movie")
})

seeMore.onclick=function(){
    pageNumber++;
    api_url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}&api_key=${apiKey}`;
    fetchContent(api_url,true).then(movies=>{
        makeCards(movies,movieList,"movie")
    })
    console.log(pageNumber);
}

