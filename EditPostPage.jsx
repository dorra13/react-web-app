import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPostPage = () => {
  const { id } = useParams(); 
  const [postDetails, setPostDetails] = useState(null);
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `https://fitup-b88a5-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`
        );
        const data = await response.json();
        if (data) {
          setPostDetails(data);
          setCaption(data.caption);
          setDate(data.date);
          setExercises(data.exercises);
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchPostDetails();
  }, [id]);

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedPost = {
      caption,
      date,
      exercises,
      comments: postDetails.comments, 
      likes: postDetails.likes,
      name: postDetails.name, 
      profilePicture: postDetails.profilePicture, 
    };

    try {
      const response = await fetch(
        `https://fitup-b88a5-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`,
        {
          method: "PUT", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPost),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      alert("Post updated successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  if (!postDetails) return <p>Loading...</p>;

  return (
    <div className="create-workout-container">
      <button type="button" onClick={() => navigate("/")}>
        Return to Home
      </button>
      <h2>Edit Post</h2>
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
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
