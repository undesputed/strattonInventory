import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

class Firebase {
    constructor(){
        app.initializeApp(config);

        this.fieldValue = app.firestore.FieldValue;
        this.auth = app.auth();
        this.db = app.firestore();
        this.serverValue = app.database.ServerValue;
        this.emailAuthProvider = app.auth.EmailAuthProvider;
    }

    // AUTH API

    CreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email,password);
    SignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email,password);
    SignOut = () => this.auth.signOut();
    PasswordReset = email => this.auth.sendPasswordResetEmail(email);
    PasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    currUser = () => this.auth.currentUser;

    SendEmailVerification = () => this.auth.currentUser.sendEmailVerification({
        url: 'http://localhost:3000',
    })

    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });


    user = uid => this.db.doc(`users/${uid}`);
    users = () => this.db.collection('users');

    processor = uid => this.db.doc(`processors/${uid}`);
    processors = () => this.db.collection('processors');

    itstaff = uid => this.db.doc(`itstaffs/${uid}`);
    itstaffs = () => this.db.collection('itstaffs');

    accountablePerson = uid => this.db.doc(`accountablePersons/${uid}`);
    accountablePersons = () => this.db.collection('accountablePersons');

    report = uid => this.db.doc(`reports/${uid}`);
    reports = () => this.db.collection('reports');

    seatplan = uid => this.db.doc(`seatplans/${uid}`);
    seatplans = () => this.db.collection('setplans');

    tracker = uid => this.db.doc(`trackers/${uid}`);
    trackers = () => this.db.collection('trackers');
}

export default Firebase;