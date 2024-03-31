import React, { FC } from 'react';
import {
  UserAddOutlined,
  TeamOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
interface ITools {
  isShare?: boolean;
}

const Tools: FC<ITools> = ({ isShare }) => {
  return (
    <div
      style={{
        fontSize: 18,
      }}
    >
      <span
        style={{
          marginRight: 8,
          background: '#ddd',
          borderRadius: 4,
          padding: '4px 6px',
        }}
      >
        {isShare ? <TeamOutlined /> : <UserAddOutlined />}
      </span>
      <span
        style={{
          background: '#ddd',
          borderRadius: 4,
          padding: '4px 6px',
        }}
      >
        <EllipsisOutlined />
      </span>
    </div>
  );
};

export default Tools;
