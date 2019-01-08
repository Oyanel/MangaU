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

    //binding fx
    doInsertFavoriteManga = (mangaId) =>
        this.db.ref(`user/${this.auth.uid}/mangas/favorites`).push().set({manga: mangaId});

    getFavoriteMangas() {
        var user_id = this.auth ? this.auth.uid : this.auth.ref('users');
        return this.db.ref(`user/${user_id}/mangas/favorites`);
    }
}

export default Firebase;
