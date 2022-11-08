import './App.css';
import {useJsonQuery} from "./utilities/fetch.js";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TermPage from "./components/TermPage.jsx";
import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditForm from "./components/EditForm";
import { useDbData } from "./utilities/firebase";
import Navigation from './components/Navigation';

const queryClient = new QueryClient();

const Main = () => {
  const [selected, setSelected] = useState([]);

  const toggleSelected = (id) => setSelected(
    selected.includes(id)
    ? selected.filter(x => x !== id)
    : [...selected, id]
  );

  const [data, error] = useDbData('/');

  console.log(data);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (!data) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return(
      <div className="entire">
        <Navigation title={data.title}></Navigation>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TermPage courses={data.courses} selected={selected} toggleSelected={toggleSelected} />} />
            <Route path="/edit/:id" element={<EditForm courses={data.courses} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
};

const App = () => (
  <div className="entire">
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  </div>
);

export default App;