import React,{useState,useEffect} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function AddManageSupervisoryCommittee() {

  const [reglist,setreglist]=useState([]);
  const [selectedReg,setSelectedReg]=useState('');
  const [gettoken,settoken]=useState('');
  const [studentlist,setstudentlist]=useState([]);
  const [age, setAge] = React.useState('');
  const [facultylist,setfacultylist]=useState([])
  const [idarray,setidarr]=useState([])
  const [names,setnames] = useState([
    
  ]);




  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    
    var arsd=facultylist.filter((item)=>{return item.fullName==event.target.value[event.target.value.length-1]});
    console.log(arsd[0]._id)
    var newarr=idarray;
    newarr.push(arsd[0]._id);
    setidarr(newarr)
    console.log(newarr)
  };










  
useEffect(()=>{

  const user = JSON.parse(localStorage.getItem("user"));
  
    var { token } = user;
    console.log(token);
    settoken(token);
  



axios.get('http://localhost:3000/admin/getallstudents',{
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((response) => {
  console.log("testing new get data")
  console.log(response.data.studentlist);
  var newarr=response.data.studentlist.map(obj => ({ ...obj, id: obj._id }))
console.log(newarr);
setstudentlist(newarr);
const rarr=[];
const regarr=response.data.studentlist.map(std=>(rarr.push({label:std.registrationNo,value: std.registrationNo}
  )));
setreglist(rarr);
console.log(rarr)

})
.catch(err=>console.log(err))

},[]);



  
useEffect(()=>{

  const user = JSON.parse(localStorage.getItem("user"));
  
    var { token } = user;
    console.log(token);
    settoken(token);
  



axios.get('http://localhost:3000/admin/faculty',{
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((response) => {
  console.log("testing new get data")
  console.log(response.data.facultylist);
  var newarr=response.data.facultylist.map(obj => ({ ...obj, id: obj._id }))
console.log(newarr);
setfacultylist(newarr);
const rarr=[];
const regarr=response.data.facultylist.map(std=>(rarr.push(std.fullName)));
setnames(rarr);
console.log(rarr)


})
.catch(err=>console.log(err))

},[]);



function addCommittee(){
  if(selectedReg==''){
    alert('select reg no plz firstly')
    return;
  }
  if(idarray.length==0){
    alert('select members firstly');
    return;
  }
 if(idarray.length>3){
    alert('You can select only 3 members maximum');
    return;
  }
 
  const user = JSON.parse(localStorage.getItem("user"));
  
    var { token } = user;
    console.log(token);
    settoken(token);
  

var obj={};
obj.committee=idarray;
console.log(selectedReg)
console.log(studentlist)
var checkid=studentlist.filter((ob)=>{return ob.registrationNo==selectedReg})
console.log(checkid[0]._id);

axios.post('http://localhost:3000/admin/addcommittee/'+checkid[0]._id,obj,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((response) => {
console.log(response.data.msg)

})














  
}














  
  const handleSubmit = (event) => {
    

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    /* axios.post("http://localhost:3000/auth/login", {
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
      }); */
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      

      {/* <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Registration No."
        color="secondary"
        variant="outlined"
      />

      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Faculty Member"
        color="secondary"
        variant="outlined"
      />

      <Button type="submit" variant="contained" size="large" color="secondary">
        Add Supervisory Committee
      </Button> */}
{/* <Select options={reglist}
menuColor='red'
onChange={(event)=>{setSelectedReg(event.target.value)
console.log(event.target.value)}}
/> */}
      
<Typography
sx={{mb:1}}>Select Student</Typography>

      <Select
          
          id="reg"
          label={selectedReg}
          //onChange={handleChange}
          style={{width:"100%"}}
          
          
  >
    
  {
    reglist.map((pnt,keyi) =>{
    
      return <MenuItem 
      
      key={keyi}
      
      onClick={() => 
    {
        setSelectedReg(pnt.label)
        console.log(pnt.label)
    }
    }
    > {pnt.label} 
    
    </MenuItem>
    
    })
  }  
    
  </Select>
  
  <Typography sx={{mt:1}}>Select Commitee Members</Typography>

  
      <FormControl sx={{ mt:2, width: 600 }}>
        <InputLabel id="demo-multiple-name-label">Members</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}

            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    <br />
<Button
sx={{mt:1}}
variant="contained"
onClick={()=>{addCommittee()}}
>Add Commitee</Button>


    </Box>
  );
}
