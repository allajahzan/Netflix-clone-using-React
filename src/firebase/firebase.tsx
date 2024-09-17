import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const firebaseConfig = {
    apiKey: "AIzaSyCZdEZ2U7rnDta_73BQy59RuedGmk-wba4",
    authDomain: "netflix-clone-9b11f.firebaseapp.com",
    projectId: "netflix-clone-9b11f",
    storageBucket: "netflix-clone-9b11f.appspot.com",
    messagingSenderId: "782967620672",
    appId: "1:782967620672:web:69ca2669242e957ed8cba5",
    measurementId: "G-L02GM9DJJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const signup = async (name: string, email: string, password: string) => {
    try {

        const q = query(
            collection(db, "user"),
            where("email", "==", email),
        );

        const user = await getDocs(q);

        if (user.empty) {

            const user = await addDoc(collection(db, "user"), {
                name: name,
                email: email,
                password: password
            });
             
            toast.success("Successfully created an account")
            return user
        } else {
            toast.error("Email already exists");
        }

    } catch (error: any) {
        toast.error(error)

    }
};


const login = async (email: string, password: string) => {
    try {
        const q = query(
            collection(db, "user"),
            where("email", "==", email),
        );

        const user = await getDocs(q);

        if (!user.empty) {
            let userData: any
            user.forEach((doc) => {
                userData = doc.data()
                if(userData.password !== password){
                    toast.error("Incorrect password")
                    userData = null
                }
            });
            return userData
        }
        else {
            toast.error("Incorrect Email")
        }

    } catch (error) {
        console.log(error);
    }
}


const logout = () => {
    Cookies.remove('user')
    return true
}

export {
    login,
    signup,
    logout
}