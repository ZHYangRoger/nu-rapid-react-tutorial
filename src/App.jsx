import './App.css';
import Banner from "./components/Banner.jsx";
import {useJsonQuery} from "./utilities/fetch.js";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TermPage from "./components/TermPage.jsx";
import {useState} from "react";

const queryClient = new QueryClient();

const Main = () => {
  const [selected, setSelected] = useState([]);

  const toggleSelected = (course) => setSelected(
    selected.includes(course)
    ? selected.filter(x => x !== course)
    : [...selected, course]
  );

  const [schedule, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!schedule) return <h1>No user data found</h1>;

  return(
      <div className="entire">
        <Banner title={schedule.title}></Banner>
        <TermPage courses={schedule.courses} selected={selected} toggleSelected={toggleSelected}></TermPage>
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