//import hooks

import { useState, useEffect } from "react";
//import router 6 componets (route -> Router, switch -> Routes)
import { Route, Routes, Link, useNavigate } from "react-router-dom";
// import our componets
import AllPost from "./pages/AllPost";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";
//style .js
const h1 = {
  textAlign: "center",
  margin: "10px",
};

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto",
};
function App() {
  const url = "https://fmmason-todo-backend.herokuapp.com/todos/";
  const [posts, setPosts] = useState([]);

  //////////////
  // Functions
  //////////////
  const navigate = useNavigate();
  //function to get list of todos from API
  const getTodos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };
  // an empty todo for intizalilizing the create form
  const nullTodo = {
    subject: "",
    details: "",
  };
  const [targetTodo, setTargetTodo] = useState(nullTodo);

  const addTodos = async (newTodo) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    getTodos();
  };

  //select a todo to edit
  const getTargetTodo = (todo) => {
    setTargetTodo(todo);
    navigate("/edit");
  };
  // update todo for out handlesubmit prop
  const updateTodo = async (todo) => {
    await fetch(url + todo.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    getTodos();
  };

  const deleteTodo = async (todo) => {
    await fetch(url + todo.id, {
      method: "delete",
    });
    getTodos();
    navigate("/");
  };
  //////////////
  // useEffects
  //////////////
  useEffect(() => {
    getTodos();
  }, []);
  ////////////////
  // return jsx
  return (
    <div className="App">
      <h1 style={h1}>My todo List</h1>
      <Link to="/new">
        <button style={button}>create todo</button>
      </Link>
      <Routes>
        <Route path="/" element={<AllPost posts={posts} />} />
        <Route
          path="/post/:id"
          element={
            <SinglePost
              posts={posts}
              edit={getTargetTodo}
              deleteTodo={deleteTodo}
            />
          }
        />

        <Route
          path="/new"
          element={
            <Form
              initialTodo={nullTodo}
              handleSubmit={addTodos}
              buttonLabel="create todo"
            />
          }
        />
        <Route
          path="/edit"
          element={
            <Form
              initialTodo={targetTodo}
              handleSubmit={updateTodo}
              buttonLabel="update Todo"
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
