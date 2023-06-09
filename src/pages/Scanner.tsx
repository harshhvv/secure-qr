import React, { useState } from 'react';
import { IonContent, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonApp, IonFab, IonFabButton, IonIcon, IonCol, IonGrid, IonRow, IonBackButton, IonButtons, IonCard, IonCardContent } from '@ionic/react';
import './Home.css';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { camera } from 'ionicons/icons';
import CryptoJS from 'crypto-js';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from "firebase/auth";

const secret: any = "abcdefghijklmnopqrstuvwxyz1234567890";
const user = getAuth().currentUser;
const curr_uid = user?.uid.toString();



const Scanner: React.FC = () => {

    const [user_data, setUserData] = useState<any[]>([]);


    const startScan = async () => {
        await BarcodeScanner.checkPermission({ force: true });
        BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }); // start scanning and wait for a result
        if (result.hasContent) {
            console.log(result.content); // log the raw scanned content
            const decrypted_uid = CryptoJS.AES.decrypt(result.content, secret).toString(CryptoJS.enc.Utf8);
            console.log("decrypted uid is: " + decrypted_uid)

            // if (decrypted_uid === curr_uid) {
            const docSnap = await getDoc(doc(db, "data", decrypted_uid));
            const ans = docSnap.data()!.bmis
            setUserData(ans)
            // }
            // user_data = (ans)
            // console.log(user_data[1]['height'])
            // for (let i = 0; i < user_data.length; i++) {
            //     console.log(user_data[i])
            // }
            // user_data.map((data) => {
            //     console.log(data)
            // })
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
                    <IonCard>
                        {/* <IonLabel class="ion-text-center"> History</IonLabel> */}
                        <IonCardContent>
                            <IonGrid>
                                {/* {!user_data && <IonLabel>Data not found. Scan to show history</IonLabel>} */}
                                {user_data && <IonRow>
                                    <IonCol class="ion-text-center"><b>Date</b></IonCol>
                                    <IonCol class="ion-text-center"><b>Height</b></IonCol>
                                    <IonCol class="ion-text-center"><b>Weight</b></IonCol>
                                    <IonCol class="ion-text-center"><b>BMI</b></IonCol>
                                </IonRow>}

                                {user_data &&
                                    user_data.map((data, idx) => {
                                        return (
                                            <IonRow >
                                                {idx > 0 && <IonCol class="ion-text-center">{data['date']}</IonCol>}
                                                {idx > 0 && <IonCol class="ion-text-center">{data['height']}</IonCol>}
                                                {idx > 0 && <IonCol class="ion-text-center">{data['weight']}</IonCol>}
                                                {idx > 0 && <IonCol class="ion-text-center">{data['bmi']}</IonCol>}
                                            </IonRow>
                                        )
                                    })
                                }
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
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
