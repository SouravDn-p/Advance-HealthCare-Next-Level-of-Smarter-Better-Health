import {
  GetAllSurveyResponse,
  SubmitResultRequestBody,
  SurveyRequestBody,
} from "@/typesAndIntefaces/survey/SurveyResponseAndBody";
import { baseApi } from "../baseApi";

export const surveyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Start survey (POST)
    getStartSurvey: builder.mutation<GetAllSurveyResponse, SurveyRequestBody>({
      query: (body) => ({
        url: "/api/survey/start",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Survey"],
    }),

    getAllSurveyResult: builder.query({
      query: () => ({
        url: `/api/survey`,
        method: "GET",
      }),
      providesTags: ["Survey"],
    }),

    getAllAdminSurveyResult: builder.query({
      query: ({ department, age, gender }) => ({
        url: `/api/survey/admin/get-all-survey-stats?age=${age}&gender=${gender}&unitDepartment=${department}`,
        method: "GET",
      }),
      providesTags: ["Survey"],
    }),

    // Submit survey result (POST)
    submitResult: builder.mutation<GetAllSurveyResponse, SubmitResultRequestBody>({
      query: ({ surveyId, answer }) => ({
        url: `/api/survey/${surveyId}/submit`,
        method: "POST",
        body: answer,
      }),
      invalidatesTags: ["Survey"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetStartSurveyMutation,
  useGetAllAdminSurveyResultQuery,
  useGetAllSurveyResultQuery,
  useSubmitResultMutation,
} = surveyApi;
