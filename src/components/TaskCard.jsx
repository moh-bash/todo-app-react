import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { indigo, red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskCard() {
  const [hover, setHover] = useState(false);

  return (
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
      onClick={() => setHover(!hover)}
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
            <Typography variant="h5">Tasks</Typography>
            <Typography variant="subtitle1" gutterBottom>
              Description Task
            </Typography>
          </Grid>
          <Grid
            xs={5}
            container
            spacing={1}
            sx={{ display:hover?"flex":"none"}}
          >
            <IconButton
              aria-label="delete"
              sx={{ color: red[500], boxShadow: 3 }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit" sx={{ boxShadow: 3 }}>
              <EditIcon />
            </IconButton>
            <Checkbox defaultChecked sx={{ boxShadow: 3 }}  />
          </Grid>
        </Grid>
      }
    </Card>
  );
}
export default TaskCard;
