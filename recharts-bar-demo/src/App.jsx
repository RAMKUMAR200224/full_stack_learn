import RevenueBarChart from "./components/RevenueBarChart";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Revenue Dashboard</h1>

      <div className="card">
        <h2>Monthly Revenue</h2>

        <RevenueBarChart />
      </div>
    </div>
  );
}

export default App;