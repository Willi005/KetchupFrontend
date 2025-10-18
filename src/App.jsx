import './App.css'
import SideBar from "./component/SideBar/SideBar.jsx";
import {FoodCard} from "./component/FoodCard/FoodCard.jsx";
import {SideBarIcon} from "./component/SideBarIcon/SideBarIcon.jsx";

function App() {

    return (
        <div>
            <SideBar/>
            <FoodCard name={'Cangreburger de don camarón'}
                      key={123}
                      price={12.99}
                      category={'burger'}
                      stock={10}
                      imgUrl={'https://imag.bonviveur.com/hamburguesa-clasica_1000.webp'}
            ></FoodCard>
        </div>
    );
}

export default App;