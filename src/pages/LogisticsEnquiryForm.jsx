// import { useState, useEffect } from "react";
// import { TextField, Button, Card, CardContent, Typography, Stack, Autocomplete, Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";
// import { Country, State, City } from 'country-state-city';
// import { useManager } from "../contextAPIs/ManagerContext"; // Import Manager Context


// const getCurrentDateTimeLocal = () => {
//     const now = new Date();
//     const offset = now.getTimezoneOffset() * 60000;
//     const localISOTime = new Date(now - offset).toISOString().slice(0, 16);
//     return localISOTime;
// };

// const LogisticsEnquiryForm = () => {
//     const managers = useManager(); // Get manager data from context
//     console.log("Managers in LogisticsEnquiryForm Component:", managers);
//     const [formData, setFormData] = useState({
//         enquiryNo: "",
//         dateTime: getCurrentDateTimeLocal(),
//         customerName: "",
//         materialType: "",
//         fromCountry: "",
//         fromState: "",
//         fromCity: "",
//         fromLocation:'',
//         toLocation:'',
//         vehicleType: "",
//         weight_unit: 'kg',
//         materialWeight: "",
//         dimension_unit:'m',
//         materialDimensions: "",
//         orderNo: "",
//         orderDate: "",
//         noOfVehicles: "",
//         targetRate: "",
//         rateUOM: "",
//         kam: "",
//         remarks: "",
//     });

//     const countries = Country.getAllCountries();
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState(null);
//     const [selectedState, setSelectedState] = useState(null);
//     const [selectedCity, setSelectedCity] = useState(null);

//     // Handle Country Change
//     const handleCountryChange = (event, value) => {
//         const country = countries.find((c) => c.name === value);
//         if (country) {
//             setSelectedCountry(country);
//             setStates(State.getStatesOfCountry(country.isoCode)); // Fetch states
//             setSelectedState(null);
//             setCities([]); // Reset cities
//             setSelectedCity(null);
//             setFormData(prev => ({ ...prev, fromCountry: country.name }));
//         }
//     };

//     // Handle State Change
//     const handleStateChange = (event, value) => {
//         const state = states.find((s) => s.name === value);
//         if (state) {
//             setSelectedState(state);
//             setCities(City.getCitiesOfState(state.countryCode, state.isoCode)); // Fetch cities
//             setSelectedCity(null);
//         }
//     };

//     // Handle City Change
//     const handleCityChange = (event, value) => {
//         setSelectedCity(value);
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Form Data Submitted:", formData);
//     };

//     // Auto-update KAM based on source country selection
//     useEffect(() => {
//         if (formData.fromCountry) {
//             setFormData(prev => ({
//                 ...prev,
//                 kam: managers[formData.fromCountry] || "No Manager Assigned"
//             }));
//         }
//     }, [formData.fromCountry, managers]);

//     return (
//         <Card sx={{ maxWidth: 1400, mx: "auto", mt: 4,mb:4, p: 3, boxShadow: 3 }}>
//             <CardContent>
//                 <Typography variant="h5" gutterBottom>Logistics Enquiry Form</Typography>
//                 <form onSubmit={handleSubmit}>
//                     <Stack spacing={2}>
//                         <TextField fullWidth label="Enquiry No." name="enquiryNo" value={formData.enquiryNo} onChange={handleChange} required />
//                         <TextField fullWidth label="Date & Time" name="dateTime" type="datetime-local" value={formData.dateTime} />
//                         <TextField fullWidth label="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} required />
//                         <TextField fullWidth label="Material Type" name="materialType" value={formData.materialType} onChange={handleChange} required />
//                         <Box className='flex gap-1.5'>
//                             {/* Country Selection */}
//                             <Autocomplete
//                                 className='w-1/3'
//                                 options={countries.map((country) => country.name)}
//                                 renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
//                                 onChange={handleCountryChange}
//                             />

//                             {/* State Selection */}
//                             <Autocomplete
//                                 className='w-1/3'
//                                 options={states.map((state) => state.name)}
//                                 renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
//                                 onChange={handleStateChange}
//                                 disabled={!selectedCountry} // Disable if no country selected
//                             />

