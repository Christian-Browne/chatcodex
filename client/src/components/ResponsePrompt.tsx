import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ResponseContext } from '../App';

import botIcon from '../assets/bot.svg';
import userIcon from '../assets/user.svg';

import Loader from './Loader';

interface Props {
  prompt: {
    message: string;
    ai: boolean;
    type: boolean;
  };
  isLoading: boolean;
}

const ResponsePrompt = ({ prompt }: Props) => {
  const { responseMessages, isLoading } = useContext(ResponseContext) as any;

  const [typedMessage, setTypedMessage] = useState(prompt.message);

  useEffect(() => {
    let i = 0;
    if (typeof prompt.message === 'string' && prompt.type === true) {
      const interval = setInterval(() => {
        if (i <= prompt.message.length) {
          setTypedMessage((prev) => (prev += prompt.message.charAt(i)));
          i++;
        } else {
          prompt.type = false;
          clearInterval(interval);
        }
      }, 20);

      return () => {
        clearInterval(interval);
      };
    }
  }, [responseMessages]);

  return (
    <div className={`wrapper ${prompt.ai && 'ai'}`}>
      <div className="chat">
        <div className="profile">
          <img src={prompt.ai ? botIcon : userIcon} alt="" />
        </div>
        <div className="message">
          {isLoading === true ? <Loader /> : null}
          <>{<Loader /> && typedMessage}</>
        </div>
      </div>
    </div>
  );
};
export default ResponsePrompt;
