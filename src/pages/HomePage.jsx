import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import TodayWorkoutCard from "../components/TodayWorkoutCard";
import RecentPosts from "../components/RecentPosts";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from Firebase
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://fitup-b88a5-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      );
      const data = await response.json();

      if (data) {
        setPosts(Object.entries(data).map(([id, post]) => ({ id, ...post })));
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Delete post from Firebase and update local state
  const handleDeletePost = async (postId) => {
    try {
      // Delete the post from Firebase using its Firebase key
      await fetch(
        `https://fitup-b88a5-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`,
        {
          method: "DELETE",
        }
      );
      // Remove the post from the local state after deletion
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <TopBar />
      <TodayWorkoutCard />
      <RecentPosts />
      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}  // Pass the Firebase-generated key (id)
              profilePicture={post.profilePicture}
              name={post.name}
              date={post.date}
              caption={post.caption}
              exercises={post.exercises}
              likes={post.likes}
              comments={post.comments}
              onDelete={handleDeletePost}  // Pass the delete handler
            />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;