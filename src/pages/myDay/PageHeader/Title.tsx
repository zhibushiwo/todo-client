import React, { FC } from 'react';

interface ITitle {}

const Title: FC<ITitle> = () => {
  return (
    <div
      style={{
        fontSize: 24,
        color: '#fff',
      }}
    >
      Title
    </div>
  );
};

export default Title;
