import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";



const Root = () => {
    return (
        <div>

            <div className="sticky top-0 z-1">


            <Header></Header>
            </div>

            <Outlet></Outlet>
            <Footer></Footer>


            
        </div>
    );
};

export default Root;