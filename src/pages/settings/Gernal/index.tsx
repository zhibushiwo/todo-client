import React, { FC } from 'react';
import SettingSwitch from '@/components/SettingSwitch';
interface IGernal {}

const Gernal: FC<IGernal> = () => {
  return (
    <div>
      <SettingSwitch title='将带有星标的任务移至顶部' />
      <SettingSwitch title='播放完成提示音' />
      <SettingSwitch title='在删除前确认' />
    </div>
  );
};

export default Gernal;
