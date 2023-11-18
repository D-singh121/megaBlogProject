/* eslint-disable no-useless-catch */
import { Account, ID, Client } from "appwrite";
import conf from "../conf/conf";

//***** for better approach we are using the class based components practices */
export class AuthService {
    client = new Client();
    account;

    //***** authService(line:33) object call hone per humara constructor call hoga jiske ander hum account ki functionality rakhenge  */
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);//******* ab jab humare paas client ki values aa gai hai to hum use account me bhej denge  */
        this.account = new Account(this.client);
    }

    //******** ab hum koi bhi backend service pe dependencies nahi chahte iske liye hum ek rapper bana rahe hai taki hum jab bhi chahe koi bhi backend service use kar sake chahe vo appwrite ,firebase ya fir apna khud ka database  */
    //********* SignUp method below */
    async createAccount({ name, email, password }) {
        // eslint-disable-next-line no-useless-catch
        try {
            //******** hum wait karenge ek account create hone ka aur account create hoga account (line:7) variable se  */
            const userAccount = await this.account.create(
                ID.unique(),
                name,
                email,
                password
            );
            //****** ab agar useracount taiyar ho gya ho to hum use login karwa denge :point_down:  */
            if (userAccount) {
                //call another method
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            //   console.log(error);
            throw error;
        }
    }
    //********* login method below */
    async login({ email, password }) {

        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }

    }

    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            // console.log("Appwrite service  ::  getCurrentUser :: error ", error);
            throw error;
        }
        // return null;
        // eslint-disable-next-line no-unreachable
    }


    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service  ::  logout ::  error ", error);
        }
    }


}

//****  ab hume iss class ko use karne ke liye objects banane padenge below line object */
const authService = new AuthService();

export default authService; //**** exporting the class */
