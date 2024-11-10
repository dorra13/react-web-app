import optionsIcon from "../images/options-icon.png";

const PostCard = ({
  id,
  profilePicture,
  name,
  date,
  caption,
  exercises,
  likes,
  comments,
  onDelete,
}) => {
  const handleDelete = (event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(id);
    }
  };

  return (
    <div className="post-card" onClick={handleDelete}>
      <div className="post-header">
        <img src={profilePicture} alt={name} className="profile-picture" />
        <div className="post-info">
          <p className="post-name">{name}</p>
          <p className="post-date">{date}</p>
        </div>
        {name === "Sarah" && (
          <button onClick={handleDelete} className="delete-button">
            ❌
          </button>
        )}
        <img src={optionsIcon} alt="Options" className="options-icon" />
      </div>
      <p className="post-caption">{caption}</p>
      <table className="exercise-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <tr key={index}>
              <td>{exercise.name}</td>
              <td>{exercise.sets}</td>
              <td>{exercise.reps}</td>
              <td>{exercise.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="likes-comments">
        <span className="likes">{likes} 💪</span>
        <span className="comments">{comments} 💬</span>
      </div>
    </div>
  );
};

export default PostCard;
