import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../constants/common';

export interface FormState {
    jobTitle: string;
    companyName: string;
    industry: string;
    location: string;
    remoteType: string;
    minExperience: string;
    maxExperience: string;
    minSalary: string;
    maxSalary: string;
    totalEmployee: string;
    applyType: string;
}

export interface JobListField extends FormState {
  id: string;
}

export interface FormErrors extends FormState {

}

function getRequestConfig(): AxiosRequestConfig {
  return {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
  };
}

export async function getJobList() {
  const response = await axios.get(`${API_BASE_URL}/job`, getRequestConfig());
  return response;
}

export async function createJob(data: FormState) {
    const response = await axios.post(`${API_BASE_URL}job`, data, getRequestConfig());
    return response;
}

export async function editJob(data: FormState, id: string) {
  const response = await axios.put(`${API_BASE_URL}job/${id}`, data, getRequestConfig());
  return response;
}

export async function deleteJob(id: string) {
  const response = await axios.delete(`${API_BASE_URL}job/${id}`, getRequestConfig());
  return response;
}

