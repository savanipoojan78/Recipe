import axios from 'axios'
import { apiKey } from '../config'

export default class Search {
    constructor(query, number = 100) {
        this.query = query;
        this.number = number;
    }

    async getResult(query, number) {
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/search?query=${this.query}&number=${this.number}&apiKey=${apiKey}`);
            this.result = res.data.results;
            //console.log(this.result);
        } catch (error) {
            alert(error);
        }

    }

}