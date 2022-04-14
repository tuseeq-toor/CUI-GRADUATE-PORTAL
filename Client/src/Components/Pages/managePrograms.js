import React,{useEffect,useState} from "react";
// import { programData, programHeader } from "../DummyData/DummyData";
import DataTable from "../UI/TableUI";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';

import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};







export default function ManagePrograms() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const [getprograms,setPrograms]=useState([]);
const [gettoken,settoken]=useState('');
const [psname,setpsname]=useState('');
const [plname,setplname]=useState('');
const [pdesc,setpdesc]=useState('');
const [pminsem,setpminsem]=useState('');
const [pmaxsem,setpmaxsem]=useState('');
const [pdurat,setpdurat]=useState('');
const [pcredit,setpcredit]=useState('');
const [penable,setpenable]=useState('');
const [selectedobj,setselectedobj]=useState({});
useEffect(()=>{

    const user = JSON.parse(localStorage.getItem("user"));
    
      var { token } = user;
      console.log(token);
      settoken(token);
    



  axios.get('http://localhost:3000/programs/getprogram',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log("testing new get data")
    console.log(response.data.programlist);
    var newarr=response.data.programlist.map(obj => ({ ...obj, id: obj._id }))
console.log(newarr);
  setPrograms(newarr);


})
.catch(err=>console.log(err))
  
  },[]);
  /*  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Submitted")
    const data = new FormData(event.currentTarget);
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    axios.post("http://localhost:3000/auth/login", {
        email: userEmail,
        password: userPassword,
      })
      .then((res) => {
        const data = res.data.user;
	console.log(data);
        navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      });}; */

function getData(){
      const user = JSON.parse(localStorage.getItem("user"));
    
      var { token } = user;
      console.log(token);
      settoken(token);
    



  axios.get('http://localhost:3000/programs/getprogram',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log("testing another get data")
    console.log(response.data.programlist);
    var newarr=response.data.programlist.map(obj => ({ ...obj, id: obj._id }))
console.log(newarr);
  setPrograms(newarr);


})
.catch(err=>console.log(err))
  
}


      const programHeader = [
  
  
        { field: "programShortName",
        headerName: "Program",
        width: 150 },
        { field: "programLongName", headerName: "Long Name", width: 150 },
      
        {
          field: "duration",
          headerName: "Duration (Years)",
          width: 150,
        },
        {
          field: "credits",
          headerName: "Credits",
          width: 150,
        },
        {
          field: "Action",
          headerName: "Action",
          width: 150,
      
          renderCell: (props) => (
            <>
              <Button
                onClick={() => {
  
                  

                  axios.delete('http://localhost:3000/programs/deleteprogram/'+props.row.id,{
                    headers: {
                      Authorization: `Bearer ${gettoken}`,
                    },
                  }).then((response) => {
                    console.log(response.data.msg)
                    
                            getData();
               alert("Program deleted") 
                })
                .catch(err=>console.log(err))







      
                }}
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: 0 }}
              >
                Delete
              </Button>
      
              <Button
                onClick={() => {

                  setselectedobj(props.row)
                  handleOpen()





                }}
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: 10 }}
              >
                Edit
              </Button>
            </>
          ),
      
      
          // renderCell: (props) => (
          //   <Button style={{backgroundColor:"green"}}
          //    >
          //     Test
          //   </Button>
          // ),
      
        }
      ];





