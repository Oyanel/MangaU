import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }


    //binding fx
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    //binding fx
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    //binding fx
    doSignOut = () => this.auth.signOut();

    //binding fx
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    //binding fx
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    /**
     * Inserts the giv en manga in the db
     *
     * @param manga
     * @returns {boolean}
     */
    doInsertFavoriteManga = (manga) => {
        console.log('insert firebase');
        return Promise.resolve(this.isMangaExists(manga).then(
            (isExists) => {
                let user_id = this.auth ? this.auth.currentUser.uid : false;
                if (user_id && !isExists) {
                    let ref = this.db.ref(`users/${user_id}/mangas/favoris`);
                    ref.push(manga);
                    return true;
                }
            }).catch(error => {
                return new Error('This manga is yet in your favorites mangas');
            })
        );
    };

    /**
     * Check if the given manga exists
     *
     * @param manga
     * @returns boolean
     */
    isMangaExists(manga) {
        let user_id = this.auth ? this.auth.currentUser.uid : false;
        if (user_id) {
            let ref = this.db.ref(`users/${user_id}/mangas/favoris`);
            return Promise.resolve(
                ref.once("value")
                    .then(function (snapshot) {
                        if (!!snapshot.val()) {
                            let mangas = snapshot.val();
                            let exists = false;
                            Object.keys(mangas).forEach((key) => {
                                if (manga.id.localeCompare(mangas[key].id) === 0) {
                                    exists = true;
                                    return exists;
                                }
                            });
                            return exists;
                        }
                        return false;
                    })
            );
        }
        return false;
    };

    /**
     * Returns the favorites mangas from the db.
     *
     * @returns {*}
     */
    getFavoriteMangas() {
        let user_id;
        if (this.auth) {
            user_id = this.auth.currentUser.uid;
        } else {
            user_id = false;
        }
        if (user_id) {
            let ref = this.db.ref(`users/${user_id}/mangas/favoris`);
            return Promise.resolve(
                ref.once('value').then(function (snapshot) {
                    if (!!snapshot.val()) {
                        return Object.values(snapshot.val());
                    }
                    return [];
                })
            );
        }
    }

    /**
     * Returns any changes made on the favorites mangas
     *
     * @returns {{}}
     */
    onMangaUpdate = () => {
        let user_id;
        if (this.auth) {
            user_id = this.auth.currentUser.uid;
        } else {
            user_id = false;
        }
        if (user_id) {
            let ref = this.db.ref(`users/${user_id}/mangas/favoris`);
            ref.on('value', function (snapshot) {
                if (!!snapshot.val()) {
                    console.log('news from firebase');
                    return Object.values(snapshot.val());
                }
            });
        }
        return {};
    }
}

export default Firebase;
