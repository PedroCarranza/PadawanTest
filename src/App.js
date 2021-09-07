import { Route, useHistory } from 'react-router-dom';
import './App.css';

import Nav from "./components/Nav"

import Posts from "./pages/Posts"
import Albums from './pages/Albums';
import Todos from './pages/Todos';

function App() {
  let history = useHistory();

  return (
    <div className="App">
      <Route path="/" exact>
        <div className="outer">
          <div className="middle">
            <div className="inner">
              <h3>Vamos utilizar a API presente em&nbsp;
                <a href="https://jsonplaceholder.typicode.com">Json Placeholder</a>
                <br /> Para isso escolha qual das opções abaixo gostaria de acessar:
              </h3>
              <div className="buttons">
                <button className="postsButton" onClick={() => history.push("/posts")}>Postagens</button>
                <button className="albumsButton" onClick={() => history.push("/albums")}>Álbuns</button>
                <button className="todosButton" onClick={() => history.push("/todos")}>TO-DOs</button>
              </div>
            </div>
          </div>
        </div>

      </Route>
      <Route path="/posts">
        {Nav()}
        {Posts()}
      </Route>
      <Route path="/albums">
        {Nav()}
        {Albums()}
      </Route>
      <Route path="/todos">
        {Nav()}
        {Todos()}
      </Route>
    </div>
  );
}

export default App;
