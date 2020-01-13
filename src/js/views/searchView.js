import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const renderResult = (recipe, page = 1, resPerPage = 10) => {

    //render result of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipe.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipe.length, resPerPage);
}

//tpe : previous or next
const createButton = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${type==='prev' ? page-1 : page+1}>
        <span>Page ${type==='prev' ? page-1 : page+1}</span>    
        <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left' : 'right'}"></use>
            </svg>
       
        </button>`;

export const highlightedSeleted = id => {
    const resultArr = Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};


const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        //Button to go to next Page
        button = createButton(page, 'next');
        //console.log(button);
    } else if (page === pages && pages > 1) {
        //onl button to go to previous page
        button = createButton(page, 'prev');
    } else {
        //Both Button Should be Visible
        button = `${createButton(page,'next')}
        ${createButton(page,'prev')}
        `;
    }
    console.log(button);
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);


};

export const clearInput = () => {
    elements.searchInput.value = '';

}
export const clearResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';

}

export const limitRecipeTitle = (title, limit = 17) => {

    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if ((acc + curr.length) <= limit) {
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;

    }
    return title;
}
const renderRecipe = recipe => {

    const markup = `<li>
        <a class="results__link" href="#${recipe.id}">
            <figure class="results__fig">
                <img src="https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg" alt="${recipe.id}">
            </figure>
            <difv class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.readyInMinutes} min.</p>
            </div>
        </a>
    </li>`;

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);




}