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
import { blue, red } from "@mui/material/colors";

// dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function OutlinedCard() {
  const [toggleType, setToggleType] = useState("All");
  const { Data, setData } = useContext(DataContext);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });
  const [task, setTask] = useState(null);

  let filteredData = useMemo(() => {
    if (toggleType === "Active") {
      return Data.filter((task) => !task.isCompleted);
    } else if (toggleType === "Completed") {
      return Data.filter((task) => task.isCompleted);
    } else {
      return Data;
    }
  }, [Data, toggleType]);

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
    const newData = [
      ...Data,
      {
        id: uuidv4(),
        title: newTask.title,
        description: newTask.description,
        isCompleted: newTask.isCompleted,
      },
    ];
    setData(newData);
    localStorage.setItem("tasks", JSON.stringify(newData));
    setNewTask({ title: "", description: "", isCompleted: false });
  };

  // 🔁 Update dialog
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateTask, setUpdateTask] = useState({
    title: "",
    description: "",
  });

  const handleClickOpenUpdate = (task) => {
    setTask(task);
    setUpdateTask({ title: task.title, description: task.description });
    setOpenUpdate(true);
  };

  const handleUpdate = (task) => {
    const updatedDataBeforeUpdate = Data.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          title: updateTask.title,
          description: updateTask.description,
        };
      }
      return t;
    });
    setData(updatedDataBeforeUpdate);
    localStorage.setItem("tasks", JSON.stringify(updatedDataBeforeUpdate));
    setOpenUpdate(false);
  };

  // ➖ Delete dialog
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = (task) => {
    setOpenDelete(true);
    setTask(task);
  };

  const handleDelete = (task) => {
    const updatedDataBeforeDelete = Data.filter((t) => t.id !== task.id);
    setData(updatedDataBeforeDelete);
    localStorage.setItem("tasks", JSON.stringify(updatedDataBeforeDelete));
    setOpenDelete(false);
  };

  // Close both dialogs
  const handleClose = () => {
    setOpenDelete(false);
    setOpenUpdate(false);
  };

  const tasks = filteredData.map((t) => {
    return (
      <TaskCard
        key={t.id}
        task={t}
        update={handleClickOpenUpdate}
        deleteT={handleClickOpenDelete}
      />
    );
  });

  return (
    <>
      {/* Delete dialog */}
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ color: red[500], fontWeight: "bold" }}
        >
          {"Delete Task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the task?
            <Typography>{task?.title}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete dialog */}

      {/* Update dialog */}
      <Dialog
        open={openUpdate}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ color: blue[500], fontWeight: "bold" }}
        >
          {"Update Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Add a title"
            variant="outlined"
            size="small"
            value={updateTask.title}
            onChange={(e) => {
              setUpdateTask({ ...updateTask, title: e.target.value });
            }}
          />
          <TextField
            fullWidth
            label="Add a description"
            variant="outlined"
            size="small"
            sx={{ marginTop: "10px" }}
            value={updateTask.description}
            onChange={(e) => {
              setUpdateTask({ ...updateTask, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update dialog */}
      <Box sx={{ width: "100%" }}>
        <Card variant="outlined" sx={{ borderRadius: "20px", marginY: "20px" }}>
          {
            <>
              <CardContent>
                <Typography variant="h3">Tasks</Typography>
                <hr></hr>
                <ToggleButtonGroup
                  color="primary"
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                  value={toggleType}
                  onChange={(e) => setToggleType(e.target.value)}
                >
                  <ToggleButton value={"All"} variant="contained">
                    All
                  </ToggleButton>
                  <ToggleButton value={"Active"} variant="contained">
                    Active
                  </ToggleButton>
                  <ToggleButton value={"Completed"} variant="contained">
                    Completed
                  </ToggleButton>
                </ToggleButtonGroup>
              </CardContent>
              <CardContent xs={12}>{tasks}</CardContent>
              <CardContent>
                <Grid container spacing={2} justifyContent={"center"}>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      label="Add a title"
                      variant="outlined"
                      size="small"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      label="Add a description"
                      variant="outlined"
                      size="small"
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={() => handleAddTask()}
                      disabled={
                        newTask.title.trim() === "" ||
                        newTask.description.trim() === ""
                      }
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
    </>
  );
}
