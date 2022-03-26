import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from './MyComponents/Todos';
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am onDelete", todo);

    settodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno = 1;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    settodos([...todos, myTodo]);
    console.log(myTodo)





  }


  const [todos, settodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos])

  // {
  //   sno:1,
  //   Title: "Go to do market",
  //   desc: "Go means Go"
  // },
  // {
  //   sno:2,
  //   Title: "Go to do mall",
  //   desc: "Go means Go 1"
  // },
  // {
  //   sno:3,
  //   Title: "Go to do game Zone",
  //   desc: "Go means Go 2"
  // }

  return (
    <>
      <Router>
        <Header title="My Todo List" searchbar={false} />
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            )
          }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>

        </Switch>





        <Footer />
      </Router>
    </>
  );
}

export default App;
