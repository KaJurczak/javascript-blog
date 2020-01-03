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
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  //optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
  //optAuthorListSelector = '.list .authors';

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


function CalculateTagsParams(allTags){

  console.log('function CalculateTagsParams run');

  /* Create object with two keys - max and min value*/
  const params = {max: 0, min: 999999};

  /*START LOOP: for each tags */
  for (let tag in allTags){

    console.log('Value of tags ' + tag + ' in allTags is:' + allTags[tag]);

    /*find the most common tags*/
    params.max = Math.max(allTags[tag], params.max);

    console.log('params.max is:', params.max);

    /*find the rarest tags*/
    params.min = Math.min(allTags[tag], params.min);

    console.log('params.min is:', params.min);

    /*CLOSE LOOP: for each tags */
  }

  /*return value of params */
  console.log('params is:', params);

  return params;

}


function calculateTagClass(count, params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  console.log('classNumber:', classNumber);

  return classNumber;

}


function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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

      console.log('tagArray to: ', tagArray);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tagArray + '">' + tagArray + '</a></li>'; //2020.01.01 dodane tag-

      console.log('linkHTML to: ', linkHTML);

      /* add generated code to html variable */
      html = html + ' ' + linkHTML;

      console.log('html to: ', html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!Object.prototype.hasOwnProperty.call(allTags, tagArray)){  //??????? old version: if(!allTags.hasOwnProperty(tagArray)){

        /* [NEW] add tag to allTags object */
        allTags[tagArray] = 1;
      }
      else {
        allTags[tagArray]++;
      }
      console.log('let allTags is: ', allTags);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    articleTag.innerHTML = html;

    console.log('articleTag to:', articleTag);

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  console.log('tagList to: ', tagList);

  /* [NEW] Calculeate number of tags*/
  const tagsParams = CalculateTagsParams(allTags);

  console.log('const tagsParams is: ', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tagArray in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '  ' + '<a class="' + optCloudClassPrefix + calculateTagClass(allTags[tagArray], tagsParams) + '" href="#tag-' + tagArray + '">' + tagArray + '</a>' + '  ';

    console.log('allTagsHTML to: ', allTagsHTML);

  /* [NEW] END LOOP: for each tag in allTags: */
  }

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
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


function CalculateAuthorsParams(allAuthors){

  console.log('function CalculateAuthorsParams run');

  /* Create object with two keys - max and min value*/
  const params = {max: 0, min: 999999};

  /*START LOOP: for each authors */
  for (let author in allAuthors){

    console.log('Value of authors ' + author + ' in allAuthors is:' + allAuthors[author]);

    /*find the most common authors*/
    params.max = Math.max(allAuthors[author], params.max);

    console.log('params.max is:', params.max);

    /*find the rarest authors*/
    params.min = Math.min(allAuthors[author], params.min);

    console.log('params.min is:', params.min);

    /*CLOSE LOOP: for each authors */
  }

  /*return value of params */
  console.log('params is:', params);

  return params;

}


function generateAuthors(){

  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find authors wrapper */
    const articleAuthor = article.querySelector(optArticleAuthorSelector);

    console.log('stała articleAuthor to: ', articleAuthor);

    /* get author from data-author attribute */
    const articleNewAuthor = article.getAttribute('data-author');

    console.log('stała articleNewAuthor to:', articleNewAuthor);

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleNewAuthor + '">' + 'by ' + articleNewAuthor + '</a>';

    console.log('stała linkHTML to: ', linkHTML);

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!Object.prototype.hasOwnProperty.call(allAuthors, articleNewAuthor)){  //??????? old version: if(!allTags.hasOwnProperty(tagArray)){

      /* [NEW] add author to allAuthors object */
      allAuthors[articleNewAuthor] = 1;
    }
    else {
      allAuthors[articleNewAuthor]++;
    }
    console.log('let allAuthors is: ', allAuthors);

    /* insert HTML of the link into the author wrapper */
    articleAuthor.innerHTML = linkHTML;

    console.log('articleAuthor to:', articleAuthor);

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector('.list.authors');

  console.log('authorList to: ', authorList);

  /* [NEW] Calculeate number of authors*/
  const authorsParams = CalculateAuthorsParams(allAuthors);

  console.log('const authorsParams is: ', authorsParams);

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let allAuthor in allAuthors) {

    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li>' + '<a href="#author-' + allAuthor + '">' + allAuthor + '</a>'  + ' ( ' + allAuthors[allAuthor] + ' ) ' + '</li>';

    console.log('allAuthorsHTML to: ', allAuthorsHTML);

  /* [NEW] END LOOP: for each author in allAuthors: */
  }

  /* [NEW] add html from allAuthorsHTML to authorList */
  console.log('poza pętlą allAuthorsHTML:', allAuthorsHTML);

  authorList.innerHTML = allAuthorsHTML;

  console.log('authorList:', authorList);

}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  console.log('funkcja authorClickHandler działa?');

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('stała href to: ', href);

  /* make a new constant "author" and extract name from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('stała author to: ', author);

  /* find all author links with class active */
  const authorLinksActive = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('stała authorLinksActive to:', authorLinksActive);

  /* START LOOP: for each active author link */
  for (let authorLinkActive of authorLinksActive){
    console.log('stała authorLinkActive to:', authorLinkActive);

    /* remove class active */
    authorLinkActive.classList.remove('active');
    console.log('stała authorLinkActive to:', authorLinkActive);

  /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('stała authorLinks to:', authorLinks);

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks){
    console.log('zmienna authorLink to: ', authorLink);

    /* add class active */
    authorLink.classList.add('active');
    console.log('zmienna authorLink to: ', authorLink);

  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  console.log('funkcja addClickListenersToAuthors działa?');

  /* find all links to authors */
  const linksToAuthor = document.querySelectorAll('a[href^="#author-"]');
  console.log('stała linksToAuthor to: ', linksToAuthor);

  /* START LOOP: for each link */
  for (let linkToAuthor of linksToAuthor){

    /* add authorClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);
    console.log('słuchaj chłopino, on nie słucha');

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
