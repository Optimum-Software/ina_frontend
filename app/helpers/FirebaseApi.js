import firebase from "react-native-firebase";
import { firebaseConfig } from "../config/Firebase";
import sha256 from "crypto-js/sha256";
var CryptoJS = require("crypto-js");

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
    var ref = this.app.database().ref("Chats");
    var items = [];
    await ref.once("value").then(snapshot => {
        snapshot.forEach(child => {
          items.push({
            title: child.key
          });
        });
    });
    return items
  }

  getMsgsRef(uid) {
    return this.app.database().ref('Chats').child(uid);
  }

  sendMessage(sender, uid, messages = []) {
    const ref = firebaseService.database().ref("Chats").child(uid);
    let currentUser = this.app.auth().currentUser;
    let createdAt = new Date().getTime();
    var messageEncrypted = CryptoJS.AES.encrypt(
      messages[0].text,
      sha256(
          sender.uid + sender.email
      ).toString()
    );
    let chatMessage = {
      text: messageEncrypted.toString(),
      createdAt: createdAt,
      user: {
          id: currentUser.uid,
          email: currentUser.email
      }
    };
    ref.push().set(chatMessage);
  }
}
const firebaseService = new FirebaseService();
export default firebaseService;
