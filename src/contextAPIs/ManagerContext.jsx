import { createContext, useContext, useState, useEffect } from "react";
import managersData from "../data/managers.json"; // Import JSON data

const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
    const [managers, setManagers] = useState({});

    useEffect(() => {
        setManagers(managersData); // Load managers data
        console.log("Managers Data Loaded:", managersData); // Log manager data

    }, []);

    return (
        <ManagerContext.Provider value={managers}>
            {children}
        </ManagerContext.Provider>
    );
};

export const useManager = () => {
    return useContext(ManagerContext);
};