//                             {/* City Selection */}
//                             <Autocomplete
//                                 className='w-1/3'
//                                 options={cities.map((city) => city.name)}
//                                 renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
//                                 onChange={handleCityChange}
//                                 disabled={!selectedState} // Disable if no state selected
//                             />
//                         </Box>
//                         <TextField fullWidth label="Source Address" name="fromLocation" value={formData.fromLocation} onChange={handleChange} required /> 
//                          <TextField fullWidth label="Destination Address" name="toLocation" value={formData.toLocation} onChange={handleChange} required/>
//                         <TextField fullWidth label="Key Account Manager (KAM)" name="kam" value={formData.kam} />

//                         <TextField fullWidth label="Vehicle Type" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required />

//                         <Box className='flex gap-1'>
//                             <Box className=' w-1/2 '>
//                                 <Typography variant="caption" className="w-1/3 font-medium">Select unit:</Typography>
//                                 <RadioGroup row className="" name="weight_unit" value={formData.weight_unit} onChange={handleChange}>
//                                     <FormControlLabel value="kg" control={<Radio />} label="Kg" />
//                                     <FormControlLabel value="ton" control={<Radio />} label="Ton" />
//                                 </RadioGroup>
//                             </Box>
//                             <TextField className='w-full mb-4' label={`Enter Weight (${formData.weight_unit})`} variant="outlined" fullWidth name='materialWeight' value={formData.materialWeight} onChange={handleChange} required/>
//                         </Box>

//                         <Box className='flex gap-1'>
//                             <Box className=' w-1/2 '>
//                                 <Typography variant="caption" className="w-1/3 font-medium">Select unit:</Typography>
//                                 <RadioGroup row className="" name="dimension_unit" value={formData.dimension_unit} onChange={handleChange}>
//                                     <FormControlLabel value="m" control={<Radio />} label="m" />
//                                     <FormControlLabel value="cm" control={<Radio />} label="cm" />
//                                     <FormControlLabel value="inch" control={<Radio />} label="inch" />
//                                 </RadioGroup>
//                             </Box>
//                             <TextField className='w-full mb-4' label={`Material Dimensions (LxWxH) (${formData.dimension_unit})`} variant="outlined" fullWidth name='materialDimensions' value={formData.materialDimensions} onChange={handleChange} />
//                         </Box>


//                         <TextField fullWidth label="Order No." name="orderNo" value={formData.orderNo} onChange={handleChange} />
//                         <TextField fullWidth label="Order Date" name="orderDate" type="" value={formData.orderDate} onChange={handleChange} />
//                         <TextField fullWidth label="No. of Vehicles Required" name="noOfVehicles" value={formData.noOfVehicles} onChange={handleChange} required />
//                         <TextField fullWidth label="Target Rate" name="targetRate" value={formData.targetRate} onChange={handleChange} />
//                         <TextField fullWidth label="Rate UOM" name="rateUOM" value={formData.rateUOM} onChange={handleChange} required />
//                         <TextField fullWidth label="Remarks" name="remarks" value={formData.remarks} onChange={handleChange} multiline rows={2} />
//                         <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
//                     </Stack>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// };

// export default LogisticsEnquiryForm;




// import { useState, useEffect } from "react";
// import { TextField, Button, Card, CardContent, Typography, Stack, Autocomplete, Box, RadioGroup, FormControlLabel, Radio, Grid, Divider } from "@mui/material";
// import { Country, State, City } from 'country-state-city';
// import { useManager } from "../contextAPIs/ManagerContext"; // Import Manager Context

// const getCurrentDateTimeLocal = () => {
//     const now = new Date();
//     const offset = now.getTimezoneOffset() * 60000;
//     return new Date(now - offset).toISOString().slice(0, 16);
// };

// const LogisticsEnquiryForm = () => {
//     const managers = useManager();
//     console.log("Managers:", managers);

