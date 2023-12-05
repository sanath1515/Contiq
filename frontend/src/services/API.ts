import axios from 'axios';
const API_BASE_URL: string = process.env.API_URL as string;
const accessToken=window.localStorage.getItem("token")
export default axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${accessToken}`
  }
});
