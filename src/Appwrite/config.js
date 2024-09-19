import conf from '../conf/Conf';
import { Client, ID, Databases, Storage } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createUserProfile({name, age, weight, hight, fitnessGoals,  docId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId,
                
                {
                    name,
                    age,
                    weight,
                    hight,
                    fitnessGoals,
                    
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createProfile :: error", error);
        }
    }

    async updateUserProfile(docId, {name,age, weight, hight, fitnessGoals}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId,
                {
                    name,
                    age,
                    weight,
                    hight,
                    fitnessGoals,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

   

    async getUserInformation(docId){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId
            
            )
        } catch (error) {
           console.error("Appwrite service :: getUserInformation :: error", error.message, error.response);
            return false
        }
    }

    // async getPosts(queries = [Query.equal("fitnessGoals", "active")]){
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             queries,
                

    //         )
    //     } catch (error) {
    //         console.log("Appwrite serive :: getPosts :: error", error);
    //         return false
    //     }
    // }

    // file upload service

    // async uploadFile(file){
    //     try {
    //         return await this.bucket.createFile(
    //             conf.appwriteBucketId,
    //             ID.unique(),
    //             file
    //         )
    //     } catch (error) {
    //         console.log("Appwrite serive :: uploadFile :: error", error);
    //         return false
    //     }
    // }

    // async deleteFile(fileId){
    //     try {
    //         await this.bucket.deleteFile(
    //             conf.appwriteBucketId,
    //             fileId
    //         )
    //         return true
    //     } catch (error) {
    //         console.log("Appwrite serive :: deleteFile :: error", error);
    //         return false
    //     }
    // }

    // getFilePreview(fileId){
    //     return this.bucket.getFilePreview(
    //         conf.appwriteBucketId,
    //         fileId
    //     )
    // }
}


const service = new Service()
export default service