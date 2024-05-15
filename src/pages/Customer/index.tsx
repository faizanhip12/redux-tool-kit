import React,{useState} from 'react'
import Table from '../../components/Table/index'
import Dialog from '../../components/Modal/index'
function Customer() {

    const [open, setOpen] =useState(false);
    const [childModalOpen, setChildModalOpen] =useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChildModalOpen = () => {
      setChildModalOpen(true);
    };
  
    const handleChildModalClose = () => {
      setChildModalOpen(false);
    };

    return (
        <>
            <div>
           
           <button><button onClick={handleChildModalOpen}>modal</button></button>

            </div>

            <div>
                <Table />
                <Dialog open={childModalOpen} handleClose={handleChildModalClose} />
            </div>
            
        </>
    )
}

export default Customer