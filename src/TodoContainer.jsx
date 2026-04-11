import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TaskCard from "./components/TaskCard";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useContext, useMemo } from "react";
import { DataContext } from "./Data";

export default function OutlinedCard() {
  const [toggleType, setToggleType] = useState("All");
  const {Data, setData} = useContext(DataContext);
  const [newTask, setNewTask] = useState({ 
    title: "", 
    description: "", 
    isCompleted: false 
  });


  let filteredData = useMemo(() => {
  if (toggleType === "Active") {
     return Data.filter((task) => !task.isCompleted);
  } else if (toggleType === "Completed") {
    return Data.filter((task) => task.isCompleted);
  } else{
    return Data;
  }
}, [Data, toggleType]);
 
  const tasks = filteredData.map((task) => {
    return (
      <TaskCard key={task.id} task={task} />
    );
  });


  useEffect(() => {
    const storedData = localStorage.getItem("tasks");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  // ➕ Add Task
  const handleAddTask = () => {
    if (newTask.title.trim() === "" || newTask.description.trim() === "") {
      return;
    }
    const newData =[
      ...Data,
      { 
        id: uuidv4(),
        title: newTask.title, 
        description: newTask.description, 
        isCompleted: newTask.isCompleted 
      },
    ]
    setData(newData);
    localStorage.setItem("tasks", JSON.stringify(newData));
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
              <ToggleButtonGroup
               color="primary"
                display={"flex"}
                gap={1}
                justifyContent={"center"}
                sx={{ marginTop: "10px" }}
                value={toggleType}
                onChange={(e) => setToggleType(e.target.value)}
              >
                <ToggleButton value={"All"} variant="contained">All</ToggleButton>
                <ToggleButton value={"Active"} variant="contained">Active</ToggleButton>
                <ToggleButton value={"Completed"} variant="contained">Completed</ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
            <CardContent xs={12}>
              {tasks}
            </CardContent>
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
