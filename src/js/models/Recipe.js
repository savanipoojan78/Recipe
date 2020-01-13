import axios from 'axios';
import { apiKey } from '../config'

// Get Request
//  https://api.spoonacular.com/recipes/559251/information?includeNutrition=false&apiKey=fa55fd98689e4aea830a39ccb825accb
export default class Recipe {
    constructor(id) {
        this.id = id;

    }


    async getRecipe() {

        try {
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=${apiKey}`);
            this.title = res.data.title;
            this.author = res.data.creditsText;
            this.img = res.data.image;
            this.url = res.data.sourceUrl;
            this.instruction = res.data.instructions;
            this.ingredients = res.data.extendedIngredients;
            this.time = res.data.readyInMinutes;
            this.serving = res.data.servings;


            console.log(res);
        } catch (error) {
            alert(error);
        }
    }

    updateSearving(type) {
        //Servings

        const newSearvings = type === 'dec' ? this.serving - 1 : this.serving + 1;

        //Ingredients
        this.ingredients.forEach(ing => {
            ing.amount *= (newSearvings / this.serving);

        })


        this.serving = newSearvings;

    }


}