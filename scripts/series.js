import { apiKey,fetchContent,makeCards,makeTitle,search,enter,genreoptions } from "./helper.js";

var pageNumber=1

var api_url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${pageNumber}&api_key=${apiKey}`;

const seriesList=document.getElementById("movie-list");

const seeMore=document.getElementById("see-more")

const select=document.getElementById("genre")

const searchBTN =document.getElementById("searchbtn")

const genreScroll=document.getElementById("genre-scroll")

enter(searchBTN)

// genreoptions(genreScroll)

searchBTN.onclick=function(){
    var search_input=document.getElementById("input").value
    console.log(search_input);
    
    search(search_input,true,seriesList,"tv")
}

fetchContent(api_url,true).then(movies=>{
    makeCards(movies,seriesList,"tv")
})
seeMore.onclick=function(){
    pageNumber++;
    api_url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${pageNumber}&api_key=${apiKey}`;
    fetchContent(api_url,true).then(movies=>{
        makeCards(movies,seriesList,"tv")
    })
    console.log(pageNumber);
}
