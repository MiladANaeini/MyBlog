import { BLOGPOST_URL, REGISTER_URL } from "@/constants/urls";
import { FormValueType, SignUpFormValueType } from "@/types/global";

export const fetchData = async (ssr: boolean = true) => {
  const response = await fetch((ssr ? process.env.URL : "") + BLOGPOST_URL);
  return response.json();
};

export const postData = async (formValue: FormValueType) => {
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

export const register = async (data: SignUpFormValueType) => {
  const res = await fetch(REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Something went wrong");
  }

  return res.json();
};
