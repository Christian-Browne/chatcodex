import React from 'react';
import { useContext, useMemo } from 'react';
import { ResponseContext } from '../App';
import ResponsePrompt from './ResponsePrompt';

const ResponsePromptList = () => {
  const { responseMessages, isLoading } = useContext(ResponseContext) as any;

  const generateUniqueId = () => {
    const timeStamp = Date.now();
    const randomNumber = Math.random();
    const hexiDecimalString = randomNumber.toString(16);
    return `id-${timeStamp}-${hexiDecimalString}`;
  };

  return (
    <>
      {responseMessages.map(
        (prompt: { message: string; ai: boolean; type: true }) => {
          return (
            <ResponsePrompt
              prompt={prompt}
              isLoading={isLoading}
              key={generateUniqueId()}
            />
          );
        }
      )}
    </>
  );
};

export default ResponsePromptList;
