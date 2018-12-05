import * as firebase from "firebase";
import { firebaseConfig } from "../config/Firebase";

let instance = null;

class FirebaseService {
    constructor() {
        if (!instance) {
            this.app = firebase.initializeApp(firebaseConfig);
            instance = this;
        }
        return instance;
    }

    login(username, password) {
        this.app
            .auth()
            .signInWithEmailAndPassword(username, password)
            .catch(error => {
                console.log(error);
            });
    }

    checkUser() {
        return this.app.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
            } else {
                console.log("Please login");
            }
        });
    }

    getCurrentUser() {
        return this.app.auth().currentUser;
    }
}

const firebaseService = new FirebaseService();
export default firebaseService;
