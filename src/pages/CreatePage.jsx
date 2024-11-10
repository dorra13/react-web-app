import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../images/profile-picture.png";

const CreateWorkoutPage = () => {
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", weight: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: 0, reps: 0, weight: 0 }]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newWorkout = {
      caption,
      date,
      exercises,
      comments: 0,
      likes: 0,
      name: "Sarah",
      profilePicture: profileImage,
    };

    try {
      const response = await fetch(
        "https://fitup-b88a5-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newWorkout),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create workout");
      }

      setCaption("");
      setDate("");
      setExercises([{ name: "", sets: "", reps: "", weight: "" }]);
      alert("Workout created successfully!");
      navigate("/"); // Navigate back to the home page after creating
    } catch (error) {
      console.error("Error creating workout:", error);
      alert("Failed to create workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-workout-container">
      <button type="button" onClick={() => navigate("/")}>Return to Home</button>
      <h2>Create New Workout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Caption:</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>Exercises</h3>
          {exercises.map((exercise, index) => (
            <div key={index} className="exercise-input">
              <input
                type="text"
                placeholder="Exercise Name"
                value={exercise.name}
                onChange={(e) =>
                  handleExerciseChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="number"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) =>
                  handleExerciseChange(index, "sets", e.target.value)
                }
                required
              />
              <input
                type="number"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) =>
                  handleExerciseChange(index, "reps", e.target.value)
                }
                required
              />
              <input
                type="number"
                placeholder="Weight"
                value={exercise.weight}
                onChange={(e) =>
                  handleExerciseChange(index, "weight", e.target.value)
                }
                required
              />
              {exercises.length > 1 && (
                <button type="button" onClick={() => removeExercise(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addExercise}>
            Add Exercise
          </button>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Workout"}
        </button>
      </form>
    </div>
  );
};

export default CreateWorkoutPage;
