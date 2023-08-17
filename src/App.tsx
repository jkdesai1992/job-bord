import React, { useState, createContext } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import JobList from './Job/JobList';

interface HeaderContextType {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <HeaderContext.Provider value={{ isModalVisible, setIsModalVisible}}>
      <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-auto py-8">
        <JobList/>
      </main>
      <Footer />
    </div>
    </HeaderContext.Provider>
  );
}

export default App;
