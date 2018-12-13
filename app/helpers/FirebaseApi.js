import firebase from "react-native-firebase";
import { firebaseConfig } from "../config/Firebase";
import UserApi from "./UserApi";
import User from "./User";
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

    getFireBase() {
        return this.app.auth();
    }

    async sendSms(phoneNumber) {
        return await this.app
            .auth()
            .signInWithPhoneNumber(phoneNumber)
            .catch(error => console.log(error));
    }

    async verifyPhoneNumber(phoneNumber) {
        // console.log("VERIFY PHONE SHITZLE");
        // console.log(confirmResult);
        // return await confirmResult
        //     .confirm(codeInput)
        //     .catch(error => console.log(error));
        return await this.app.auth().verifyPhoneNumber(phoneNumber);
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

  notifyUser(uid) {
    uid = '1:19'; //debug
    ids = uid.split(":");
    
    //debug
    User.getUserId().then(id => {
        let resId = null;
        if(ids[0] == id) {
            resId = ids[1]
        } else {
            resId = ids[0]
        }
        UserApi.notifyUser(parseInt(resId));
    });
  }

  createChat(uid) {
    //uid must have following structure: lowId:highId
    //example chat between user 6 and 9 = 6:9
    //example chat between user 78 and user 34 = 34:78
    this.database().ref("Chats").child(uid);
  }

  sendMessage(sender, uid, messages = []) {
    const ref = this.app.database().ref("Chats").child(uid);
    this.notifyUser(uid);
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

    getMsgsRef(uid) {
        return this.app
            .database()
            .ref("Chats")
            .child(uid);
    }

    sendMessage(sender, uid, messages = []) {
        const ref = this.app
            .database()
            .ref("Chats")
            .child(uid);

        let currentUser = this.app.auth().currentUser;
        let createdAt = new Date().getTime();

        var messageEncrypted = CryptoJS.AES.encrypt(
            messages[0].text,
            sha256(sender.uid + sender.email).toString()
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
