import conf from '../conf/Conf';
import { Client, ID, Databases, Storage,Query } from "appwrite";

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
                conf.appwriteUserInfoCollectionId,
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
                conf.appwriteUserInfoCollectionId,
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

   

        async getUserInformation(collectionId,docId){

            //console.log("docId:", docId);
        
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                collectionId,
                docId,
            
            )
        } catch (error) {
           console.error("Appwrite service :: getUserInformation :: error", error.message, error.response);
            return false
        }
    }



     //ADD workout in the database

     async addWorkout(userId,{ date, workout, duration, calories}) {
        try {
            // const formattedDate = new Date(date).toISOString();
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteWorkOutCollectionId,
                ID.unique(),
                {
                    Date: date,      
                    Workout: workout,        
                    Duration: duration, 
                    userId,
                    CaloriesBurned: calories ,
                    

                }
            );
        } catch (error) {
            console.log("Appwrite service :: createWorkout :: error", error);
        }
    }


        //get all workoutHistory BY user ID
    async getAllWorkoutHistory(userId){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteWorkOutCollectionId,
                 [Query.equal('userId', userId)]
              
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


            // Add Daily Goals

            async DailyGoals(docId, {
                caloriesBurned,
                outOfCaloriesBurned,
                stepsTaken,
                targetSteps,
                SpendWorkoutTime, 
                outOfWorkoutTime,
            }) {
                try {
                    return await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteDailyGoalsCollectionId,
                        docId,
                        {
                            caloriesBurned,                
                            outOfCaloriesBurned,
                            stepsTaken,
                            targetSteps,
                            spendWorkoutTimeMinutes: SpendWorkoutTime,
                            outOfWorkoutTimeMinutes: outOfWorkoutTime,
                        }
                    );
                } catch (error) {
                    console.log("Appwrite service :: DailyGoals :: error", error);
                }
            }


            //<--update Goals-->


            async updateGoals(docId, {caloriesBurned,
                outOfCaloriesBurned,
                stepsTaken,
                targetSteps,
                SpendWorkoutTime, 
                outOfWorkoutTime,}){
                try {
                    return await this.databases.updateDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteDailyGoalsCollectionId,
                        docId,
                        {
                            caloriesBurned,                
                            outOfCaloriesBurned,
                            stepsTaken,
                            targetSteps,
                            spendWorkoutTimeMinutes: SpendWorkoutTime,
                            outOfWorkoutTimeMinutes: outOfWorkoutTime,
        
                        }
                    )
                } catch (error) {
                    console.log("Appwrite service :: updateGoals :: error", error);
                }
            }
        
            





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