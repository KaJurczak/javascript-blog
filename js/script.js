'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */

{
const titleClickHandler = function(event){
  event.preventDefault(); //nie zmienia adresu strony przy klikaniu w linki
  const clickedElement = this; //NIE ROZUMIEM CO TO??!!
  console.log('Link was clicked!');
   //console.log(event);

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

   /* add class 'active' to the clicked link */
   console.log('clickedElement:', clickedElement);

   clickedElement.classList.add('active');

   /* remove class 'active' from all articles */
   const activeArticles = document.querySelectorAll('.post.active');

   for(let activeArticle of activeArticles){
     activeArticle.classList.remove('active');
   }

   /* get 'href' attribute from the clicked link */
   const articleSelector = clickedElement.getAttribute('href')

   console.log(articleSelector);

   /* find the correct article using the selector (value of 'href' attribute) */
   const targetArticle = document.querySelector(articleSelector)

   console.log(targetArticle);

   /* add class 'active' to the correct article */
   targetArticle.classList.add('active');

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages(){
	titleList.innerHTML = '';
}
  clearMessages();

  /* for each article */
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    console.log(articleId);

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML

    console.log(html);

  }

  titleList.innerHTML = html;

}

generateTitleLinks();
