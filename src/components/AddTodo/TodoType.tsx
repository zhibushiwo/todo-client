import React, { FC } from 'react';
interface ITodoType {
  icon: React.ReactNode;
  text: string;
}

const TodoType: FC<ITodoType> = ({ icon, text }) => {
  return (
    <>
      {icon}
      {text}
    </>
  );
};

export default TodoType;
