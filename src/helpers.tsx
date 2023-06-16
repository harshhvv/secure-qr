import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

const auth = getAuth();
const loggedInUser = auth.currentUser;
const [firstName, setFirstName] = useState<string>("");
const [dpURL, setDpURL] = useState<string>("");
const [qrdata, setqr] = useState<string>() //keep track of qr data
const secret: any = import.meta.env.VITE_ENC_DEC_KEY;


const showDisplayName = () => {
    useEffect(() => {
        setFirstName(loggedInUser?.displayName?.split(" ")[0] as string);
    }, []);
}

const showQR = () => {
    useEffect(() => {
        const qrdata = CryptoJS.AES.encrypt(loggedInUser!.uid, secret).toString(); //encrypt uid
        setqr(qrdata)
    }, []);
}

const showDp = () => {
    useEffect(() => {
        setDpURL(loggedInUser?.photoURL as string);
    }, []);
}

export { showDisplayName, showQR, showDp, firstName, dpURL, qrdata }