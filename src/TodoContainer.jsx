import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TaskCard from "./components/TaskCard";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function OutlinedCard() {
  return (
    <Box  sx={{ width: "100%" }}>
      <Card variant="outlined" sx={{ borderRadius: "20px" }}>
        {
          <>
            <CardContent>
              <Typography variant="h3">Tasks</Typography>
              <hr></hr>
              <Box
                display={"flex"}
                gap={1}
                justifyContent={"center"}
                sx={{ marginTop: "10px" }}
              >
                <Button variant="contained">All</Button>
                <Button variant="contained">Active</Button>
                <Button variant="contained">Completed</Button>
              </Box>
            </CardContent>
            <CardContent>
              <TaskCard />
            </CardContent>
            <CardContent>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    label="Add a new task"
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                <Grid item xs={3}>
                  <Button fullWidth variant="contained" size="large">
                    Add
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </>
        }
      </Card>
    </Box>
  );
}
