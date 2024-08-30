import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin, SpinProps } from 'antd';

const Loader = ({ ...props }: SpinProps) => (
  <Flex align="center" gap="middle">
    <Spin indicator={<LoadingOutlined spin />} {...props}/>
  </Flex>
);

export default Loader;