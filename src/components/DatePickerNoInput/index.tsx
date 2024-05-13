import React, {
  FC,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
} from 'react';
import { DatePicker, DatePickerProps } from 'antd';
import styles from './style.module.less';
interface IDatePickerNoInput extends DatePickerProps {}

export interface IDatePickerNoInputRef {
  setVisible: (visible: boolean) => void;
}

const DatePickerNoInput = forwardRef<IDatePickerNoInputRef, IDatePickerNoInput>(
  ({ className, onChange, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const popRef = useRef<any>(null);
    useImperativeHandle(
      ref,
      () => {
        return {
          setVisible: (visible: boolean) => {
            setVisible(visible);
          },
        };
      },
      []
    );

    useEffect(() => {
      const eventLisener: EventListener = e => {
        if (popRef.current.contains(e.target)) {
          e.stopPropagation();
          return;
        }
        if (visible) {
          setVisible(false);
        }
      };
      window.addEventListener('mousedown', eventLisener, false);
      return () => {
        window.removeEventListener('mousedown', eventLisener, false);
      };
    }, [visible, popRef.current]);
    return (
      <DatePicker
        {...props}
        open={visible}
        className={`${styles['datepick-no-input']}`}
        getPopupContainer={trigger => {
          let parent = trigger.parentElement!;
          popRef.current = parent;
          return parent;
        }}
        onChange={(...arg) => {
          setVisible(false);
          onChange?.(...arg);
        }}
        ref={popRef}
      ></DatePicker>
    );
  }
);

export default DatePickerNoInput;
