import React, { useState, forwardRef } from 'react';
import { Input as AntdInput } from 'antd';

import type { InputProps, InputRef } from 'antd';
import { KEY_ENUM } from '@/constant/enum';
import { TextAreaProps } from 'antd/es/input';
const { TextArea: AntdTextArea } = AntdInput;

interface ITodoInput extends InputProps {
  onEnter?: (value: string) => void;
}

interface ITodoTextArea extends TextAreaProps {
  onEnter?: (value: string) => void;
}

// TODO 重复代码

const Input = forwardRef<InputRef, ITodoInput>((props, ref) => {
  const {
    className,
    onKeyDown,
    onEnter,
    value: propsValue,
    onChange: propsOnChange,
    ...otherProps
  } = props;

  const [value, setValue] = useState(propsValue);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
    propsOnChange?.(e);
  };

  const onInputKeyDown: React.KeyboardEventHandler<
    HTMLInputElement
  > = event => {
    if (event.key === KEY_ENUM.ENTER) {
      event.preventDefault();
      const input = event.target as HTMLInputElement;
      onEnter?.(input.value);
      onChange({
        target: {
          value: '',
        },
      } as React.ChangeEvent<HTMLInputElement>);
      // input.blur();
    }
    onKeyDown?.(event);
  };

  return (
    <AntdInput
      value={value}
      onChange={onChange}
      {...otherProps}
      className={`todo-input ${className}`}
      onKeyDown={onInputKeyDown}
      ref={ref}
    />
  );
});

export const TextArea = (props: ITodoTextArea) => {
  const {
    className,
    onKeyDown,
    onEnter,
    value: propsValue,
    onChange: propsOnChange,
    ...otherProps
  } = props;

  const [value, setValue] = useState(propsValue);

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    setValue(e.target.value);
    propsOnChange?.(e);
  };

  const onInputKeyDown: React.KeyboardEventHandler<
    HTMLTextAreaElement
  > = event => {
    if (event.key === KEY_ENUM.ENTER) {
      event.preventDefault();
      const input = event.target as HTMLTextAreaElement;
      onEnter?.(input.value);
      onChange({
        target: {
          value: '',
        },
      } as React.ChangeEvent<HTMLTextAreaElement>);
      // input.blur();
    }
    onKeyDown?.(event);
  };

  return (
    <AntdTextArea
      value={value}
      onChange={onChange}
      {...otherProps}
      className={`todo-input ${className}`}
      onKeyDown={onInputKeyDown}
    />
  );
};

export default Input;
