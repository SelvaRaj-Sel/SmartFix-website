import { createContext, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactContext = createContext(null);

const initialForm = { name: "", company: "", email: "", phone: "", service: "", message: "" };

export const ContactProvider = ({ children }) => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (event) => {
    setSubmitted(false);
    setForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please provide your name, email address, and a short project description.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`New enquiry from ${form.name}${form.company ? ` - ${form.company}` : ""}`);
      const body = encodeURIComponent(
        [
          "Name: " + form.name,
          "Company: " + (form.company || "N/A"),
          "Email: " + form.email,
          "Phone: " + (form.phone || "N/A"),
          "Service: " + (form.service || "Not specified"),
          "",
          "Project details:",
          form.message,
        ].join("\n")
      );

      if (typeof window !== "undefined") {
        window.location.href = `mailto:info@smartfixautomation.com?subject=${subject}&body=${body}`;
      }

      setError("");
      setSubmitted(true);
      setForm(initialForm);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          company: form.company || "N/A",
          email: form.email,
          phone: form.phone || "N/A",
          service: form.service || "Not specified",
          message: form.message,
          reply_to: form.email,
        },
        publicKey
      );

      setError("");
      setSubmitted(true);
      setForm(initialForm);
    } catch (submitError) {
      console.error("EmailJS submission failed:", submitError);
      setError("Something went wrong while sending your enquiry. Please try again or contact info@smartfixautomation.com directly.");
    }
  };

  const value = useMemo(
    () => ({
      form,
      submitted,
      error,
      updateField,
      submit,
      setForm,
      setError,
      setSubmitted,
    }),
    [error, form, submitted]
  );

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
};
