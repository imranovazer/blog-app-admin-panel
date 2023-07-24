import * as React from "react";
import Alert from "@mui/joy/Alert";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import LinearProgress from "@mui/joy/LinearProgress";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import Warning from "@mui/icons-material/Warning";

export default function AlertInvertedColors({
  type,
  content,
  display,
  setDisplay,
}) {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplay(false);

      return () => clearTimeout(timeout);
    }, 5000);
  }, [display]);
  return display ? (
    <div className="fixed right-3 bottom-3  z-[9999]">
      <Stack spacing={2} sx={{ minWidth: 300, maxWidth: 350 }}>
        <Alert
          size="lg"
          color={type ? "success" : "danger"}
          variant="solid"
          invertedColors
          startDecorator={
            <AspectRatio
              variant="solid"
              ratio="1"
              sx={{
                minWidth: 40,
                borderRadius: "50%",
                boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
              }}
            >
              <div>
                {type ? <Check fontSize="xl2" /> : <Warning fontSize="xl2" />}
              </div>
            </AspectRatio>
          }
          endDecorator={
            <IconButton
              onClick={() => setDisplay(false)}
              variant="plain"
              sx={{
                "--IconButton-size": "32px",
                transform: "translate(0.5rem, -0.5rem)",
              }}
            >
              <Close />
            </IconButton>
          }
          sx={{ alignItems: "flex-start", overflow: "hidden" }}
        >
          <Box>
            <Typography level="body1" fontWeight="lg">
              {type ? "Success" : "Failed"}
            </Typography>
            <Typography level="body3">{content}</Typography>
          </Box>
          <LinearProgress
            variant="soft"
            value={40}
            sx={(theme) => ({
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              color: `${type ? "green" : "red"}`,
              "--LinearProgress-radius": "0px",
            })}
          />
        </Alert>
      </Stack>
    </div>
  ) : null;
}
