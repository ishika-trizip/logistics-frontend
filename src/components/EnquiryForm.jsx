import { useState } from "react";
import { TextField, Button, Typography, Card, CardContent, Radio, RadioGroup, FormControlLabel, Autocomplete } from "@mui/material";

export default function EnquiryForm() {
  // const [unit, setUnit] = useState("kg");
  const [enquiryData, setEnquiryData] = useState({
    customer_name: '',
    weight: '',
    destination: '',
    instructions: '',
    unit:'kg'
  });
  const options = ["Role A", "Role B", "Role C"]; // Replace with API data

  const handleChange = (e) => {
    setEnquiryData({ ...enquiryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("https://dummyapi.com/auth/login", userData);
      // console.log("Login Successful:", response.data);
      // alert("Login Successful");
      console.log(enquiryData);
      setEnquiryData({
        customer_name: '',
        weight: '',
        destination: '',
        instructions: '',
        unit:'kg'
      })

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg md:p-6">
        <CardContent className="flex flex-col gap-2.5" >

          <Typography variant="h5" className="text-center mb-4 font-bold">Raise an Enquiry</Typography>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextField label="Customer Name" variant="outlined" fullWidth className="mb-4" name='customer_name' value={enquiryData.customer_name} onChange={handleChange} />
            {/* Role  */}
            {/* <Autocomplete
            options={options}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Role" variant="outlined" fullWidth className="mb-4" />}
          /> */}

            <Typography variant="body1" className="mb-2 font-medium">Select Unit:</Typography>
            <RadioGroup row name='unit' value={enquiryData.unit} onChange={handleChange}>
              <FormControlLabel value="kg" control={<Radio />} label="Kg" />
              <FormControlLabel value="ton" control={<Radio />} label="Ton" />
            </RadioGroup>
            <TextField label={`Enter Weight (${enquiryData.unit})`} variant="outlined" fullWidth className="mb-4" name='weight' value={enquiryData.weight} onChange={handleChange} />
          
            <TextField label="Destination" variant="outlined" fullWidth className="mb-4" name='destination' value={enquiryData.destination} onChange={handleChange} />
            <TextField label="Special Instructions" variant="outlined" fullWidth multiline rows={3} className="mb-4" name='instructions' value={enquiryData.instructions} onChange={handleChange} />

            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit Enquiry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// import { useState } from "react";
// import { TextField, Button, Typography, Card, CardContent, Radio, RadioGroup, FormControlLabel } from "@mui/material";

// export default function EnquiryForm() {
//   const [unit, setUnit] = useState("kg");

//   return (
//     <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
//       <Card className="w-full max-w-2xl shadow-xl p-8 bg-white rounded-2xl">
//         <CardContent>
//           <Typography variant="h4" className="text-center mb-6 font-extrabold text-gray-800">
//             Raise an Enquiry
//           </Typography>

//           {/* Customer Name */}
//           <TextField label="Customer Name" variant="outlined" fullWidth className="mb-6" />

//           {/* Weight Field with Radio Button */}
//           <Typography variant="body1" className="mb-3 font-semibold text-gray-700">Select Unit:</Typography>
//           <RadioGroup row value={unit} onChange={(e) => setUnit(e.target.value)}>
//             <FormControlLabel value="kg" control={<Radio color="primary" />} label="Kg" />
//             <FormControlLabel value="ton" control={<Radio color="primary" />} label="Ton" />
//           </RadioGroup>
//           <TextField label={`Enter Weight (${unit})`} variant="outlined" fullWidth className="mb-6" />

//           {/* Additional Filters and Inputs */}
//           <TextField label="Destination" variant="outlined" fullWidth className="mb-6" />
//           <TextField label="Special Instructions" variant="outlined" fullWidth multiline rows={3} className="mb-6" />

//           <Button variant="contained" color="primary" fullWidth className="py-3 text-lg shadow-md hover:bg-blue-700 transition duration-300">
//             Submit Enquiry
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

