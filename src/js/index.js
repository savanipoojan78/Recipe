// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Likes'
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'



/**Gloval State Of the App
    *- Search Object
    *- current recipe Object
    *- Shoping List Object
    *- Liked Recipe

*/
const state = {};


/**
 * SEARCH CONTROLLER
 */
const controlSearch = async() => {

    //1) get the query from the view

    const query = searchView.getInput(); //TODO;
    if (query) {
        //2) new Search Object
        state.search = new Search(query);

        // 3) Prepare UI
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);
        //4) Search for Recipe
        try {
            await state.search.getResult();
            //5) Render result on UI;
            clearLoader();
            searchView.renderResult(state.search.result);
        } catch (error) {
            alert('Something went wrong');
            clearLoader();

        }


        //console.log(state.search.result);

    }

}
elements.searchForm.addEventListener('submit', e => {

    e.preventDefault();
    controlSearch();

});

elements.searchResPages.addEventListener('click', e => {
    //console.log(e.target);

    const btn = e.target.closest('.btn-inline');
    //console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResult(state.search.result, goToPage);
        //console.log(goToPage);
    }
});



/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async() => {
    //Get Id from URL
    const id = window.location.hash.replace('#', '');
    //console.log(id);
    if (id) {
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //HighLight Seleted Item
        if (state.search)
            searchView.highlightedSeleted(id);
        ///Create New Recipe
        state.recipe = new Recipe(id);

        try
        //Get Recipe Data
        {
            await state.recipe.getRecipe();
        } catch (error) {
            alert('error Processing recipe');
        }


        //Render Recipe
        clearLoader();
        recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id));

    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load',controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/**
 * LIKE CONTROLLER
 */


elements.recipe.addEventListener('click', e => {

    if (e.target.matches('.recipe__btn--add , .recipe__btn--add *')) {
        //console.log("Click Happen");
        //Add Ingredients to Shopping List
        controlList();
    } else if (e.target.matches('.recipe__love,.recipe__love *')) {

        controlLike();
        //console.log('Click Like Button');
    }
});


// handle Delete and Add Item List

elements.shopping.addEventListener('click', el => {

    const id = el.target.closest('.shopping__item').dataset.itemid;
    //handle delete event;
    if (el.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete from state
        state.list.deleteItem(id);

        listView.deleteItem(id);

        //Handle Count Update
    } else if (el.target.matches('.shopping__count-value')) {
        const val = parseFloat(el.target.value, 10);
        // console.log('Update');
        state.list.updateCount(id, val);
    }
});


/**
 * 
 * 
 * LIST CONTROLLER Add to List of Shopping
 */

const controlList = () => {
        //Create A new List If There in None List
        if (!state.list) state.list = new List();


        //Add each ingredients in list
        state.recipe.ingredients.forEach(el => {
            const item = state.list.addItem(el.amount, el.unit, el.originalName);
            listView.renderItem(item);
        });


    }
    //For testing Purpose

state.likes = new Like();


const controlLike = () => {

    if (!state.likes) state.likes = new Like();
    const currentId = state.recipe.id;

    //User Has NOt et Liked Current Recipe
    if (!state.likes.isLiked(currentId)) {
        // Add Lke to State
        const newLike = state.likes.addLike(
            state.recipe.id,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img

        );

        //Toggle Button
        likesView.toggleLikeBtn(true);

        //Add Like to UI List
        likesView.renderLike(newLike);
    }
    //Alread Like Recipe
    else {
        //remove Like from the state
        state.likes.deleteLike(currentId);

        //Toggle The Like Button
        likesView.toggleLikeBtn(false);

        //Remove the Like from UI List

        likesView.deleteLike(currentId);

    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());



}

//Restore Like Recipe on PageLoad

window.addEventListener('load', () => {
    state.likes = new Like();
    // Restore Likes
    state.likes.readStorage();

    //Toggle new Button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    //render Existing Likes
    state.likes.likes.forEach(like => {
        likesView.renderLike(like);
    })

})