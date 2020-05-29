import app from 'firebase/app';

const firebaseConfig = {
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
      app.initializeApp(firebaseConfig);
    }
  }
  
  export default Firebase;