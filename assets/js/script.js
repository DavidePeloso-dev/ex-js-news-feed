const articles = [
    {
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.',
        tags: ['geo', 'tech'],
        author: 'Diana Rossi',
        published: new Date('2023-02-11'),
        image: 'rubber-duck.jpg',
        alt: 'big yellow rubber duck'
        
    },
    {
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: "un viaggio nelle profondità dell'oceano alla scoperta di creature misteriose e inesplorate",
        tags: ['viaggi', 'geo'],
        author: 'Fabio Mari',
        published: new Date('2023-03-14'),
        image: 'deep-sea.jpg',
        alt: 'deep sea'        
    },
    {
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: ['cucina'],
        author: 'Marta Bianchi',
        published: new Date('2023-04-20'),
        image: 'kitchen-food.jpg',
        alt: 'food'        
    },
    {
        title: 'Arte moderna: oltre i confini convenzionali',
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
        tags: ['arte', 'tech'],
        author: 'Gabriele Neri',
        published: new Date('2023-05-29'),
        image: 'modern-art.jpg',
        alt: 'street art'
    },
]

const articleRowEl= document.getElementById('articleRow');



articles.forEach(article => {

    const day = article.published.getDate();
    const month = (article.published.getMonth()+1);
    const year = article.published.getFullYear();

    const articleMarckUp = 
    `<div class="col mb-5">
        <div class="card rounded-0">
            <div class="card-body">
                <div class="d-flex justify-content-between gap-3">
                    <h3 class="card-title">${article.title}</h3>
                    <i class="fa-solid fa-bookmark fa-xl pt-3"></i>
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

    console.log(articleMarckUp);

    articleRowEl.insertAdjacentHTML('beforeend', articleMarckUp);
})