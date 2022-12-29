import React, { SetStateAction } from 'react';
import { useState, useContext } from 'react';
import { ResponseContext } from '../App';

import sendIcon from '../assets/send.svg';

const NewChatForm = () => {
  // Loading States
  const [status, setStatus] = useState('typing');

  const {
    responseMessages,
    setResponseMessages,
    setShowWelcomeMessage,
    setLoading,
  } = useContext(ResponseContext) as any;

  // Form States
  const [currentUserPrompt, setCurrentUserPrompt] = useState('');
  /* ************************************************ */

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentUserPrompt.length > 0) {
      // States
      setShowWelcomeMessage(false);
      setResponseMessages([
        ...responseMessages,
        { message: currentUserPrompt, ai: false },
      ]);
      setStatus('submitting');
      setLoading((prev: any) => !prev);
      setCurrentUserPrompt('');

      const response = await fetch('https://chatcodex.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentUserPrompt,
        }),
      });

      setStatus('success');
      setLoading((prev: any) => !prev);

      if (response.ok) {
        const data = await response.json();
        setResponseMessages(
          (
            prevResponses: { message: string; ai: boolean; type: boolean }[]
          ) => [
            ...prevResponses,
            { message: data.bot.trim(), ai: true, type: true },
          ]
        );
      } else {
        const err = await response.text();
        console.log(err);
      }
    }
  };

  return (
    <form>
      <input
        name="prompt"
        placeholder="Ask Codex..."
        onChange={(e) => setCurrentUserPrompt(e.target.value)}
        value={currentUserPrompt}
        onKeyDown={(e) => {
          e.key === 'Enter' && handleSubmit;
        }}
      ></input>
      <button type="submit" onClick={handleSubmit}>
        <img src={sendIcon} />
      </button>
    </form>
  );
};

export default NewChatForm;