const updateProgram=()=>{
var s='';
if(s==''){
  console.log('checked')
}
  var obj={};
  if(psname!==''){
    obj.programShortName=psname;
    setpsname('');
  }
  if(plname!=''){
    obj.programLongName=plname;
    setplname('')
  }
  if(pdesc!=''){
    obj.description=pdesc;
    setpdesc('');
  }
  if(pminsem!=''){
    obj.minSemesters=pminsem;
    setpminsem('');
  }
  if(pmaxsem!=''){
    obj.maxSemesters=pmaxsem;
    setpmaxsem('');
  }
  if(pdurat!=''){
    obj.duration=pdurat;
    setpdurat('')
  }
  if(pcredit!=''){
    obj.credits=pcredit;
    setpcredit('');
  }
  if(penable!=''){
    if(penable=='enable'){
      obj.enable=true;
      setpenable('');
    }else{
      obj.enable=false;
      
    setpenable('');
    }
    
  }

 console.log(obj)

 axios.patch('http://localhost:3000/programs/updateprogram/'+selectedobj._id,obj,{
  headers: {
    Authorization: `Bearer ${gettoken}`,
  },
}).then((response) => {
  console.log(response.data.msg)
  
          getData();
alert("Program Updated") 
})
.catch(err=>console.log(err))



}





  return (
    <div >


<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField
  label="Short Name"
  variant="standard"
  color="warning"
  focused
  value={psname}
  placeholder={selectedobj.programShortName}
style={{width:"100%"}}

onChange= {(event) => {setpsname(event.target.value)}} />

<TextField
  label="Long Name"
  variant="standard"
  color="warning"
  focused
sx={{mt:1}}
style={{width:"100%"}}
placeholder={selectedobj.programLongName}
value={plname}
onChange= {(event) => {setplname(event.target.value)}} />

<TextField
  label="Description"
  variant="standard"
  color="warning"
  focused
sx={{mt:1}}
style={{width:"100%"}}
value={pdesc}
placeholder={selectedobj.description}

onChange= {(event) => {setpdesc(event.target.value)}} />
<TextField
  label="Min Semester"
  variant="standard"
  color="warning"
  focused
sx={{mt:1}}
style={{width:"100%"}}
value={pminsem}
placeholder={selectedobj.minSemesters}
onChange= {(event) => {setpminsem(event.target.value)}} />

<TextField
  label="Max Semester"
  variant="standard"
  color="warning"
  focused
sx={{mt:1}}
style={{width:"100%"}}
placeholder={selectedobj.maxSemesters}
value={pmaxsem}
onChange= {(event) => {setpmaxsem(event.target.value)}} />
<TextField
  label="Duration"
  variant="standard"
  color="warning"
  focused
sx={{mt:1}}
style={{width:"100%"}}
value={pdurat}
placeholder={selectedobj.duration}
onChange= {(event) => {setpdurat(event.target.value)}} />
<TextField
  label="Credits"
  variant="standard"
  color="warning"
  focused
sx={{mt:1}}
style={{width:"100%"}}
value={pcredit}
placeholder={selectedobj.credits}
onChange= {(event) => {setpcredit(event.target.value)}} />

{/* <TextField
  label="Credits"
  variant="Enable"
  color="warning"
  focused
sx={{mt:1}}
style={{width:"100%"}}
value={penable}
onChange= {(event) => {setpenable(event.target.value)}} /> */}

<label htmlFor="cars">Enable Program?: </label>

<select name="cars" id="cars"

onChange={(event)=>{setpenable(event.target.value)}}


>
  <option value="enable">enable</option>
  <option value="disable">disable</option>

</select>
<br />
<Button
variant="contained"
sx={{mt:1}}
onClick={(event)=>{
  updateProgram()
}}


>Update</Button>


        </Box>
      </Modal>
    <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
<DataTable header={programHeader}  data={getprograms}/></div></div>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 700 }} aria-label="customized table">
    //     <TableHead>
    //       <TableRow>
           
    //         <StyledTableCell align="right">Short Name</StyledTableCell>

    //         <StyledTableCell align="right">Full Name&nbsp;(g)</StyledTableCell>
    //         <StyledTableCell align="right">Description&nbsp;(g)</StyledTableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {getprograms.map((row) => (
    //         <StyledTableRow key={row._id}>
             
    //           <StyledTableCell align="right">{row.programShortName}</StyledTableCell>

    //           <StyledTableCell align="right">{row.programFullName}</StyledTableCell>
    //           <StyledTableCell align="right">{row.programDescription}</StyledTableCell>
    //         </StyledTableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
