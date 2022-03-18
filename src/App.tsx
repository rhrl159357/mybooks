import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import history from './history';
import Add from './pages/Add';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Error from './pages/Error';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
// import Signin from './pages/Signin';

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error }>
      {/* 호환의 문제로  ConnectedRouter가 작동이 안된다.*/}
      {/* <ConnectedRouter history={history}> */}
        <BrowserRouter>
          <Routes>
            {/* 메인 페이지 */}
            <Route path='/' element={<Home />}/>            
            {/* 로그인 페이지 */}
            {/* <Route path='/signin' element={<Signin />}/> */}
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
      {/* </ConnectedRouter> */}
    </ErrorBoundary>
  );
}

export default App;
