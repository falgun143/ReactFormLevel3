import  SurveyFormSummary  from "./components/SurveryFormSummary";
import SurveyForm from "./components/SurveyForm";
import  {GettingStarted} from "./components/GettingStarted"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<GettingStarted />} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/summary" element={<SurveyFormSummary />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
