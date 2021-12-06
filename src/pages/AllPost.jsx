import Post from "../components/post";

const AllPost = (props) => {
  // for each post in the array render a post compents
  return props.posts.map((post) => {
    return <Post key={post.id} post={post} />;
  });
};
export default AllPost;
