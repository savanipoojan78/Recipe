export default class Likes {
    constructor() {
        this.likes = [];

    }

    addLike(id, title, author, img) {

        const like = {
            id,
            title,
            author,
            img

        };
        this.likes.push(like);
        this.persistData();
        //Persist data in localStorage


        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        //Persist data in localStorage
        this.persistData();
        this.likes.splice(index, 1);
    }

    isLiked(id) {

        return this.likes.findIndex(el => el.id === id) !== -1;

    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        //restore from the local Storage
        if (storage)
            this.likes = storage;

    }
}