import React from 'react';
import { Routes, Route } from 'react-router-dom';
import publicRoutes from './routing/public.routes';

const App = () => {
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <route.layout>
              <route.element />
            </route.layout>
          }
        />
      ))}
    </Routes>
  );
};

export default App;
