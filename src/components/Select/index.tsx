import { Select as AntdSelect, SelectProps } from "antd";

const Select = ({ ...props }: SelectProps) => {
    return <AntdSelect {...props} />;
};  

export default Select;