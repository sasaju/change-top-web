import './App.css';
import WebsiteTitle from "./ui/WebsiteTitle";
import {MainPage} from "./ui/body/MainPage";

function App() {
  return (
    <div className="App">
        <WebsiteTitle text="ChangeTop" />
        <MainPage></MainPage>
    </div>
  );
}

export default App;
