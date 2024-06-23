import { useNavigate } from "react-router-dom";
import SurveyImage from "../../public/SurveyImage.png";
import { Box, Button, Typography } from "@mui/material";

export const GettingStarted = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/survey"); // Replace "/form" with your actual form route
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Typography variant="h1" color="white" fontWeight="500">
          Wanna Take a Survey?
        </Typography>

        <Box>
          <Typography variant="h6" color="#31363F">
            Take few minutes to let us know more about you....
          </Typography>
          <Typography variant="h6" color="#31363F">
            Your Answers will be kept secret
          </Typography>
        </Box>

        <Button
          onClick={handleButtonClick}
          sx={{
            width: {
              xs: "100%",
              lg: "50%",
            },
          }}
          style={{ backgroundColor: "white", color: "#69008c", fontWeight: "700" }}
        >
          Let's Go
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          width: {
            xs: "100%",
            lg: "50%",
          },
        }}
      >
        <img
          src={SurveyImage}
          alt="SurveyImage"
          style={{
            backgroundColor: "white",
            width: "98%",
            borderRadius: 20,
          }}
        />
      </Box>
    </Box>
  );
};
