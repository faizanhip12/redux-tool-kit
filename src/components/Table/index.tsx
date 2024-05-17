import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { retrieveCustomers, deleteCustomer } from '../../slices/customer'
import { useDispatch, useSelector } from "react-redux";

import { visuallyHidden } from '@mui/utils';
import Dialog from '../Modal/index'

interface Data {
  _id: string;
  email: string;
  // carbs: number;
  imageUrl: string;
  customerName: string;
  protein: number;
}





type Order = 'asc' | 'desc';





export default function EnhancedTable() {


  const [selected, setSelected] = React.useState<readonly any[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [childModalOpen, setChildModalOpen] = React.useState(false);


  const dispatch = useDispatch();
  //@ts-ignore
  const customers = useSelector(state => state.customers) || [];










  React.useEffect(() => {
   

    // const data =retrieveCustomers()
    console.log("retrieveCustomers()retrieveCustomers()retrieveCustomers()retrieveCustomers()", customers)
  }, [dispatch])



  const handleChildModalOpen = (value: any) => {
    setChildModalOpen(true);
    setValue(value)
  };

  const handleChildModalClose = () => {
    setChildModalOpen(false);
  };





  const handleUpdateTable = () => {

   // @ts-ignore
    dispatch(retrieveCustomers());
  };

  // const handleU = () => {

  //   // @ts-ignore
  //    dispatch(retrieveCustomers());
  //  };

  const handleDelete = (id: any) => {
    //@ts-ignore
    dispatch(deleteCustomer(id));
  }


  const isSelected = (id: number) => selected.indexOf(id) !== -1;





  return (
    <>
      <div>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Customer Name</TableCell>
                    <TableCell align="right">Image URL</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((row: any, index: any) => (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected(row._id)}
                      tabIndex={-1}
                      key={row._id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell component="th" scope="row">{row._id}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.customerName}</TableCell>
                      <TableCell align="right">{row.imageUrl}</TableCell>
                      <TableCell align="right">
                        <button onClick={() => handleChildModalOpen({ isDelete: true, id: row._id, modalType: "delete" })}>Delete</button>
                        <button onClick={() => handleChildModalOpen({ isDelete: false, id: row._id, modalType: "update" })}>Update</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>


        </Box>
      </div>

      <div>
        <Dialog open={childModalOpen} handleClose={handleChildModalClose} data={value} onUpdateTable={handleUpdateTable} onDelete={handleDelete}>
          {/* Your modal content here */}
        </Dialog>
      </div>

    </>
  );
}
