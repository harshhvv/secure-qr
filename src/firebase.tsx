import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { getPerformance } from "firebase/performance";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
// Initialize Performance Monitoring and get a reference to the service
const perf = getPerformance(app);



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


//////////////////////////////////////////////

