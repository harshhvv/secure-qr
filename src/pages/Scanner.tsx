import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonApp, IonFab, IonFooter, IonFabButton, IonIcon, IonAlert, IonModal, IonCol, IonGrid, IonRow, IonBackButton, IonButtons, IonCard, IonCardContent } from '@ionic/react';
import './Home.css';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { camera } from 'ionicons/icons';
const secret: any = process.env.secret;
import CryptoJS from 'crypto-js';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from "firebase/auth";


const curr_uid = getAuth().currentUser?.uid.toString();
let user_data: any[] = [];




const Scanner: React.FC = (props) => {
    const startScan = async () => {
        await BarcodeScanner.checkPermission({ force: true });
        BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }); // start scanning and wait for a result
        if (result.hasContent) {
            console.log(result.content); // log the raw scanned content
            console.log(result.content)
            const decrypted_uid = CryptoJS.AES.decrypt(result.content, secret).toString(CryptoJS.enc.Utf8);
            alert(decrypted_uid); // show a alert with the scanned content
            console.log("decrypted uid is: " + decrypted_uid)

            // if (decrypted_uid === curr_uid) {
            const docSnap = await getDoc(doc(db, "data", decrypted_uid));
            const ans = docSnap.data()!.bmis
            user_data = (ans)
            console.log(user_data[1]['height'])
            // console.log(JSON.stringify(ans))
            // }
            // history.goBack();
        } else {
            alert("no qr");
        }
    };

    return (
        <IonApp>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton>Back</IonBackButton>
                        </IonButtons>
                        <IonTitle>History</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    {user_data.map((data) => {
                        return (
                            <IonGrid>
                                <IonRow>
                                    <IonCol>Date</IonCol>
                                    <IonCol>Height</IonCol>
                                    <IonCol>Weight</IonCol>
                                    <IonCol>BMI</IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>{data["data"]}</IonCol>
                                    <IonCol>{data["height"]}</IonCol>
                                    <IonCol>{data["weight"]}</IonCol>
                                    <IonCol>{data["bmi"]}</IonCol>
                                </IonRow>
                            </IonGrid>
                        )
                    })}

                </IonContent>

                <IonFab slot='fixed' vertical='bottom' horizontal='center'>
                    <IonFabButton onClick={startScan}>
                        <IonIcon icon={camera}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonPage>
        </IonApp >

    )
};

export default Scanner;
