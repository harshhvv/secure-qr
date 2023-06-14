import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonApp, IonFab, IonFabButton, IonIcon, IonCol, IonGrid, IonRow, IonBackButton, IonButtons, IonCard, IonCardContent, IonFooter } from '@ionic/react';
import './Home.css';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { camera } from 'ionicons/icons';
import CryptoJS from 'crypto-js';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from "firebase/auth";
import '../../theme/variables.css';


// const secret: any = import.meta.env.VITE_ENC_DEC_KEY;
const secret: any = "abcdefghijklmnopqrstuvwxyz1234567890"
const user = getAuth().currentUser;

type userDataType = {
    bmis: {
        bmi: number,
        date: number,
        height: number,
        weight: number
    }[]
}

const Scanner: React.FC = () => {

    const [IonContentStyle, setIonContentStyle] = useState<any>({
        '--background': 'transparent',
        background: 'transparent',
    });

    const [user_data, setUserData] = useState<any[]>([]);

    const startScan = async () => {
        setIonContentStyle({
            '--background': 'transparent',
            background: 'transparent',
            display: 'none'
        })
        await BarcodeScanner.checkPermission({ force: true });
        BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }); // start scanning and wait for a result
        if (result.hasContent) {
            setIonContentStyle({
                '--background': 'transparent',
                background: 'transparent',
            })
            console.log(result.content); // log the raw scanned content
            const decrypted_uid = CryptoJS.AES.decrypt(result.content, secret).toString(CryptoJS.enc.Utf8); //decrypt the scanned content
            console.log("decrypted uid is: " + decrypted_uid)

            // if (decrypted_uid === curr_uid) {
            const docSnap = await getDoc(doc(db, "data", decrypted_uid));

            const ans = docSnap.data()!.bmis
            setUserData(ans)
            // }
        }
    };

    const stopScan = () => {
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
    };

    const askUser = () => {
        BarcodeScanner.prepare();
        const c = confirm('Do you want to scan a QR code?');
        if (c) {
            startScan();
        } else {
            stopScan();
        }
    };

    return (
        // <IonApp>
        <IonContent>
            ok
        </IonContent>
        // </IonApp>
        // <IonApp>
        //     <IonPage>
        //         <IonContent style={IonContentStyle}>
        //             <IonCard mode='ios'>
        //                 <IonCardContent>
        //                     <IonGrid>
        //                         {user_data && <IonRow>
        //                             <IonCol class="ion-text-center"><b>Date</b></IonCol>
        //                             <IonCol class="ion-text-center"><b>Height</b></IonCol>
        //                             <IonCol class="ion-text-center"><b>Weight</b></IonCol>
        //                             <IonCol class="ion-text-center"><b>BMI</b></IonCol>
        //                         </IonRow>}

        //                         {user_data &&
        //                             user_data.map((data, idx) => {
        //                                 return (
        //                                     <IonRow >
        //                                         {idx > 0 && <IonCol class="ion-text-center">{data['date']}</IonCol>}
        //                                         {idx > 0 && <IonCol class="ion-text-center">{data['height']}</IonCol>}
        //                                         {idx > 0 && <IonCol class="ion-text-center">{data['weight']}</IonCol>}
        //                                         {idx > 0 && <IonCol class="ion-text-center">{data['bmi']}</IonCol>}
        //                                     </IonRow>
        //                                 )
        //                             })
        //                         }
        //                     </IonGrid>
        //                 </IonCardContent>
        //             </IonCard>



        //             <IonFab slot='fixed' vertical='bottom' horizontal='center'>
        //                 <IonFabButton onClick={askUser}>
        //                     <IonIcon icon={camera}></IonIcon>
        //                 </IonFabButton>
        //             </IonFab>
        //         </IonContent>
        //     </IonPage>
        // </IonApp>



    )
};

export default Scanner;
