import { IonItem, IonLabel, IonInput, IonPage, IonContent, IonButton, IonHeader, IonTitle, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router";
import React, { useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {
    const history = useHistory();
    const email = useRef<HTMLIonInputElement>(null)
    const password = useRef<HTMLIonInputElement>(null)

    const onLogin = (e: any) => {
        e.preventDefault();
        const enteredEmail = email.current!.value as string;
        const enteredPassword = password.current!.value as string;
        if (!enteredEmail || !enteredPassword) { return; }
        signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                history.push('/home');
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                alert(errorMessage)
            });
    }

    const handleButtonClick = () => {
        history.push('/signup');
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem className="inputs">
                    <IonLabel position='floating'>Username</IonLabel>
                    <IonInput ref={email}></IonInput>
                </IonItem>

                <IonItem className="inputs">
                    <IonLabel position='floating'>Password</IonLabel>
                    <IonInput type="password" ref={password}></IonInput>
                </IonItem>
                <IonButton id="present-alert" onClick={onLogin}>Login</IonButton>
                <IonButton onClick={handleButtonClick}>Sign Up now</IonButton>
            </IonContent>
        </IonPage>
    )
}
export default Login