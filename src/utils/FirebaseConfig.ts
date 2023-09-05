// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: 'AIzaSyDw_8cek2VJfIYC3_WC17liDSFYcemRFF8',
	authDomain: 'zoom-clone-65574.firebaseapp.com',
	projectId: 'zoom-clone-65574',
	storageBucket: 'zoom-clone-65574.appspot.com',
	messagingSenderId: '87124410114',
	appId: '1:87124410114:web:d18a2a8211ed6fc13c8c1b',
	measurementId: 'G-WKG0Z6MY86',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
export const userRef = collection(firebaseDB, 'users');
export const meetingsRef = collection(firebaseDB, 'meetings');
