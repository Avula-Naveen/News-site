

const API_KEY="4296e6aa8f9d4681aaac5715f244ae89";

const url="https://newsapi.org/v2/everything?q=";
 window.addEventListener("load",()=>fetchNews("India"));

 async function fetchNews(query){
   const res= await fetch(`${url}${query}&apiKey=${API_KEY}`)
   const data=await res.json()
  //  console.log(data.articles);
   bindData(data.articles)
   // For latest News 
   latestData(data.articles)
 }

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card')



    cardsContainer.innerHTML="";

  

    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
       

        fillDataInCard(cardClone,article)
     

        cardsContainer.appendChild(cardClone)
    })

}

function latestData(articles){
 const totalArticles=articles.slice(0,11);
 console.log(totalArticles);
 
 const latestContainer=document.getElementById('latest-news');
    const latestNewsTemplate=document.getElementById('latest-news-card')

    latestContainer.innerHTML="";
    totalArticles.forEach((article)=>{
      if(!article.urlToImage) return;
      const newsClone=latestNewsTemplate.content.cloneNode(true);
      fillDataInLatest(newsClone,article)
      latestContainer.appendChild(newsClone)
    })
}








function fillDataInCard(cardClone,article){
  const newsImg=cardClone.querySelector('#news-img');
  const newsTitle=cardClone.querySelector('#news-title');
  const newsSource=cardClone.querySelector('#news-source');
  const newsDescription=cardClone.querySelector('#news-desc');

  newsImg.src=article.urlToImage;
  newsTitle.innerHTML=article.title;
  newsDescription.innerHTML=article.description;

  const date=new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta"
  });

  newsSource.innerHTML=`${article.source.name} . ${date}`;


  cardClone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
  })


  const searchButton=document.getElementById("search-button");
  const searchText=document.getElementById("search-text");
  searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query)
  })

}


function fillDataInLatest(newsClone,article){

  const h2cre=document.createElement("h2");
  h2cre.innerText="Latest News";

  const newsLatestTitle=newsClone.querySelector('#latest-news-title');
  const newsLatestSource=newsClone.querySelector('#latest-news-source');

  newsLatestTitle.innerHTML=article.title;

  const date=new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta"
  });

  newsLatestSource.innerHTML=`${article.source.name} . ${date}`;

  newsClone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
  })

}