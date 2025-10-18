import './App.css'
import SideBar from "./component/SideBar/SideBar.jsx";
import {FoodGrid} from "./component/FoodGrid/FoodGrid.jsx";

function App() {

    return (
        <main>
            <div className={'content-container'}>
                <SideBar/>
                <FoodGrid></FoodGrid>
            </div>
        </main>
    );
}

export default App;