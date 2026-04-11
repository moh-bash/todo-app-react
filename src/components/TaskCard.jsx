import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { blue, indigo, red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useState } from "react";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { DataContext } from "../Data";
import TextField from "@mui/material/TextField";

// dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function TaskCard({ task }) {
  const { Data, setData } = useContext(DataContext);

  function clickedComplete() {
    // ✅ Toggle the isCompleted property of the task
    const updatedCompleted = Data.map((t) => {
      if (t.id === task.id) {
        return { ...t, isCompleted: !task.isCompleted };
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedCompleted));
    setData(updatedCompleted);
  }

  // ➖ Delete dialog
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleDelete = () => {
    const updatedDataBeforeDelete = Data.filter((t) => t.id !== task.id);
    setData(updatedDataBeforeDelete);
    localStorage.setItem("tasks", JSON.stringify(updatedDataBeforeDelete));
    setOpenDelete(false);
  };

  // 🔁 Update dialog
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateTask, setUpdateTask] = useState({
    title: task.title,
    description: task.description,
  });

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleUpdate = () => {
    const updatedDataBeforeUpdate = Data.map((t) => {
     if (t.id === task.id) {
        return { ...t, title: updateTask.title, description: updateTask.description };
      }
      return t;

    });
    setData(updatedDataBeforeUpdate);
    localStorage.setItem("tasks", JSON.stringify(updatedDataBeforeUpdate));
    setOpenUpdate(false);
  }

  // Close both dialogs
  const handleClose = () => {
    setOpenDelete(false);
    setOpenUpdate(false);
  };

  return (
    <>
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
            onChange={(e) =>{
              setUpdateTask({...updateTask, title: e.target.value})
            }}
          />
          <TextField
            fullWidth
            label="Add a description"
            variant="outlined"
            size="small"  
            sx={{ marginTop: "10px"}}
            value={updateTask.description}
            onChange={(e) => {
              setUpdateTask({...updateTask, description: e.target.value})
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
            <Typography>{task.title}</Typography>
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

      <Card
        variant="outlined"
        sx={{
          background: "#E3F2FD",
          textAlign: "start",
          padding: "7px 20px",
          marginBottom: "10px",
          borderColor: indigo[500],
          borderRadius: "20px",
        }}
      >
        {
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid xs={7}>
              <Typography
                 variant="h5"
                 sx={{ textDecoration: task.isCompleted ? "line-through" : "none", color: task.isCompleted ? "gray" : "black" }}
              >
                {task.title}
              </Typography>
            </Grid>
            <Grid xs={5} container spacing={1}>
              <IconButton
                aria-label="delete"
                sx={{ color: red[500], boxShadow: 3 }}
                onClick={handleClickOpenDelete}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                sx={{ boxShadow: 3 }}
                onClick={handleClickOpenUpdate}
              >
                <EditIcon />
              </IconButton>
              <Checkbox
                checked={task.isCompleted}
                sx={{ boxShadow: 3 }}
                onClick={() => clickedComplete()}
              />
            </Grid>
          </Grid>
        }
      </Card>
    </>
  );
}
export default TaskCard;
