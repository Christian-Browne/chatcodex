import { useState, createContext } from 'react';
// Components
import Loader from './components/Loader';
import ResponsePrompt from './components/ResponsePrompt';
import NewChatForm from './components/NewChatForm';
import ResponsePromptList from './components/ResponsePromptList';

import './App.css';
//Icons
import sendIcon from './assets/send.svg';
import codexWelcome from './assets/codexwelcome.svg';

export const ResponseContext = createContext(null) as any;

const App = () => {
  //* Store CHAT GPT Data in this state
  const [responseMessages, setResponseMessages] = useState<
    { message: string; ai: boolean }[]
  >([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [isLoading, setLoading] = useState(false);

  /* ************************************************************************************ */

  return (
    <ResponseContext.Provider
      value={
        {
          responseMessages,
          setResponseMessages,
          setShowWelcomeMessage,
          isLoading,
          setLoading,
        } as any
      }
    >
      <div id="app">
        <div id="chat_container">
          {showWelcomeMessage && (
            <div className="welcome">
              <div className="welcome-logo">
                <img src={codexWelcome} alt="" />
              </div>
              <div className="welcome-text">
                <h1>Chat Codex</h1>
                <p>Your Coding AI</p>
              </div>
            </div>
          )}
          <ResponsePromptList />
        </div>
        <NewChatForm />
      </div>
    </ResponseContext.Provider>
  );
};

export default App;
