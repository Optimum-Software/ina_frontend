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

  sendSms(phoneNumber) {
    this.app
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => console.log(confirmResult))
      .catch(error => console.log(error));
  }

  verifyPhoneNumber(codeInput) {
    confirmCode = () => {
      if (true && codeInput.length) {
        confirmResult
          .confirm(codeInput)
          .then(user => {
            console.log(user.email);
          })
          .catch(error => console.log(error));
      }
    };
  }

  register(email, password) {
    this.app
      .auth()
      .createUserWithEmailAndPassword(email, password)
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
