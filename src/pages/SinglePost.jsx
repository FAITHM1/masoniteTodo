import { Link, useParams } from "react-router-dom";

const SinglePost = ({ posts, edit, deleteTodo }) => {
  const params = useParams();
  const id = parseInt(params.id);
  const post = posts.find((p) => p.id === id);
  console.log(post);

  ///////////////////////////////
  //style object
  ////////////////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };
  return (
    <div style={div}>
      <h1>{post?.subject}</h1>
      <h2>{post?.details}</h2>
      <button onClick={() => deleteTodo(post)}>delete</button>
      <button onClick={() => edit(post)}>Edit</button>
      <Link to="/">
        <button>go back</button>
      </Link>
    </div>
  );
};
export default SinglePost;
