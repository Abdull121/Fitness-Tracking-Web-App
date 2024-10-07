import conf from '../conf/conf.js';
import { Client, Account, ID,} from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount
           
        } catch (error) {
            console.log("createAccount error::",error)
           
        }
    }


    async login({ email, password }) {
        try {
            // Validate input parameters
            if (!email || !password) {
                throw new Error("Missing required parameters: email and password");
            }
    
            // Debugging: Log the email and password
            //console.log("Logging in with email:", email, password);
    
            // Check for active sessions
            const currentUser = await this.getCurrentUser();
    
            if (currentUser) {
                //console.log("Session already active for user:", currentUser);
                // Optionally log out before logging in again
                await this.logout(); 
                console.log("Existing session terminated. Logging in again...");
            }
    
            // Create a new session
            const resp = await this.account.createEmailPasswordSession(email, password);
           // console.log(resp);
            return resp;
        } catch (error) {
            console.log("login error::", error);
            throw error; // Optionally re-throw the error if needed
        }
    }
    


    async getCurrentUser() {
        try {
             const result =  await this.account.get();
             return result;
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();  // Terminate all sessions
            console.log("User logged out successfully");
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }


    // google Auth


 async googleAuth() {
  try {
    // Initiates OAuth2 session with Google
    this.account.createOAuth2Session(
      "google",  // Provider name 'google' for Google OAuth
      "http://localhost:5173",  // Success redirect URL
      "http://localhost:5173/login",  // Failure redirect URL
    );
  } catch (error) {
    console.log("Google login error::", error);
    throw error;  // Optionally re-throw the error if needed
  }
}

    
}






const authService = new AuthService();

export default authService

