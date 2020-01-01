'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */


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
  const articleSelector = clickedElement.getAttribute('href');


  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

};



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  function clearMessages(){
    titleList.innerHTML = '';
  }
  clearMessages();

  /* for each article */
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('stała articles to: ', articles);

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
    html = html + linkHTML;

    console.log(html);

  }

  titleList.innerHTML = html;


  const links = document.querySelectorAll('.titles a');

  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();


function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find tags wrapper */
    const articleTag = article.querySelector(optArticleTagsSelector);

    console.log(articleTag);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleNewTags = article.getAttribute('data-tags');

    console.log(articleNewTags);

    /* split tags into array */
    const tagsArray = articleNewTags.split(' ');

    console.log('tagsArray is:', tagsArray);

    /* START LOOP: for each tag */
    for(let tagArray of tagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tagArray + '">' + tagArray + '</a></li>'; //2020.01.01 dodane tag-

      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + ' ' + linkHTML;

      console.log(linkHTML);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    articleTag.innerHTML = html;

    console.log('articleTag to:', articleTag);

  /* END LOOP: for every article: */
  }
}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  console.log('funkcja tagClickHandler działa?');

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('stała href to: ', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('stała tag to: ', tag);

  /* find all tag links with class active */
  const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('stała tagLinksActive to:', tagLinksActive);

  /* START LOOP: for each active tag link */
  for (let tagLinkActive of tagLinksActive){
    console.log('stała tagLinkActive to:', tagLinkActive);

    /* remove class active */
    tagLinkActive.classList.remove('active');
    console.log('stała tagLinkActive to:', tagLinkActive);

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('stała tagLinks to:', tagLinks);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    console.log('zmienna tagLink to: ', tagLink);

    /* add class active */
    tagLink.classList.add('active');
    console.log('zmienna tagLink to: ', tagLink);

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  console.log('funkcja addClickListenersToTags działa?');

  /* find all links to tags */
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log('stała linksToTags to: ', linksToTags);

  /* START LOOP: for each link */
  for (let linkToTags of linksToTags){

    /* add tagClickHandler as event listener for that link */
    linkToTags.addEventListener('click', tagClickHandler);
    console.log('słuchaj dzieweczko, ona nie słucha');

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();
