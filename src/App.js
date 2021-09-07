import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import './App.css';

import Posts from "./pages/Posts"
import Albums from './pages/Albums';
import Todos from './pages/Todos';

function App() {
  let history = useHistory();

  return (
    <div className="App">
      <Route path="/" exact>
        <button className="posts" onClick={() => history.push("/posts")}>Postagens</button>
        <button className="albums" onClick={() => history.push("/albums")}>Albuns</button>
        <button className="todos" onClick={() => history.push("/todos")}>To-Dos</button>
      </Route>
      <Route path="/posts" component={Posts} />
      <Route path="/albums" component={Albums} />
      <Route path="/todos" component={Todos} />
    </div>
  );
}

export default App;
