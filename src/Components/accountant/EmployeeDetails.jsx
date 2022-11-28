import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { db ,storage} from "../../firebase";

import {Outlet } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {Grid} from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import AccountantHeader from './AccountantHeader';
import {ref,getDownloadURL} from "firebase/storage";
import {doc,getDoc} from 'firebase/firestore';


export default function EmployeeDetails() {
  const navigate = useNavigate();
  const [imageURL, setURL] = useState();
  const [EmpEmail, setEmail] = useState("");
  const [loading,setLoading]= useState(false);
  const data=JSON.parse(localStorage.getItem('RefEmpData'));
  const fetchImage=()=>{
    const imageRef = ref(storage, `employee_images/${data.imageID}`)
    getDownloadURL(imageRef)
    .then((url) => {
      setURL(url)
    })
    .catch((error) => {
      console.log(error)
    });
  }
  

  const fetchEmail= async()=>{
    const usersRef = doc(db, "users", data.usersDocID);
    const docSnap = await getDoc(usersRef);
    setEmail(docSnap.data().email);
    setLoading(true);
  }
  useEffect(()=>{
    fetchImage();
    fetchEmail();
  },[loading])
  return (
    <div>
      <AccountantHeader/>
      {loading ?(
      <div className='rendering'>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
          <Link underline="hover" key="1" color="inherit" href="/AccountantProfile" >Home</Link>
          <Link underline="hover" key="2" color="inherit" >Employees</Link>
          <Link underline="hover" key="3" color="inherit" href="/EmployeeDetails" >Employee Details</Link>
      </Breadcrumbs>
      <div className='rendering'>
          <div className="row">
              <div className="col col-6 col-md-2" >
                
                <img src={imageURL} className="rounded mx-auto d-block" height="200px"/>
              
              </div>
              <div className="col col-12 col-md-10">
                      <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 2 },
                  }}
                  
                  >
                  
                  <div>
                    <TextField
                        id="filled-read-only-input"
                        label="Employee ID"
                        defaultValue={data.empID.toUpperCase()}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    <TextField
                      id="filled-read-only-input"
                      label="Employee Name"
                      defaultValue={data.firstName+" "+data.lastName}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Employee Email ID"
                      defaultValue={EmpEmail}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Qualification"
                      defaultValue={data.qualification}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Designation"
                      defaultValue={data.designation}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Department"
                      defaultValue={data.deptName}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Date Of Joining"
                      defaultValue={new Date(data.doj.seconds*1000).toLocaleDateString('en-IN')}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  
                  <TextField
                      id="filled-read-only-input"
                      label="Previous Experince Period"
                      defaultValue={data.pre_yoe.years+" Years and "+data.pre_yoe.months+" months"}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </div>
                </Box>
              </div>
          </div>     
          
        <BottomNavigation showLabels>
            <BottomNavigationAction label="Generate Salary Slip" onClick={()=> navigate('GenerateSalarySlip')} icon={<NoteAddIcon/>} />
            <BottomNavigationAction label="Reports"  onClick={()=> navigate('EmployeeReports')} icon={<SummarizeIcon/>} />
        </BottomNavigation>
        

        <Outlet/>
      </div>
    </div>
     ):(
      <h1>Loading</h1>
    )}
    </div>
  )
}
