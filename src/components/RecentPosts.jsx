import "../styles.css"; // Import styles
import profilePicture from "../images/profile-picture.png"; // Import the profile picture
import addIcon from "../images/add-icon.png"; // Import the add icon
import { useNavigate } from "react-router-dom";

const RecentPosts = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/create`);
  }

  return (
    <div className="recent-posts">
      <h3 className="recent-posts-heading">Recent Posts</h3>
      <div className="post-card">
        <img className="profile-picture" src={profilePicture} alt="Profile" />
        <span className="create-post-text">
          You did a workout? Create a post!
        </span>
        <img
          className="add-icon"
          src={addIcon}
          alt="Add Post"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default RecentPosts; // Export the RecentPosts component
