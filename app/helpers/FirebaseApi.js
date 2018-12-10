import firebase from "react-native-firebase";
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

    login(email, password) {
        this.app
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.log(error);
            });
    }

    async sendSms(phoneNumber) {
        return await this.app
            .auth()
            .signInWithPhoneNumber(phoneNumber)
            .catch(error => console.log(error));
    }

    async verifyPhoneNumber(codeInput, confirmResult) {
        if (true && codeInput.length) {
            return await confirmResult
                .confirm(codeInput)
                .catch(error => console.log(error));
        }
    }

    async registerAccount(email, password) {
        return await this.app
            .auth()
            .createUserWithEmailAndPassword(email, password);
    }

    async linkAccountWithPhone(credential, user) {
        return await this.getCurrentUser()
            .linkAndRetrieveDataWithCredential(user)
            .then(result => console.log(result))
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

    deleteUser(user) {
        user.delete()
            .then(function() {
                // User deleted.
            })
            .catch(function(error) {
                // An error happened.
            });
    }

    async getChats() {
        console.log("hallo");
        const ref = this.app.database().ref("Chats");
        console.log(ref);
        ref.once("value").then(snapshot => {
            console.log(snapshot);
        });
        ref.once("value").then(snapshot => {
            // get children as an array
            let items = [];
            snapshot.forEach(child => {
                items.push({
                    title: child.key
                });
            });
        });
    }
}

const firebaseService = new FirebaseService();
export default firebaseService;
