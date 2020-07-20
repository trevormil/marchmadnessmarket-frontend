import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBAdesshWXOiVmwOEyIoLEVMGchM2ZSa_o",
  authDomain: "fantasystockmarket-tm.firebaseapp.com",
  databaseURL: "https://fantasystockmarket-tm.firebaseio.com",
  projectId: "fantasystockmarket-tm",
  storageBucket: "fantasystockmarket-tm.appspot.com",
  messagingSenderId: "818123784199",
  appId: "1:818123784199:web:d95473615fffcd56d0aaa2",
  measurementId: "G-XY42NRJ28S"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  
  
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