//     const [formData, setFormData] = useState({
//         enquiryNo: "",
//         dateTime: getCurrentDateTimeLocal(),
//         customerName: "",
//         materialType: "",
//         fromCountry: "",
//         fromState: "",
//         fromCity: "",
//         fromLocation: "",
//         toLocation: "",
//         vehicleType: "",
//         weight_unit: "kg",
//         materialWeight: "",
//         dimension_unit: "m",
//         materialDimensions: "",
//         orderNo: "",
//         orderDate: "",
//         noOfVehicles: "",
//         targetRate: "",
//         rateUOM: "",
//         kam: "",
//         remarks: "",
//     });

//     const countries = Country.getAllCountries();
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState(null);
//     const [selectedState, setSelectedState] = useState(null);
//     const [selectedCity, setSelectedCity] = useState(null);

//     // Handle Country Change
//     const handleCountryChange = (event, value) => {
//         const country = countries.find((c) => c.name === value);
//         if (country) {
//             setSelectedCountry(country);
//             setStates(State.getStatesOfCountry(country.isoCode));
//             setSelectedState(null);
//             setCities([]);
//             setSelectedCity(null);
//             setFormData((prev) => ({ ...prev, fromCountry: country.name }));
//         }
//     };

//     // Handle State Change
//     const handleStateChange = (event, value) => {
//         const state = states.find((s) => s.name === value);
//         if (state) {
//             setSelectedState(state);
//             setCities(City.getCitiesOfState(state.countryCode, state.isoCode));
//             setSelectedCity(null);
//         }
//     };

//     // Handle City Change
//     const handleCityChange = (event, value) => {
//         setSelectedCity(value);
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Form Data Submitted:", formData);
//     };

//     // Auto-update KAM based on source country selection
//     useEffect(() => {
//         if (formData.fromCountry) {
//             setFormData((prev) => ({
//                 ...prev,
//                 kam: managers[formData.fromCountry] || "No Manager Assigned",
//             }));
//         }
//     }, [formData.fromCountry, managers]);

//     return (
// <Card sx={{ maxWidth: 900, mx: "auto", mt: 4, mb: 4, p: 4, boxShadow: 6, borderRadius: 3 }}>
//             <CardContent>
// <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
//     Logistics Enquiry Form 🚛
// </Typography>
// <Divider sx={{ mb: 3 }} />

//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         {/* Row 1 */}
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Enquiry No." name="enquiryNo" value={formData.enquiryNo} onChange={handleChange} required />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Date & Time" name="dateTime" type="datetime-local" value={formData.dateTime} />
//                         </Grid>

//                         {/* Row 2 */}
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} required />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Material Type" name="materialType" value={formData.materialType} onChange={handleChange} required />
//                         </Grid>

//                         {/* Country, State, City */}
//                         <Grid item xs={4}>
//                             <Autocomplete options={countries.map((c) => c.name)} renderInput={(params) => <TextField {...params} label="Country" />} onChange={handleCountryChange} />
//                         </Grid>
//                         <Grid item xs={4}>
//                             <Autocomplete options={states.map((s) => s.name)} renderInput={(params) => <TextField {...params} label="State" />} onChange={handleStateChange} disabled={!selectedCountry} />
//                         </Grid>
//                         <Grid item xs={4}>
//                             <Autocomplete options={cities.map((c) => c.name)} renderInput={(params) => <TextField {...params} label="City" />} onChange={handleCityChange} disabled={!selectedState} />
//                         </Grid>

//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Source Address" name="fromLocation" value={formData.fromLocation} onChange={handleChange} required />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Destination Address" name="toLocation" value={formData.toLocation} onChange={handleChange} required />
//                         </Grid>

//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Key Account Manager (KAM)" name="kam" value={formData.kam} />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Vehicle Type" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required />
//                         </Grid>

//                         {/* Weight Section */}
//                         <Grid item xs={6}>
//                             <Typography variant="subtitle1">Weight Unit:</Typography>
//                             <RadioGroup row name="weight_unit" value={formData.weight_unit} onChange={handleChange}>
//                                 <FormControlLabel value="kg" control={<Radio />} label="Kg" />
//                                 <FormControlLabel value="ton" control={<Radio />} label="Ton" />
//                             </RadioGroup>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label={`Enter Weight (${formData.weight_unit})`} name="materialWeight" value={formData.materialWeight} onChange={handleChange} required />
//                         </Grid>

