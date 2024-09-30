import React from 'react';
import { UserProfileCard, GoalsProgress, WorkoutHistory, ProgressCharts, ExerciseSuggestions } from './index';
import service from '../Appwrite/config';
import authService from '../Appwrite/auth';
import conf from '../conf/Conf';

import { Loader } from 'rsuite';

export default function Dashboard() {
  const [profile, setProfile] = React.useState({
    name: 'n/a',
    age: 'n/a',
    weight: 'n/a',
    hight: 'n/a',
    fitnessGoals: 'n/a',
  });

  const [loading, setLoading] = React.useState(true);

  const getUserInfo = async () => {
    try {
      const userData = await authService.getCurrentUser();
       console.log("id",userData.$id)

      const existingProfile = await service.getUserInformation(conf.appwriteUserInfoCollectionId,userData.$id);
      console.log("existing profile DATA:: ",existingProfile)

      const { name = 'n/a', age = 'n/a', weight = 'n/a', hight = 'n/a', fitnessGoals = 'n/a' } = existingProfile;

      // Update profile and set loading to false
      setProfile({ name, age, weight, hight, fitnessGoals });
    } catch (error) {
      console.error('Error fetching user information:', error);
    } 
  };

  setTimeout(() => {
    setLoading(false)
    
  }, 2500);


  React.useEffect(() => {
    getUserInfo();  


  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Main Content */}
      <main className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Dashboard Content */}
          <div className="flex-1 space-y-8 mt-8 md:mt-0">

          {loading ? ( <div className="flex justify-center items-center min-h-screen ">
        {/* <Loader size="md" /> */}
        <div className="spinner-border text-indigo-600" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

        </div>):""}
            


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {loading? "":(<>

                  <UserProfileCard
                   name= {profile.name}
                   age = {profile.age}
                   weight={profile.weight}
                   height={profile.hight}
                   fitnessGoals={profile.fitnessGoals}/>
                   </>)}
                    <div className= {loading ? ('hidden'):("contents")}>
                    <GoalsProgress tittle="Daily Goals" />
                    <GoalsProgress tittle="Weekly Goals" />
                    </div>

                </div>

                <div className= {loading ? ('hidden'):("contents ")}>
                <WorkoutHistory/>
                </div>
                
               
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div className= {loading ? ('hidden'):("contents ")}>
                <ProgressCharts />
                  <ProgressCharts />
                  <ExerciseSuggestions />
                </div>
                  
                </div>
              
        
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}



