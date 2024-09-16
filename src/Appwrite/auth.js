import conf from '../conf/Conf';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        
        // console.log("appwriteURL :: ",conf.appwriteUrl)
        // console.log("Project ID :: ",conf.appwriteProjectId)
        // console.log("Collection ID :: ",conf.appwriteCollectionId)
        // console.log( "BucketID :: ",conf.appwriteBucketId)
        // console.log("DatabaseID:: ",conf.appwriteDatabaseId)


            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            console.log("createAccount APPWRITE Error:: ",error)
           
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Login APPWRITE Error:: ",error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();


export default authService

