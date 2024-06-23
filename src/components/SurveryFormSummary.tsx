import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const SurveyFormSummary = () => {
  const location = useLocation();
  const { state } = location as any; // Use "as any" to avoid TypeScript errors
  const { data, additionalQuestions } = state || {};
  console.log(data.surveyTopic)

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#E2BBE9",
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4">Survey Summary</Typography>
      {data && (
        <>
          <Typography variant="body1" gutterBottom>
            Hi {data.fullname},
          </Typography>
          <Typography variant="body1" gutterBottom>
            Thank you for taking the time to complete our survey. Below is a summary of your responses:
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Full Name:</strong> {data.fullname}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {data.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Survey Topic:</strong> {data.surveyTopic}
          </Typography>
          {data.surveyTopic === "Technology" && (
            <>
              <Typography variant="body1" gutterBottom>
                <strong>Favorite Programming Language:</strong> {data.technology?.favoriteLanguage}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Years of Experience:</strong> {data.technology?.yearsOfExperience}
              </Typography>
            </>
          )}
          {data.surveyTopic === "Health" && (
            <>
              <Typography variant="body1" gutterBottom>
                <strong>Exercise Frequency:</strong> {data.health?.exerciseFrequency}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Diet Preference:</strong> {data.health?.dietPreference}
              </Typography>
            </>
          )}
          {(data.surveyTopic === "General Knowledge"||data.surveyTopic === "Technology"||data.surveyTopic === "Health") && (
            <>
              <Typography variant="body1" gutterBottom>
                <strong>Additional Questions:</strong>
              </Typography>
              {additionalQuestions && additionalQuestions.map((question: any, index: number) => (
                <Typography key={index} variant="body1" gutterBottom>
                  {index + 1}. {question.question}
                </Typography>
              ))}
            </>
          )}
          <Typography variant="body1" gutterBottom>
            <strong>Feedback:</strong> {data.feedback}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default SurveyFormSummary;
