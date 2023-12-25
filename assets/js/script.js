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
]

const articleRowEl= document.getElementById('articleRow');

printArticles(articles)

const articlesSaved =[]

const bookmarks = document.querySelectorAll('.fa-bookmark');

function clickToSaveArticle(){
bookmarks.forEach((bookmark, i) => 
bookmark.addEventListener('click', function(){
    this.classList.remove('fa-regular');
    this.classList.add('fa-solid');
    if(!articlesSaved.includes(articles[i])){
    articlesSaved.push(articles[i])
    }
    console.log(articlesSaved);
}))}
clickToSaveArticle();

const geo = articles.filter(article => article.tags.includes('geo'));
const travel = articles.filter(article => article.tags.includes('viaggi'));
const kitchen = articles.filter(article => article.tags.includes('cucina'));
const tech = articles.filter(article => article.tags.includes('tech'));
const art = articles.filter(article => article.tags.includes('arte'));



const selectTags = document.getElementById('select-tags');
selectTags.addEventListener('change', function(){
    if(selectTags.value == '3'){
        printArticles(art);
    } else if(selectTags.value == '4'){
        printArticles(travel);
    } else if(selectTags.value == '5'){
        printArticles(tech);
    } else if (selectTags.value == '6'){
        printArticles(geo);
    } else if(selectTags.value == '7'){
        printArticles(kitchen);
    } else if(selectTags.value == '2'){
        articleRowEl.innerHTML = '<h2 class="text-white">No news available.</h2>';
    } else {
        printArticles(articles);
    };

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
        `<div id="${article.id}" class="col mb-5">
            <div class="card rounded-0">
                <div class="card-body">
                    <div class="d-flex justify-content-between gap-3">
                        <h3 class="card-title">${article.title}</h3>
                        <i class="fa-regular fa-bookmark fa-xl pt-3"></i>
                    </div>
                    <h6 class="card-subtitle">Pubblicato da ${article.author}</h6>
                    <p class="card-text text-body-secondary">In data ${day+ '/' + (month < 10 ? '0' + month : month) + '/' + year}</p>
                    <p class="card-text">${article.content}</p>
                </div>
                <img src="./images/${article.image}" class="px-3" alt="${article.alt}">
                <div id="tags" class="p-3">
                ${article.tags.map(tag =>
                    `<span class="badge ${tag} p-2 me-2">${tag}</span>`
                ).join('')}
                </div>
            </div>
        </div>`;
    
        console.log(articleMarkUp);
    
        articleRowEl.insertAdjacentHTML('beforeend', articleMarkUp);
    })}