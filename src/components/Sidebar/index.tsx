import React from "react";
import { Drawer, DrawerProps } from "antd";

const Sidebar = ({ open, onClose, placement, title, children }: DrawerProps) => {
  return (
    <Drawer
      title={title}
      placement={placement}
      closable={false}
      onClose={onClose}
      open={open}
      key={placement}
    >
      {children}
    </Drawer>
  );
};

export default Sidebar;
