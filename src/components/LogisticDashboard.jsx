import { useState } from "react";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Grid, Card, CardContent } from "@mui/material";
import { Menu } from "@mui/icons-material";

export default function LogisticsDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Drawer variant="permanent" className="w-64">
        <div className="p-4 font-bold text-lg">Logistics Dashboard</div>
        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Shipments" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Fleet Management" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
      </Drawer>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <AppBar position="static" className="mb-6">
          <Toolbar>
            <Menu onClick={() => setOpen(!open)} className="mr-4 cursor-pointer" />
            <Typography variant="h6">Dashboard</Typography>
          </Toolbar>
        </AppBar>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6">Total Shipments</Typography>
                <Typography variant="h4" className="font-bold">1,230</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6">Active Vehicles</Typography>
                <Typography variant="h4" className="font-bold">78</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6">Pending Deliveries</Typography>
                <Typography variant="h4" className="font-bold">56</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
