import { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

// import { Home, Test } from './inc';
import { PostListPage, LoginPage, RegisterPage, WritePage, PostPage, HomePage } from './pages';
import './App.css';


const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState(null);
  const [update, setUpdate] = useState(false);

  const insertData = async (e) => {
    const body = { name: name };
    const res = await axios('/add/data', {
      method: 'POST',
      data: body,
      headers: new Headers()
    })

    if (res.data) {
      alert('데이터 추가 완료');
      // window.location.reload();
      getData();
    }
  }

  const onChange = (e) => {
    setName(e.target.value);
  }

  const getData = async (e) => {
    const res = await axios('/get/data', {
      method: 'GET'
    });

    if (res.data[0] === undefined) {
      let cover = [];
      cover.push(res.data);
      return setList(cover);
    }
    setList(res.data);
  }

  const updateData = async (el) => {

    const update = prompt(el.name + '을 수정하시겠습니까?');

    if (update !== null) {
      const body = {
        name: update,
        id: el.id
      }

      const res = await axios('/update/data', {
        method: 'POST',
        data: { 'update': body },
        headers: new Headers()
      })

      if (res.data) {
        alert('데이터 수정 완료');
        // return window.location.reload();
        getData();
      }
    }
  }

  const deleteData = async (el) => {
    const remove = window.confirm(el.name + '을 삭제하시겠습니까?');

    if (remove) {
      const body = { id: el.id }
      const res = await axios('/delete/data', {
        method: 'POST',
        data: { 'delete': body },
        headers: new Headers()
      })

      if (res.data) {
        alert('데이터 삭제 완료');
        // return window.location.reload();
        getData();
      }
    }
  }

  useEffect(() => {
    // getData();
  }, []);

  return (
    <>
      {/* <div>
        <Link to='/'>Home</Link> <Link to='/test'>Test</Link>
      </div>

      <Route path='/' component={Home} exact />
      <Switch>
        <Route path='/test/:name' component={Test} />
        <Route path='/test' component={Test} />
      </Switch> */}
      {/* <div style={{ width: 230, margin: '10px auto' }}>
        <form method='POST' onSubmit={insertData} >
          <input type='text' maxLength='20' onChange={(e) => onChange(e)} />
          <input type='submit' value='입력' style={{ marginLeft: 10 }} />
        </form>
      </div>
      <hr />
      <div style={{ height: '450px', overflow: 'auto' }}>
        <h2 style={{ color: '#ababab', textAlign: 'center' }}> Sports List </h2>
        <div style={{ border: 'solid 1px black', width: '50%', marginLeft: '25%', textAlign: 'left' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '32% 35% 30%', textAlign: 'center' }}>
            <div> Number </div>
            <div> Name </div>
            <div> Other </div>
          </div>
        </div>

        {list !== null
          ? list.map((el, key) => {
            return (
              <div key={key} style={{ display: 'grid', lineHeight: '40px', gridTemplateColumns: '32% 35%', width: '50%', marginLeft: '25%', textAlign: 'center' }}>
                <div> {el.id} </div>
                <div> {el.name} </div>
                <button style={{ width: 100 }}
                  onClick={() => updateData(el)}>수정하기
                </button>
                <button
                  style={{ width: 100 }}
                  onClick={() => deleteData(el)}> 삭제삭제
                </button>
              </div>
      )
          })
          : null}
    </div> */}
      <Route component={HomePage} path='/' exact />
      <Route component={PostListPage} path='/postList' />
      <Route component={LoginPage} path='/login' />
      <Route component={RegisterPage} path='/register' />
      <Route component={WritePage} path='/write'/>
      <Route component={PostPage} path='/post/:id' />
    </>
  );
}

export default App;
