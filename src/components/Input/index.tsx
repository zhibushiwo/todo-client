import { Input } from 'antd';
import type { InputProps } from 'antd';

interface ITodoInput extends InputProps {
  onEnter?: (value: string) => void;
}

export default (props: ITodoInput) => {
  const { className, onKeyDown, onEnter, ...otherProps } = props;
  const onInputKeyDown: React.KeyboardEventHandler<
    HTMLInputElement
  > = event => {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      onEnter?.(input.value);
      input.blur();
      input.value = '';
    }
    onKeyDown?.(event);
  };

  return (
    <Input
      {...otherProps}
      className={`todo-input ${className}`}
      onKeyDown={onInputKeyDown}
    />
  );
};
