import {FoodGrid} from "../../component/FoodGrid/FoodGrid.jsx";
import {HomeHeader} from "../../component/HomeHeader/HomeHeader.jsx";
import {CategoriesSlider} from "../../component/CategoriesSlider/CategoriesSlider.jsx";
import {OrderPanel} from "../../component/OrderPanel/OrderPanel.jsx";
import './HomePage.css';

export function HomePage() {
    return (
        <div className="homepage-layout">

            <div className="homepage-main-area">

                <div className="homepage-header-container">
                    <HomeHeader/>
                    <CategoriesSlider/>
                </div>

                <main className="homepage-content-scroller">
                    <FoodGrid/>
                </main>

            </div>
            <aside className="homepage-order-panel-wrapper">
                <OrderPanel/>
            </aside>

        </div>
    )
}