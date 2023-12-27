//declare articles object
const articles = [
    {
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.',
        tags: ['geo', 'tech'],
        author: 'Diana Rossi',
        published: new Date('2023-02-11'),
        image: 'rubber-duck.jpg',
        alt: 'big yellow rubber duck',
        id: 'duck'
    },
    {
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: "un viaggio nelle profondità dell'oceano alla scoperta di creature misteriose e inesplorate",
        tags: ['viaggi', 'geo'],
        author: 'Fabio Mari',
        published: new Date('2023-03-14'),
        image: 'deep-sea.jpg',
        alt: 'deep sea',
        id: 'sea'       
    },
    {
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: ['cucina'],
        author: 'Marta Bianchi',
        published: new Date('2023-04-20'),
        image: 'kitchen-food.jpg',
        alt: 'food',
        id: 'food'
    },
    {
        title: 'Arte moderna: oltre i confini convenzionali',
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
        tags: ['arte', 'tech'],
        author: 'Gabriele Neri',
        published: new Date('2023-05-29'),
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
const savedArticles = [];

//add a listener to the dom with target the icon tag
document.addEventListener('click', e => {
    const target = e.target;
    console.log(e);
    const articleId = target.dataset.id;
    if(target.matches("i")){
        target.classList.toggle('fa-solid');
        target.classList.toggle('fa-regular');
        articles.forEach(article => {
            if(article.id === articleId){
                if(!savedArticles.includes(article)){
                    console.log(article.id, articleId);
                    savedArticles.push(article);
                }else{
                    const index = savedArticles.indexOf(article);
                    savedArticles.splice(index, 1);
                    refresh();
                }
            }
        })   
    }
});

//devide the articles for tags
const geo = articles.filter(article => article.tags.includes('geo'));
const travel = articles.filter(article => article.tags.includes('viaggi'));
const kitchen = articles.filter(article => article.tags.includes('cucina'));
const tech = articles.filter(article => article.tags.includes('tech'));
const art = articles.filter(article => article.tags.includes('arte'));

//declare the select for the tags
const selectTags = document.getElementById('select-tags');

//listener for filtering the articles
selectTags.addEventListener('change', function(){
    if(selectTags.value != 'politics'){
        refresh();
    }else {
        articleRowEl.innerHTML = '<h2 class="text-white">No news available.</h2>';
    }
});

//declare the checkbox
const savedCheckBox = document.getElementById('savedCheck');

savedCheckBox.addEventListener('change', () => {
    refresh();
});

/**
 * ## Stampa oggetti sul DOM
 * @param {Array} articles array di oggetti da stampare sul DOM
 */
function printArticles(articles){
    articleRowEl.innerHTML = '';
    articles.forEach(article => {
    
        const day = article.published.getDate();
        const month = (article.published.getMonth()+1);
        const year = article.published.getFullYear();
    
        const articleMarkUp = 
        `<div class="col mb-5">
            <div id="${article.id}" class="card rounded-0">
                <div class="card-body">
                    <div class="d-flex justify-content-between gap-3">
                        <h3 class="card-title">${article.title}</h3>
                        <i class="fa-regular fa-bookmark fa-xl pt-3" data-id="${article.id}"></i>
                    </div>
                    <h6 class="card-subtitle">Pubblicato da ${article.author}</h6>
                    <p class="card-text text-body-secondary">In data ${day+ '/' + (month < 10 ? '0' + month : month) + '/' + year}</p>
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
    
        articleRowEl.insertAdjacentHTML('beforeend', articleMarkUp);
    })
}

//declare a support array
let list = [];

/**
 * ## Print only saved articles
 */
function checked(){
if(savedCheckBox.checked){
    printArticles(list);
    savedArticlesBookMark(list);
    if(articleRowEl.innerHTML == ''){
        articleRowEl.innerHTML = '<h2 class="text-white">No news available.</h2>';
    };
}}

/**
 * ## Print the correct bookmark
 * @param {Array} el list to verify 
 */
function savedArticlesBookMark(el){
    list = savedArticles.filter(article => el.includes(article));
    list.forEach(article => {
        const bookmarks = document.querySelectorAll('.fa-bookmark');
        bookmarks.forEach(bookmark => {
            if(bookmark.dataset.id == article.id){
                bookmark.classList.remove('fa-regular');
                bookmark.classList.add('fa-solid');
            }
        })
    })
}

/**
 * ## Refresh all page
 */
function refresh(){
    let position;
    if(selectTags.value == 'articles'){
        position = articles;
    }else if(selectTags.value == 'art'){
       position = art;
    }else if(selectTags.value == 'kitchen'){
        position = kitchen;
    }else if(selectTags.value == 'geo'){
        position = geo;
    }else if(selectTags.value == 'tech'){
        position = tech;
    }else if(selectTags.value == 'travel'){
        position = travel;
    }
    printArticles(position);
    savedArticlesBookMark(position);
    checked();
}