//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Order No." name="orderNo" value={formData.orderNo} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField fullWidth label="Order Date" name="orderDate" type="date" value={formData.orderDate} onChange={handleChange} />
//                         </Grid>
//                     </Grid>

// <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5 }}>
//     Submit 🚀
// </Button>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// };

// export default LogisticsEnquiryForm;

import { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent, Typography, Autocomplete, Box, RadioGroup, FormControlLabel, Radio, Divider } from "@mui/material";
import { Country, State, City } from 'country-state-city';
import { useManager } from "../contextAPIs/ManagerContext";
import Papa from 'papaparse';




const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now - offset).toISOString().slice(0, 16);
};

const LogisticsEnquiryForm = () => {
    const managers = useManager();
    const [formData, setFormData] = useState({
        enquiryNo: "", dateTime: getCurrentDateTimeLocal(), customerName: "", materialType: "",
        fromCountry: "", fromState: "", fromCity: "", fromLocation: "", toLocation: "",
        vehicleType: "", weight_unit: 'kg', materialWeight: "", dimension_unit: 'm',
        materialDimensions: "", orderNo: "", orderDate: "", noOfVehicles: "",
        targetRate: "", rateUOM: "", kam: "", remarks: ""
    });

    const countries = Country.getAllCountries();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [data, setData] = useState();

    const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                if (result.data.length > 0) {
                    const row = result.data[0]; // Take the first row of CSV

                    // Map CSV data to form fields
                    setFormData({
                        enquiryNo: row["Enquiry No"] || "",
                        dateTime: row["Date & Time"] || getCurrentDateTimeLocal(),
                        customerName: row["Customer Name"] || "",
                        materialType: row["Material Type"] || "",
                        fromCountry: row["From Country"] || "",
                        fromLocation: row["Source"] || "",
                        toLocation: row["Destination"] || "",
                        vehicleType: row["Vehicle Type"] || "",
                        weight_unit: row["Weight Unit"] || "kg",
                        materialWeight: row["Material Weight"] || "",
                        dimension_unit: row["Dimension Unit"] || "m",
                        materialDimensions: row["Material Dimensions"] || "",
                        orderNo: row["Order No"] || "",
                        orderDate: row["Order Date"] || "",
                        noOfVehicles: row["No. of Vehicles"] || "",
                        targetRate: row["Target Rate"] || "",
                        rateUOM: row["Rate UOM"] || "",
                        kam: row["KAM"] || "",
                        remarks: row["Remarks"] || ""
                    });
                }
            },
        });
    };

    const handleCSVDownload = () => {
        const csvHeaders = [
            "Enquiry No", "Date & Time", "Customer Name", "Material Type",
            "From Country", "Source", "Destination", "Vehicle Type",
            "Weight Unit", "Material Weight", "Dimension Unit", "Material Dimensions",
            "Order No", "Order Date", "No. of Vehicles", "Target Rate",
            "Rate UOM", "KAM", "Remarks"
        ];

        const csvData = [
            [
                formData.enquiryNo, formData.dateTime, formData.customerName, formData.materialType,
                formData.fromCountry, formData.fromLocation, formData.toLocation, formData.vehicleType,
                formData.weight_unit, formData.materialWeight, formData.dimension_unit, formData.materialDimensions,
                formData.orderNo, formData.orderDate, formData.noOfVehicles, formData.targetRate,
                formData.rateUOM, formData.kam, formData.remarks
            ]
        ];

        let csvContent = "data:text/csv;charset=utf-8,"
            + [csvHeaders.join(","), ...csvData.map(row => row.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "logistics_enquiry.csv");
        document.body.appendChild(link);
        link.click();
    };


    useEffect(() => {
        if (formData.fromCountry) {
            setFormData(prev => ({ ...prev, kam: managers[formData.fromCountry] || "No Manager Assigned" }));
        }
    }, [formData.fromCountry, managers]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Card sx={{ maxWidth: 900, mx: "auto", mt: 4, mb: 4, p: 4, boxShadow: 6, borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                    Logistics Enquiry Form 🚛
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TextField label="Enquiry No." name="enquiryNo" value={formData.enquiryNo} onChange={handleChange} required fullWidth />
                    <TextField label="Date & Time" name="dateTime" type="datetime-local" value={formData.dateTime} fullWidth />
                    <TextField label="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} required fullWidth />

                    {/* Country Selection */}
                    <Autocomplete options={countries.map((c) => c.name)}
                        name='fromCountry'
                        value={formData.fromCountry || null} // Ensure it reflects state
                        renderInput={(params) => <TextField {...params} label="Country" />}
                        onChange={(e, value) => setFormData({ ...formData, fromCountry: value })} fullWidth />

                    <TextField label="Source Address" name="fromLocation" value={formData.fromLocation} onChange={handleChange} fullWidth required />
                    <TextField label="Destination Address" name="toLocation" value={formData.toLocation} onChange={handleChange} fullWidth required />
                    <TextField label="Key Account Manager (KAM)" name="kam" value={formData.kam} fullWidth />

                    <Box>
                        <Typography variant="caption">Select Weight Unit:</Typography>
                        <RadioGroup row name="weight_unit" value={formData.weight_unit} onChange={handleChange}>
                            <FormControlLabel value="kg" control={<Radio />} label="Kg" />
                            <FormControlLabel value="ton" control={<Radio />} label="Ton" />
                        </RadioGroup>
                    </Box>
                    <TextField label={`Enter Weight (${formData.weight_unit})`} name="materialWeight" value={formData.materialWeight} onChange={handleChange} fullWidth required />

                    <Box>
                        <Typography variant="caption">Select Dimension Unit:</Typography>
                        <RadioGroup row name="dimension_unit" value={formData.dimension_unit} onChange={handleChange}>
                            <FormControlLabel value="m" control={<Radio />} label="m" />
                            <FormControlLabel value="cm" control={<Radio />} label="cm" />
                            <FormControlLabel value="inch" control={<Radio />} label="inch" />
                        </RadioGroup>
                    </Box>
                    <TextField label={`Material Dimensions (${formData.dimension_unit})`} name="materialDimensions" value={formData.materialDimensions} onChange={handleChange} fullWidth />

                    <TextField label="Order No." name="orderNo" value={formData.orderNo} onChange={handleChange} fullWidth />
                    <TextField label="Order Date" name="orderDate" type="" value={formData.orderDate} onChange={handleChange} fullWidth />
                    <TextField label="No. of Vehicles Required" name="noOfVehicles" value={formData.noOfVehicles} onChange={handleChange} fullWidth required />
                    <TextField label="Target Rate" name="targetRate" value={formData.targetRate} onChange={handleChange} fullWidth />
                    <TextField label="Rate UOM" name="rateUOM" value={formData.rateUOM} onChange={handleChange} fullWidth required />
                    <TextField label="Remarks" name="remarks" value={formData.remarks} onChange={handleChange} fullWidth />

                    <Button type="submit" variant="contained" color="primary" className="col-span-1 md:col-span-3 py-1.5 mt-1.5">Submit 🚀</Button>
                </form>
                {/* <Box className="flex justify-end ite mt-4">
                    <Button type="file" accept='.csv' variant="contained" color="success" onChange={handleCSVUpload}>
                        Upload CSV 📂
                    </Button>
                </Box> */}
                <Box className="flex justify-end mt-4">
                    <input
                        type="file"
                        accept=".csv"
                        id="csvUpload"
                        style={{ display: "none" }}
                        onChange={handleCSVUpload}
                    />
                    <label htmlFor="csvUpload">
                        <Button variant="contained" color="success" component="span">
                            Upload CSV 📂
                        </Button>
                    </label>
                </Box>

                <Box className="flex justify-end mt-4">
                    <Button variant="contained" color="success" onClick={handleCSVDownload}>
                        Save as CSV 📥
                    </Button>
                </Box>
 
            </CardContent>
        </Card>
    );
};

export default LogisticsEnquiryForm;


