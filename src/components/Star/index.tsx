import { StarFilled, StarOutlined } from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

interface IStar extends IconComponentProps {
  star?: boolean;
}

const Star = ({ star, ...props }: IStar) => {
  const Comp = star ? StarFilled : StarOutlined;
  return <Comp {...props} />;
};

export default Star;
