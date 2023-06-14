import { IonItem, IonLabel, IonInput, IonPage, IonContent, IonButton, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent } from "@ionic/react"
import { useHistory } from "react-router";
import React, { useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {


    const IonCardStyle = {
        width: "80%",
        // margin: "auto",
        margin: "0px auto 0px auto",
        top: "50px"
    }

    const IonButtonsContainer = {
        marginTop: "14px",
    }

    const IonButtonStyle = {
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    const history = useHistory();
    const email = useRef<HTMLIonInputElement>(null)
    const password = useRef<HTMLIonInputElement>(null)

    const onLogin = () => {
        // e.preventDefault();
        const enteredEmail = email.current!.value as string;
        const enteredPassword = password.current!.value as string;
        if (!enteredEmail || !enteredPassword) { return; }
        signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                history.push('/homeTab');
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
            {/* <IonHeader>
                <IonToolbar>
                    <IonTitle>Login Page</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <IonContent>

                <IonCard style={IonCardStyle} mode='ios'>
                    <IonCardContent >
                        <IonItem className="inputs">
                            <IonLabel position='floating'>Email</IonLabel>
                            <IonInput ref={email}></IonInput>
                        </IonItem>

                        <IonItem className="inputs">
                            <IonLabel position='floating'>Password</IonLabel>
                            <IonInput type="password" ref={password}></IonInput>
                        </IonItem>
                        <div style={{ ...IonButtonsContainer, position: "relative" }}>
                            <IonButton style={{ ...IonButtonStyle, backgroundcolor: "red" }} mode='ios' onClick={onLogin}>Login</IonButton>
                            <IonButton style={{ ...IonButtonStyle }} mode='ios' onClick={handleButtonClick}>Sign Up</IonButton>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}
export default Login