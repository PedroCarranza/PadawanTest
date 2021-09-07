import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Posts from "./pages/Posts"
import Albums from './pages/Albums';
import Todos from './pages/Todos';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact>
          <button className="posts" onClick={() => window.location.replace("/posts")}>Postagens</button>
          <button className="albums" onClick={() => window.location.replace("/albums")}>Albuns</button>
          <button className="todos" onClick={() => window.location.replace("/todos")}>To-Dos</button>
        </Route>
        <Route path="/posts" component={Posts} />
        <Route path="/albums" component={Albums} />
        <Route path="/todos" component={Todos} />
      </BrowserRouter>
    </div>
  );
}

export default App;
