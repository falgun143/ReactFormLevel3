import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type Data = {
  fullname: string;
  email: string;
  surveyTopic: string;
  technology?: {
    favoriteLanguage: string;
    yearsOfExperience: number;
  };
  health?: {
    exerciseFrequency: string;
    dietPreference: string;
  };
  education?: {
    highestQualification: string;
    fieldOfStudy: string;
  };
  feedback: string;
};

export const SurveyFormValidation = () => {
  const surveyFormSchema :ZodType<Data> = z.object({
    fullname: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    surveyTopic: z.string().min(1, { message: "Survey topic is required" }),
    technology: z
      .object({
        favoriteLanguage: z.string().min(1, { message: "Favorite language is required" }),
        yearsOfExperience: z
          .number()
          .min(0, { message: "Years of experience must be a positive number" })
          .max(50, { message: "Years of experience must be less than or equal to 50" }),
      })
      .optional(),
    health: z
      .object({
        exerciseFrequency: z.string().min(1, { message: "Exercise frequency is required" }),
        dietPreference: z.string().min(1, { message: "Diet preference is required" }),
      })
      .optional(),
    education: z
      .object({
        highestQualification: z.string().min(1, { message: "Highest qualification is required" }),
        fieldOfStudy: z.string().min(1, { message: "Field of study is required" }),
      })
      .optional(),
    feedback: z.string().min(50, { message: "Feedback must be at least 50 characters" }),
  });

  const { register, handleSubmit, control, formState: { errors }, watch } = useForm<Data>({
    resolver: zodResolver(surveyFormSchema),
  });

  return { register, handleSubmit, control, errors, watch };
};


