import { useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useImmerRef } from './hooks/useImmerRef';

function App() {
  const [state, setState, ref] = useImmerRef<number | undefined>();
  const [state2, setState2, ref2] = useImmerRef({
    count: 0,
    test: {
      test1: 0,
    },
  });

  useEffect(() => {
    console.log('=> App.tsx:17 ~ state2', state2);
    console.log('=> App.tsx:18 ~ ref2.current', ref2.current);
    console.log('=> App.tsx:19 ~ state2 === ref2.current', state2 === ref2.current);
  }, [state2]);

  return (
    <div className="App">
      <div>
        <a
          href="https://vitejs.dev"
          target="_blank"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://reactjs.org"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setState(state !== undefined ? state + 1 : 0);
            console.log('=> App.tsx:51 ~ state', state);
            console.log('=> App.tsx:52 ~ ref.current', ref.current);
          }}
        >
          state is {state ?? 'undefined'}
        </button>
        <button
          onClick={() => {
            setState2(dr => {
              dr.count += 1;
            });
            console.log('=> App.tsx:62 ~ state2.count', state2.count);
            console.log('=> App.tsx:63 ~ ref2.current.count', ref2.current.count);
          }}
        >
          count is {state2.count}
        </button>
        <button
          onClick={() => {
            setState2(dr => {
              dr.test.test1 += 1;
            });
            console.log('=> App.tsx:73 ~ state2.test.test1', state2.test.test1);
            console.log('=> App.tsx:74 ~ ref2.current.test.test1', ref2.current.test.test1);
          }}
        >
          test1 is {state2.test.test1}
        </button>

        <button
          onClick={() => {
            setState2({
              count: -99,
              test: {
                test1: -99,
              },
            });
            // state2.test.test1 = 0;
            console.log('=> App.tsx:89 ~ state2.test.test1', state2.test.test1);
            console.log('=> App.tsx:90 ~ ref2.current.test.test1', ref2.current.test.test1);
          }}
        >
          test1 is {state2.test.test1}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
