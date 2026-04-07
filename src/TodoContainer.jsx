import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TaskCard from "./components/TaskCard";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { DataContext } from "./Data";

export default function OutlinedCard() {
  const {Data, setData} = useContext(DataContext);
  const [newTask, setNewTask] = useState({ 
    title: "", 
    description: "", 
    isCompleted: false 
  });

 
  const tasks = Data.map((task) => {
    return (
      <TaskCard key={task.id} task={task} />
    );
  });

  const handleAddTask = () => {
    if (newTask.title.trim() === "" || newTask.description.trim() === "") {
      return;
    }

    setData([
      ...Data,
      { id: uuidv4(), title: newTask.title, description: newTask.description, isCompleted: newTask.isCompleted },
    ]);
    setNewTask({ title: "", description: "", isCompleted: false });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card variant="outlined" sx={{ borderRadius: "20px" , marginY: "20px" }}>
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
            <CardContent>{tasks}</CardContent>
            <CardContent>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    label="Add a title"
                    variant="outlined"
                    size="small"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    label="Add a description"
                    variant="outlined"
                    size="small"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() =>
                      handleAddTask()
                    }
                    disabled={newTask.title.trim() === "" || newTask.description.trim() === ""}
                  >
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
