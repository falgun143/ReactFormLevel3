import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { SurveyFormValidation, Data } from "../components/SurveyFormValidation";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SurveyLogo from "../../public/SurveyLogo.png";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SurveyForm = () => {
  const { register, handleSubmit, errors, watch } = SurveyFormValidation();
  const [additionalQuestions, setAdditionalQuestions] = useState<any[]>([]);
  const surveyTopic = watch("surveyTopic");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdditionalQuestions = async (topic: string) => {
      let url = "";
      if (topic === "Technology") url = "https://opentdb.com/api.php?amount=10&category=18";
      if (topic === "Health") url = "https://opentdb.com/api.php?amount=10&category=17";
      if (topic === "General Knowledge") url = "https://opentdb.com/api.php?amount=10&category=9";

      if (url) {
        try {
          const response = await axios.get(url);
          setAdditionalQuestions(response.data.results);
        } catch (error) {
          console.error("Error fetching additional questions:", error);
        }
      }
    };

    if (surveyTopic) {
      fetchAdditionalQuestions(surveyTopic);
    }
  }, [surveyTopic]);

  const onSubmit = async (data: Data) => {
    toast.success("Form submitted successfully!");
    setTimeout(() => {
      navigate("/summary", { state: { data, additionalQuestions } });
    }, 4000); // Navigate to summary page after 4 seconds
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: "center" }}>
      <ToastContainer autoClose={4000} position="top-center" newestOnTop />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: {
              xs: 250,
              sm: 480,
              md: 520,
              lg: 600,
              xl: 700,
            },
            border: 0.1,
            borderColor: "grey.400",
            borderRadius: 2,
            gap: 2,
            padding: 2,
            color: "black",
            backgroundColor: "#E2BBE9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img src={SurveyLogo} alt="SurveyLogo" style={{ width: 150, borderRadius: 10 }} />
          <Typography color="secondary" variant="h2" fontWeight={600}>
            Survey Form
          </Typography>

          <TextField
            fullWidth
            required
            label="Full Name"
            color="secondary"
            {...register("fullname")}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
          />

          <TextField
            fullWidth
            required
            label="Email"
            color="secondary"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <FormControl fullWidth required error={!!errors.surveyTopic}>
            <InputLabel color="secondary" id="surveyTopic-label">Survey Topic</InputLabel>
            <Select color="secondary" {...register("surveyTopic")} labelId="surveyTopic-label" label="Survey Topic">
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="General Knowledge">General Knowledge</MenuItem>
            </Select>
          </FormControl>

          {surveyTopic === "Technology" && (
            <Box className="section" width={"100%"} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">Technology Section</Typography>
              <FormControl fullWidth required error={!!errors.technology?.favoriteLanguage}>
                <InputLabel color="secondary" id="favoriteLanguage-label">Favorite Programming Language</InputLabel>
                <Select color="secondary" {...register("technology.favoriteLanguage")} labelId="favoriteLanguage-label" label="Favorite Programming Language">
                  <MenuItem value="JavaScript">JavaScript</MenuItem>
                  <MenuItem value="Python">Python</MenuItem>
                  <MenuItem value="Java">Java</MenuItem>
                  <MenuItem value="C#">C#</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                required
                label="Years of Experience"
                color="secondary"
                {...register("technology.yearsOfExperience", { valueAsNumber: true })}
                error={!!errors.technology?.yearsOfExperience}
                helperText={errors.technology?.yearsOfExperience?.message}
              />
            </Box>
          )}

          {surveyTopic === "Health" && (
            <Box className="section" width={"100%"} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">Health Section</Typography>
              <FormControl fullWidth required error={!!errors.health?.exerciseFrequency}>
                <InputLabel color="secondary" id="exerciseFrequency-label">Exercise Frequency</InputLabel>
                <Select color="secondary" {...register("health.exerciseFrequency")} labelId="exerciseFrequency-label" label="Exercise Frequency">
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Rarely">Rarely</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth required error={!!errors.health?.dietPreference}>
                <InputLabel color="secondary" id="dietPreference-label">Diet Preference</InputLabel>
                <Select color="secondary" {...register("health.dietPreference")} labelId="dietPreference-label" label="Diet Preference">
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Vegan">Vegan</MenuItem>
                  <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {surveyTopic === "General Knowledge" && (
            <Box className="section" width={"100%"} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">General Knowledge Section</Typography>
              <Typography variant="body1">Answer the questions in the additional questions section after submission.</Typography>
            </Box>
          )}

          <TextField
            fullWidth
            multiline
            rows={4}
            required
            label="Feedback"
            color="secondary"
            {...register("feedback")}
            error={!!errors.feedback}
            helperText={errors.feedback?.message}
          />

          <Button sx={{ width: "50%" }} color="secondary" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SurveyForm;
