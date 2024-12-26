import { BLOGPOST_URL } from "@/constants/urls";
import { FormValues } from "@/types/global";

export const fetchData = async () => {
  const response = await fetch(BLOGPOST_URL);
  return response.json();
};

export const postData = async (formValue: FormValues) => {
  const response = await fetch(BLOGPOST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formValue)
  });
  const data = await response.json();
  return data;
};

export const deleteData = async (id: string) => {
  await fetch(`${BLOGPOST_URL}/${id}`, {
    method: "DELETE"
  });
};
