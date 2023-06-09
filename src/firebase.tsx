import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
    apiKey:,
    authDomain:,
    projectId:,
    storageBucket:,
    messagingSenderId:,
    appId:,
    measurementId: 
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
export const AuthContext: any = createContext(null);

export const AuthContextProvider = (props: any) => { //props is any object
    const [user, setUser]: any = useState(); //user is any object
    const [error, setError]: any = useState(); //error is any object

    useEffect(() => { //useEffect is a hook that runs after the first render
        const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError); //onAuthStateChanged is a listener that runs when the auth state changes
        return () => unsubscribe(); //unsubscribe is a function that stops the listener
    }, []); //the empty array means that the hook will only run once
    return <AuthContext.Provider value={{ user, error }} {...props} /> //the value of the context is the user and error objects

}

export const useAuthState = () => { //useAuthState is a function that returns the user and error objects
    const auth: any = useContext(AuthContext); //useContext is a hook that returns the value of the context
    return { ...auth, isAuthenticated: auth.user != null } //the user and error objects are returned
}