import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { IonItem, IonLabel, IonInput, IonPage, IonContent, IonButton, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonGrid, IonRow, IonCol } from "@ionic/react"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import './signup.css'
import { storage } from "../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Signup: React.FC = () => {
    const history = useHistory();
    const firstName = useRef<HTMLIonInputElement>(null)
    const lastName = useRef<HTMLIonInputElement>(null)
    const phoneNumber = useRef<HTMLIonInputElement>(null)
    const email = useRef<HTMLIonInputElement>(null)
    const password = useRef<HTMLIonInputElement>(null)
    const [file, setFile] = useState();
    const [dpURL, setDpURL] = useState("");

    const IonCardStyle = {
        width: "80%",
        margin: "0px auto 0px auto",
        top: "50px"
    }

    const handleDpChange = (event: any) => {
        setFile(event.target.files[0]);
    }

    // const handleDpUpload = () => {
    //     if (!file) {
    //         alert("Please choose a file first!")
    //     }
    //     const storageRef = ref(storage, `/profilePhotos/${uid}/${file}`)
    //     const uploadTask = uploadBytesResumable(storageRef, file);
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             const percent = Math.round(
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //             setPercent(percent);
    //         },
    //         (err) => console.log(err),
    //         () => {
    //             // download url
    //             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                 console.log(url);
    //             });
    //         }
    //     );

    // }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const enteredFirstName = (firstName.current!.value as string).trim();
        const enteredLastName = (lastName.current!.value as string).trim();
        const enteredEmail = email.current!.value as string;
        const enteredPassword = password.current!.value as string;
        const storage = getStorage();
        if (!file) {
            // alert("Please choose a file first!")
            // file = URL("src/1189973.jpg")
        }

        if (!enteredEmail || !enteredPassword) { return; }
        await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
            .then((userCredential) => {
                history.push('/tab1');
                const user = userCredential.user;
                const uid = user.uid;
                const storageRef = ref(storage, `/profilePhotos/${uid}`)
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        console.log(error.message)
                        alert("Error uploading profile photo")
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setDoc(doc(db, "users", uid), { //create a new document in firestore))
                                firstName: enteredFirstName,
                                lastName: enteredLastName,
                                email: enteredEmail,
                                uid: uid,
                                dp: downloadURL
                            })
                            updateProfile(user, { displayName: enteredFirstName + " " + enteredLastName })
                            updateProfile(user, { photoURL: downloadURL })
                            console.log(user.photoURL)

                            setDoc(doc(db, "data", uid), { //create a new document in firestore
                                bmis: [{
                                    bmi: 0,
                                    height: +0,
                                    weight: +0,
                                    date: 0
                                }]
                            })
                        });
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(error.message)
            });
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {/* <IonTitle>Back Button</IonTitle> */}
                    <IonTitle>Signup Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonCard style={IonCardStyle} mode='ios'>
                    <IonCardContent >
                        <IonItem className="inputs">
                            <IonLabel position='floating'>First Name</IonLabel>
                            <IonInput ref={firstName} required></IonInput>
                        </IonItem>

                        <IonItem className="inputs">
                            <IonLabel position='floating'>Last Name</IonLabel>
                            <IonInput ref={lastName}></IonInput>
                        </IonItem>
                        <IonItem className="inputs">
                            <IonLabel position='floating'>Phone Number</IonLabel>
                            <IonInput ref={phoneNumber} type='number'></IonInput>
                        </IonItem>
                        <IonItem className="inputs">
                            <IonLabel position='floating'>Email</IonLabel>
                            <IonInput ref={email}></IonInput>
                        </IonItem>

                        <IonItem className="inputs">
                            <IonLabel position='floating'>Password</IonLabel>
                            <IonInput type="password" ref={password}></IonInput>
                        </IonItem>

                        {/* <IonItem > */}
                        <input type="file" accept="image/*" onChange={(e) => { handleDpChange(e) }} id='dp-upload' alt='../1189973.jpg' />
                        {/* <button onClick={handleDpUpload}>Upload to Firebase</button> */}
                        {/* </IonItem> */}

                        <IonGrid>
                            <IonRow>

                                <IonCol> <IonButton mode='ios' className='btn' onClick={onSubmit}>Sign up</IonButton> </IonCol>
                                <IonCol><IonButton mode='ios' className='btn' onClick={history.goBack}>Have an account? Login</IonButton></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>
    )
}


export default Signup