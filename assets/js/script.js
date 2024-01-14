//declare articles object
const articles = [
    {
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.',
        tags: ['geo', 'tech'],
        author: 'Diana Rossi',
        published: '2023-02-11',
        image: 'rubber-duck.jpg',
        alt: 'big yellow rubber duck',
        id: 'duck'
    },
    {
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: "un viaggio nelle profondità dell'oceano alla scoperta di creature misteriose e inesplorate",
        tags: ['viaggi', 'geo'],
        author: 'Fabio Mari',
        published: '2023-03-14',
        image: 'deep-sea.jpg',
        alt: 'deep sea',
        id: 'sea'       
    },
    {
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: ['cucina'],
        author: 'Marta Bianchi',
        published: '2023-04-20',
        image: 'kitchen-food.jpg',
        alt: 'food',
        id: 'food'
    },
    {
        title: 'Arte moderna: oltre i confini convenzionali',
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
        tags: ['arte', 'tech'],
        author: 'Gabriele Neri',
        published: '2023-05-29',
        image: 'modern-art.jpg',
        alt: 'street art',
        id: 'art'
    },
];

//declare the articles wrapper
const articleRowEl= document.getElementById('articleRow');

//call function for print articles
printArticles(articles);

//declare support array
const savedArticlesId = [];

//add a listener to the dom with target the icon tag
document.addEventListener('click', e => {
    const target = e.target;
    console.log(e);
    const articleId = target.dataset.id;
    //verify if the target match the bookmark
    if(target.matches("i")){
        target.classList.toggle('fa-solid');
        target.classList.toggle('fa-regular');
        if(!savedArticlesId.includes(articleId)){
            savedArticlesId.push(articleId);
        }else{
            //delete the article if included
            const index = savedArticlesId.indexOf(articleId);
            savedArticlesId.splice(index, 1);
            refresh();
        }
    }
});   

//declare the select for the tags
const selectTags = document.getElementById('select-tags');

//popolate the select's options
popolateSelectOption();

//listener for filtering the articles
selectTags.addEventListener('change', function(){
    refresh();
});

//declare the checkbox
const savedCheckBox = document.getElementById('savedCheck');

//listener for filtering the saved articles
savedCheckBox.addEventListener('change', () => {
    refresh();
});

/**
 * ## Stampa oggetti sul DOM
 * @param {Array} arr array di oggetti da stampare sul DOM
 */
function printArticles(arr){
    articleRowEl.innerHTML = '';
    arr.forEach(article => {
    
        //declare the article stucture
        const articleMarkUp = 
        `<div class="col mb-5">
            <div id="${article.id}" class="card rounded-0">
                <div class="card-body">
                    <div class="d-flex justify-content-between gap-3">
                        <h3 class="card-title">${article.title}</h3>
                        <i class="fa-regular fa-bookmark fa-xl pt-3" data-id="${article.id}"></i>
                    </div>
                    <h6 class="card-subtitle">Pubblicato da ${article.author}</h6>
                    <p class="card-text text-body-secondary">In data ${article.published.split('-').reverse().join('/')}</p>
                    <p class="card-text">${article.content}</p>
                </div>
                <img src="./assets/images/${article.image}" class="px-3" alt="${article.alt}">
                <div class="p-3">
                ${article.tags.map(tag =>
                    `<span class="badge ${tag} p-2 me-2">${tag}</span>`
                ).join('')}
                </div>
            </div>
        </div>`;
    
        console.log(articleMarkUp);
        //print the articles in the dom              
        articleRowEl.insertAdjacentHTML('beforeend', articleMarkUp);
    })
};

/**
 * ## popolate the select's options
 */
function popolateSelectOption(){
    let tagsList = [];
    articles.forEach(article => {
        article.tags.forEach(tag => {
            if(!tagsList.includes(tag)){
                tagsList.push(tag)
            };
        });
    });
    console.log(tagsList);
    tagsList.forEach(tag=> {
        const optionEl = document.createElement('option');
        optionEl.value = tag;
        optionEl.innerHTML = tag;
        selectTags.insertAdjacentElement('beforeend', optionEl);
    });
};

//declare a support array
let savedArticlesList = [];

/**
 * ## Print the correct bookmark
 */
function savedArticlesBookMark(){
    savedArticlesList = articles.filter(article => savedArticlesId.includes(article.id));
    savedArticlesList.forEach(article => {
        const bookmarks = document.querySelectorAll('.fa-bookmark');
        bookmarks.forEach(bookmark => {
            if(bookmark.dataset.id == article.id){
                bookmark.classList.remove('fa-regular');
                bookmark.classList.add('fa-solid');
            };
        });
    });
};

/**
 * ## Print only saved articles
 */
function checked(){
if(savedCheckBox.checked){
    const selectedArticles = filteredArticles();
    const filteredSavedArticles = savedArticlesList.filter(article => selectedArticles.includes(article));
    printArticles(filteredSavedArticles);
    savedArticlesBookMark();
    elementsNotFound();
}};

/**
 * ## Print a message if the elements are not found
 */
function elementsNotFound(){
    // if empty print not founds
    if(articleRowEl.innerHTML == ""){
        articleRowEl.innerHTML = '<h2 class="text-white">No news available.</h2>';
    };
};

/**
 * ## Refresh all article page
 */
function refresh(){
    const position = filteredArticles();
    printArticles(position);
    savedArticlesBookMark();
    checked();
    elementsNotFound();
};

/**
 * 
 * @returns the filtered articles by the select
 */
function filteredArticles(){
    let position = [];
    if(selectTags.value === 'articles'){
        position = articles
    }else{
    position = articles.filter(article => article.tags.includes(selectTags.value));
    }
    return position;
};