"use client";
import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { login } from "@/lib/api/clientApi";
import { useState } from "react";
import { ApiError } from "../../../types/note";
import { useAuthStore } from "@/lib/store/authStore";
type NoteFormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as NoteFormValues;

    try {
      const user = await login(values);
      if (user) {
        setUser(user);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error",
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
      </form>
    </main>
  );
}
