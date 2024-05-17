import React,{useState} from 'react'
import Table from '../../components/Table/index'
import Dialog from '../../components/Modal/index'
function Customer() {

    const [open, setOpen] =useState(false);
    const [childModalOpen, setChildModalOpen] =useState(false);
    const [value, setValue] = React.useState("create");
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChildModalOpen = (value:any) => {
      setChildModalOpen(true);
      setValue(value)
    };
  
    const handleChildModalClose = () => {
      setChildModalOpen(false);
    };

    return (
        <>
            <div>
           
            <button onClick={() => handleChildModalOpen({isDelete:false,id:null,modalType:"create" })}>Add Customer</button>

            </div>

            <div>
                <Table />
                <Dialog open={childModalOpen} handleClose={handleChildModalClose}  data={value}/>
            </div>
            
        </>
    )
}

export default Customer