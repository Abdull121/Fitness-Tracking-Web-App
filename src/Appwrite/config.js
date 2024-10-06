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


            //<--update Daily Goals-->


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


            //weekly Goals

            async weeklyGoals(docId, {
                caloriesBurned,
                outOfCaloriesBurned,
                stepsTaken,
                targetSteps,
                spendWorkoutTimeMinutes, 
                outOfWorkoutTimeMinutes,
            }) {
                try {
                    return await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteWeeklyGoalsCollectionId,
                        docId,
                        {
                            caloriesBurned,                
                            outOfCaloriesBurned:outOfCaloriesBurned,
                            stepsTaken,
                            targetSteps,
                            spendWorkoutTimeMinutes,
                            outOfWorkoutTimeMinutes,
                        }
                    );
                } catch (error) {
                    console.log("Appwrite service :: weeklyGoals :: error", error);
                }
            }


              




              //<--update Weekly Goals-->


              async updateWeeklyGoals(docId, {
                caloriesBurned,
                stepsTaken,
                spendWorkoutTimeMinutes, 
               }){
                try {
                    return await this.databases.updateDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteWeeklyGoalsCollectionId,
                        docId,
                        {
                            caloriesBurned,                
                            stepsTaken,
                            spendWorkoutTimeMinutes,
                            
        
                        }
                    )
                } catch (error) {
                    console.log("Appwrite service :: updateGoals :: error", error);
                }
            }



            // weight progress Adding weight


            async addWeight(weight,userId){
                try {
                    return await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteWeightProgressCollectionId,
                        ID.unique(),
                        
                        {
                            weight,
                            userId,
                        }
                    )
                } catch (error) {
                    console.log("Appwrite service :: Adding Weight :: error", error);
                }
            }


            // get weight data

            async getAllWeights(userId){
                try {
                    return await this.databases.listDocuments(
                        conf.appwriteDatabaseId,
                        conf.appwriteWeightProgressCollectionId,
                         [Query.equal('userId', userId)]
                      
                        
        
                    )
                } catch (error) {
                    console.log("Appwrite service :: getWeight :: error", error);
                    return false
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

    

    // getFilePreview(fileId){
    //     return this.bucket.getFilePreview(
    //         conf.appwriteBucketId,
    //         fileId
    //     )
    // }
}


const service = new Service()
export default service