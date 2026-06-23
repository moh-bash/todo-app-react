import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import { indigo, red } from "@mui/material/colors";
// Icons
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTodos } from "../Data";
import { useSnackbar } from "../SnackbarContext";


function TaskCard({ task, update, deleteT }) {
  const { Data, dispatch } = useTodos();
  const { showSnackBar } = useSnackbar();

  function clickedComplete() {
    // ✅ Toggle the isCompleted property of the task
    dispatch({ type: "toggleComplete", payload:  task });
    showSnackBar(task.isCompleted ? "Task marked as incomplete" : "Task marked as completed");

  }

  return (
    <>
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
                onClick={() => deleteT(task)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                sx={{ boxShadow: 3 }}
                onClick={() => update(task)}
              >
                <EditIcon />
              </IconButton>
              <Checkbox
                checked={task.isCompleted || false}
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
