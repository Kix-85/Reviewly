const apiKey = '9813ce01a72ca1bd2ae25f091898b1c7';

const title=document.getElementById("title");

const tagLine=document.getElementById("tagline");

const overview=document.getElementById("overview");

const poster=document.getElementById("poster")

const main=document.getElementById("main");

const genre=document.getElementById("genre")

const params=new URLSearchParams(window.location.search);

const api_url=`https://api.themoviedb.org/3/${params.get("type")}/${params.get("id")}?language=en-US&api_key=${apiKey}`
console.log(api_url);
console.log(params);



async function fetchContent() {
    const rawContent= await fetch(api_url);
    const content=await rawContent.json();
    console.log(content);
    return content;
}
function makeTitle(data,type){
    if(type=="movie")
        return data.title
    else
        return data.name
}
fetchContent().then(contents=>{
    poster.setAttribute("src","https://image.tmdb.org/t/p/w500"+contents.poster_path)
    main.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${contents.backdrop_path})`
    title.innerText=makeTitle(contents,params.get("type"));
    console.log(params.get("type"));
    
    tagLine.innerText=contents.tagline;
    overview.innerText=contents.overview;
    
    // var x="Genre:"  
    // console.log(contents.genres );
    
    // contents.genres.forEach(genre => {
    //     x+=" "+genre.name
    // });
    // genre.innerHTML=`
    //     <p>${x}</p>
    // `
})