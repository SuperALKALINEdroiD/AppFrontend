import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Open Sidebar</Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} >
        <div className="drawer">
          { "test" } 
        </div>
      </Drawer>
    </>
  );
}
