import { useContext } from "react";
import { HeaderContext } from "../App";


const Header = () => {
    const context = useContext(HeaderContext);

    const handleToggleModal = () => {
        context?.setIsModalVisible(!context?.isModalVisible);
    };

    return (
        <header className="bg-blue-500 p-4 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    Logo
                </div>
                <div className="flex items-center text-white">
                    <button onClick={handleToggleModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Create Job
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
