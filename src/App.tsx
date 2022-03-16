import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom'
import Add from './pages/Add';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Error from './pages/Error';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error }>
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          <Route path='/' element={<Home />}/>            
          {/* 로그인 페이지 */}
          <Route path='/signin' element={<Signin />}/>
          {/* 책장 만들기 */}
          <Route path='/add' element={<Add />}/>
          {/* 책장 세부정보 */}
          <Route path='/book/:id' element={<Detail />}/>
          {/* 책장 수정 */}
          <Route path='/edit/:id' element={<Edit />}/>
          {/* 잘못된 페이지 */}
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
