export const apiKey = '9813ce01a72ca1bd2ae25f091898b1c7';
export var s;
export function search(query,results,contentlist,type){
    const q=query.split(" ")
    s=q[0];
    if(q.length>1){
        for(var i=1; i<q.length;i++){
            s+="%20"
            s+= q[i]
        }
    }
    console.log(s)
    const search_URL=`https://api.themoviedb.org/3/search/${type}?query=${s}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
    contentlist.innerHTML=``
    fetchContent(search_URL,results).then(series=>{
            makeCards(series,contentlist,type)
        })
}

export async function genreoptions(select){
    fetchContent(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`,false).then(genres=>{
        genres.genres.forEach(genre=>{
            select.innerHTML+=`
                <!-- <option value="${genre.id}">${genre.name}</option> -->
                <button type="button">${genre.name}</button>
            `
        })
    })
}

export function enter(button){
    document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    var search_input=document.getElementById("input").value
    console.log(search_input);
    button.click();
})};


export async function fetchContent(apiUrl,results){
    const fetchedContent = await fetch(apiUrl);
    if(!fetchedContent.ok){
        console.log("Error Error!!");
        return;
    }
    const jsonContent = await fetchedContent.json();
    console.log(jsonContent);
    return results? jsonContent.results : jsonContent;
}
export function makeTitle(data,type){
    if(type=="movie")
        return data.title
    else
        return data.name
}

function shortenOverView(overview) {
    var x=overview.substr(0,120);
    x+="..."
    return x 
}
export function makeCards(data,list,type){
    data.forEach(content => {
        list.innerHTML+=`
            <div class="card-holder"
        style="box-shadow: rgba(255, 255, 255, 0.1) 0px 10px 10px -10px; border-radius:10px; position: relative;">
        <div class="card h-100 d-flex">
          <img src="https://image.tmdb.org/t/p/w500${content.poster_path}" class="card-img-top"
            alt="${makeTitle(content,type)}">
          <a href="details.html?id=${content.id}&type=${type}">
            <div class="card-listener" style="position: absolute; z-index: 100; height: 100%; width: 100%;">
                <a href="details.html?id=${content.id}&type=${type}" class="card-link">
                    <div class="card-content">
                        <h5 class="card-title">${makeTitle(content,type)}</h5>
                        <p class="card-text">${shortenOverView(content.overview)}</p>
                    </div>
                </a>
            </div>
          </a>
        </div>
      </div>
        `;

    })
}
