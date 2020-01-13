import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'

    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);

    //  img/icons.svg#icon-heart-outlined


};

export const toggleLikeMenu = numberOfLike => {
    elements.likesMenu.style.visibility = numberOfLike > 0 ? 'visible' : 'hidden';
}

export const renderLike = likes => {

    const markup = `
    <li>
        <a class="likes__link" href="#${likes.id}">
            <figure class="likes__fig">
                <img src="${likes.img}" alt="${likes.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(likes.title)}</h4>
                <p class="likes__author">${likes.author}</p>
            </div>
        </a>
    </li>
    
    `;
    elements.likeList.insertAdjacentHTML('beforeend', markup);
}


export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    if (el) {
        el.parentElement.removeChild(el);
    }



}