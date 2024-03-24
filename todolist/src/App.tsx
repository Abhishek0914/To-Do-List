import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from './components/Todo';


function App() {
  const headStyle: React.CSSProperties = {
    textAlign: "center",
  };
  
  return (
    <div>
      <h1 style={headStyle}>Todo List</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
