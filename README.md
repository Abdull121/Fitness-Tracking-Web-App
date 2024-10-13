# Fitness World

**Fitness World** is a React-based fitness tracking app designed to help users monitor their workouts, track weight progress, and receive personalized exercise recommendations. The app leverages Appwrite for user authentication and data management to track your daily and weekly exercise goals.

## Features

- **User Authentication**: Secure user authentication with email/password and Google Sign-In using Appwrite.
- **Progress Visualization**: Tracks user weight progress over time and displays it using dynamic charts.
- **Personalized Exercise Suggestions**: Offers tailored exercise recommendations based on user data, powered by the App Ninja API.
- **Profile Management**: Users can maintain a fitness profile with key details such as age, height, weight, and fitness goals.
- **Responsive Design**: Built with Tailwind CSS to ensure a responsive and modern UI across devices.
- **Google Sign-In Integration**: Simplifies login process using Google OAuth.

## Key Technologies

### Frontend:
- **React**: The core framework for building the UI components.
- **React Router**: Manages navigation and routing within the app.
- **React Hook Form**: Handles form validation and submission, making user input management easy.
- **Chart.js with React**: Provides visual representations of the user’s progress, such as weight tracking charts.
- **Tailwind CSS**: A utility-first CSS framework simplifying responsive design and styling.
- **Appwrite**: Used for managing user authentication, user profile data, and weight tracking records.
- **App Ninja API**: Provides personalized exercise suggestions based on the user’s profile.

### Backend:
- **Appwrite**: A backend-as-a-service (BaaS) that handles user authentication, data storage (user profiles and workout logs), and session management.

## Getting Started

### Prerequisites:
- **Node.js**: Ensure you have Node.js installed on your system.
- **NPM**: Node package manager comes bundled with Node.js.
- **Appwrite Account**: You’ll need an Appwrite project set up for authentication and data management.
- **App Ninja API Key**: Obtain an API key from App Ninja for exercise suggestions.

### Installation:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/fitness-world.git
    cd fitness-world
    ```

2. **Install dependencies**:
    Run the following command to install the necessary dependencies:
    ```bash
    npm install
    ```


### Project Structure:
- `src/components/`: Contains reusable components like the `ProgressCharts`, `UserProfile`, etc.
- `src/Appwrite/`: Appwrite authentication and service configurations.
- `src/pages/`: Different pages like `Login`, `Dashboard`, `Profile`, etc.

## Deployment

The app is hosted on **Vercel** for easy deployment. To deploy your instance of Fitness World:

1. Push your code to a Git repository (GitHub, GitLab, etc.).
2. Link your repository to **Vercel**.
3. Add the required environment variables in the Vercel dashboard.
4. Deploy the project and enjoy real-time updates with seamless CI/CD integration.

## Dependencies

Here are the key dependencies used in the Fitness World project:

### Core Dependencies:
- **React**: For building the user interface.
- **React Router**: For handling page routing within the application.
- **React Hook Form**: For managing form inputs and validation.
- **Chart.js**: Used for rendering progress charts to track user metrics.
- **Appwrite SDK**: Manages authentication, databases, and API calls to Appwrite.

### Dev Dependencies:
- **Vite**: The build tool for fast frontend development.
- **Tailwind CSS**: Provides utility-based CSS for responsive design.
- **ESLint**: Linting tool to ensure code quality.
- **PostCSS & Autoprefixer**: Handles CSS processing for cross-browser compatibility.

## API Integrations

### Appwrite
- **Authentication**: Email/password authentication and Google OAuth for secure login and user management.
- **Database**: Stores user profile data and weight logs securely in collections.
- **Sessions**: Manages user sessions and ensures that the user stays logged in securely.

### App Ninja API
- **Exercise Suggestions**: Fetches tailored exercise suggestions based on user profiles, ensuring workouts align with their fitness goals.

## Future Improvements

- **Workout Logging**: Add the ability for users to log completed workouts and track calories burned.
- **Progress Insights**: Provide deeper insights into user progress with trend analysis and predictions.
- **Community Features**: Enable social features such as workout sharing and progress comparison with friends.

## Contributing

We welcome contributions from the community! If you want to contribute:
1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request once your changes are tested.

## License

This project is licensed under the MIT License. You are free to modify and distribute the code, provided you include the original license in any substantial copies of the software.


### Screen Shots

![fitness-world](https://github.com/user-attachments/assets/a85fc7ad-d4f3-4363-ae1b-618e3c7ac7b9)

![update-dashboard](https://github.com/user-attachments/assets/c96c9738-7e52-4745-9692-7544c8c03340)

![fitness-dashboard](https://github.com/user-attachments/assets/b5390ec8-ae6e-43db-9346-d4e13e1fb3ac)



