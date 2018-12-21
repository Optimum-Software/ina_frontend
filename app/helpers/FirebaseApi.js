import firebase from "react-native-firebase";
import { firebaseConfig } from "../config/Firebase";
import UserApi from "./UserApi";
import User from "./User";
import Api from "./Api";
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

    getFire() {
        return this.app;
    }

    async sendSms(phoneNumber) {
        return await this.app
            .auth()
            .signInWithPhoneNumber(phoneNumber)
            .catch(error => console.log(error));
    }

    verifyPhoneNumber(phoneNumber) {
        // console.log("VERIFY PHONE SHITZLE");
        // console.log(confirmResult);
        // return await confirmResult
        //     .confirm(codeInput)
        //     .catch(error => console.log(error));
        return this.app.auth().verifyPhoneNumber(phoneNumber, 100, false);
    }

    async createPhoneCredential(verifyId, codeInput) {
        return await firebase.auth.PhoneAuthProvider.credential(
            verifyId,
            codeInput
        );
    }

    loginPhone(credential) {
        return this.app.auth().signInWithCredential(credential);
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
                if (user.phoneNumber != null) {
                    this.deleteUser(user);
                }
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

    async getChats(userId) {
      return(Api.callApiGet("getChatsForUser/" + userId))
    }

    getMsgsRef(uid) {
      return this.app
        .database()
        .ref("Chats")
        .child(uid);
    }

    notifyUser(uid) {
        uid = "1:19"; //debug
        ids = uid.split(":");

        //debug
        User.getUserId().then(id => {
            let resId = null;
            if (ids[0] == id) {
                resId = ids[1];
            } else {
                resId = ids[0];
            }
            UserApi.notifyUser(parseInt(resId));
        });
    }

    createChat(uid) {
      //uid must have following structure: lowId:highId
      //example chat between user 6 and 9 = 6:9
      //example chat between user 78 and user 34 = 34:78
      user1 = uid.split(":")[0]
      user2 = uid.split(":")[1]
      userData = {
        user1Id: user1,
        user2Id: user2,
        chatUid: uid
      }
      Api.callApiPost("createChat", userData).then(res => {
        console.log(res);
      })
    }

    sendMessage(sender, uid, messages = []) {
        const ref = this.app
            .database()
            .ref("Chats")
            .child(uid);
        this.notifyUser(uid);
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
