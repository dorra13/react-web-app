import "../styles.css"; // Import styles
import workoutImage from "../images/today-workout.png"; // Import the image

const TodayWorkoutCard = () => {
  return (
    <div className="today-workout-card">
      <img
        className="workout-background"
        src={workoutImage}
        alt="Workout Background"
      />
      <div className="text-container">
        <h2 className="today-text">Today is</h2>
        <h1 className="leg-day-text">LEG DAY</h1>
      </div>
      <button className="start-workout-button">Start Workout</button>
    </div>
  );
};

export default TodayWorkoutCard; // Export the TodayWorkoutCard component
