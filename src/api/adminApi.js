// src/api/getAllUsers.js
import axios from 'axios';

export const getAllUsers = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, {
    withCredentials: true,
  });
  return res.data.users;
};

export const updateUser = (id, updates) =>
  axios.put(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, updates, { withCredentials: true });

export const deleteUser = (id) =>
  axios.delete(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, { withCredentials: true });

export const banUser = (id, { banFrom, banTo }) =>
  axios.put(
    `${import.meta.env.VITE_API_URL}/admin/users/${id}/ban`,
    { banFrom, banTo },
    { withCredentials: true }
  );

/**
 * Unban a user
 * @param {string} id - User ID
 */
export const unbanUser = (id) =>
  axios.put(`${import.meta.env.VITE_API_URL}/admin/users/${id}/unban`, null, {
    withCredentials: true,
  });
export const searchUsers = async (email) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users/search`, {
    params: { email },
    withCredentials: true, // include cookies if auth is used
  });
  return res.data;
};


export async function sendAdminMail(data) {
  return axios.post(`${import.meta.env.VITE_API_URL}/admin/mail`, data, {
    withCredentials: true,
  });
}
export async function addCredit(userId,amount) {
  return axios.post(`${import.meta.env.VITE_API_URL}/admin/credit`, {userId,amount:Number(amount)}, {
    withCredentials: true,
  });
}
export async function adForAdmin(id) {
  return axios.get(`${import.meta.env.VITE_API_URL}/admin/ads/${id}`, {
    withCredentials: true,
  });
}

export const fetchAdminAnalytics = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/ads/analytics`, {
    withCredentials: true, // if using cookies for auth
  });
  return response.data;
};
export async function deleteAdById(adId) {
  return axios.delete(`${import.meta.env.VITE_API_URL}/admin/ads/${adId}`, {
    withCredentials: true,
  });
}

export async function getAffiliateAds() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/getAffiliateAds`, {
    withCredentials: true,
  });
  return response.data;
};
export async function addAffiliateAd(adData) {
  return axios.post(`${import.meta.env.VITE_API_URL}/addAffiliateAd`, adData, {
    withCredentials: true,
  });
};
export async function updateAffiliateAd(id, adData) {
  return axios.put(`${import.meta.env.VITE_API_URL}/updateAffiliateAd/${id}`, adData, {
    withCredentials: true,
  });
};
export async function deleteAffiliateAd(id) {
  return axios.delete(`${import.meta.env.VITE_API_URL}/deleteAffiliateAd/${id}`, {
    withCredentials: true,
  });
};

