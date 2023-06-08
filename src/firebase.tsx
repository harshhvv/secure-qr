import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBlZYdjqdvbSeYQ9HtZd13kJJBXRzbkerg",
    authDomain: "bmi-proj.firebaseapp.com",
    projectId: "bmi-proj",
    storageBucket: "bmi-proj.appspot.com",
    messagingSenderId: "219199813042",
    appId: "1:219199813042:web:c1d0d91c288a88d8f6a0ab",
    measurementId: "G-D1VGL3WB32"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
export const AuthContext: any = createContext(null);

export const AuthContextProvider = (props: any) => {
    const [user, setUser]: any = useState();
    const [error, setError]: any = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
        return () => unsubscribe();
    }, []);
    return <AuthContext.Provider value={{ user, error }} {...props} />

}

export const useAuthState = () => {
    const auth: any = useContext(AuthContext);
    return { ...auth, isAuthenticated: auth.user != null }
}