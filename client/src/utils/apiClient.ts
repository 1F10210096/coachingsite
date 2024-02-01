import aspida from '@aspida/axios';
import api from 'api/$api';
import axios from 'axios';

// 環境変数からAPIのベースURLを取得する（指定がない場合はデフォルトURLを使用）
const baseURL = (process.env.API_BASE_URL ?? "") || 'http://localhost:31577/api';

// Axiosインスタンスを作成し、ベースURLとwithCredentials設定を行う
const axiosInstance = axios.create({ baseURL, withCredentials: true });

// Aspidaクライアントを作成
export const apiClient = api(aspida(axiosInstance));