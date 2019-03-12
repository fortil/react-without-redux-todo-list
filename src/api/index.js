import { API_URL } from "./constants";
export const getCharacter = async lookingFor => {
  const response = await fetch(
    `${API_URL}?name=${encodeURIComponent(lookingFor)}`
  ).then(res => res.json());
  
  return response;
};
