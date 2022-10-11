import './App.css';
import Banner from "./components/Banner.jsx";
import {useJsonQuery} from "./utilities/fetch.js";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TermPage from "./components/TermPage.jsx";
import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditForm from "./components/EditForm";

const queryClient = new QueryClient();

const Main = () => {
  const [selected, setSelected] = useState([]);

  const toggleSelected = (id) => setSelected(
    selected.includes(id)
    ? selected.filter(x => x !== id)
    : [...selected, id]
  );

  const [schedule, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!schedule) return <h1>No user data found</h1>;

  return(
      <div className="entire">
        <Banner title={schedule.title}></Banner>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TermPage courses={schedule.courses} selected={selected} toggleSelected={toggleSelected} />} />
            <Route path="/edit/:id" element={<EditForm courses={schedule.courses} />} />
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