import { useEffect, useRef, useState } from "react";
import { Bot, CheckCircle2, RotateCcw, Send, User, X } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import icon from '../assets/Icon.png'

const steps = [
  { name: "name", prompt: "Hello! What should I call you?", placeholder: "Enter your full name", type: "text", required: true, max: 100 },
  { name: "company", prompt: "Which company or organization are you representing?", placeholder: "Company name", type: "text", optional: true, max: 200 },
  { name: "email", prompt: "What email address should our automation team reply to?", placeholder: "you@company.com", type: "email", required: true, max: 254 },
  { name: "phone", prompt: "Would you like to include a phone number?", placeholder: "Phone number", type: "tel", optional: true, max: 30 },
  { name: "service", prompt: "Which area best matches your requirement?", type: "choices", optional: true, choices: ["Automation engineering", "System integration", "Migration or retrofit", "Commissioning and support", "Plant automation design"] },
  { name: "message", prompt: "Finally, tell us about your equipment, process, or automation goal. Sending this answer submits your enquiry to Smartfix.", placeholder: "Describe your project requirements...", type: "textarea", required: true, max: 4000 },
];

const AssistantMessage = ({ children }) => (
  <div className="flex max-w-[92%] items-end gap-2">
    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-400/10 text-cyan-300"><Bot size={16} /></div>
    <div className="min-w-0 whitespace-pre-wrap break-words rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-6 text-slate-200">{children}</div>
  </div>
);

export default function Query({ onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const contentRef = useRef(null);
  const followLatest = useRef(true);
  const sendingRef = useRef(false);
  const complete = stepIndex === steps.length;
  const activeStep = steps[stepIndex];
  const enquiryText = ["New Smartfix website enquiry", ...steps.map((step) => `${step.name}: ${answers[step.name] || "Not provided"}`)].join("\n");
  const emailLink = `mailto:info@smartfixautomation.com?subject=${encodeURIComponent("New website enquiry")}&body=${encodeURIComponent(enquiryText)}`;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  // Follow new content only while the visitor is at the bottom. Observe both
  // content and viewport size so keyboard opening and text wrapping stay in view.
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const panel = scrollRef.current;
      if (panel && followLatest.current) panel.scrollTop = panel.scrollHeight;
    });
    observer.observe(scrollRef.current);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (followLatest.current && scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
      inputRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [stepIndex, sending, submitted, error]);

  const sendEnquiry = async (completedAnswers) => {
    if (sendingRef.current) return;
    sendingRef.current = true;
    setSending(true);
    setError("");
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        setError("Email sending is not configured yet. Please contact info@smartfixautomation.com.");
        return;
      }
      await emailjs.send(serviceId, templateId, {
        from_name: completedAnswers.name,
        company: completedAnswers.company || "N/A",
        email: completedAnswers.email,
        phone: completedAnswers.phone || "N/A",
        service: completedAnswers.service || "Not specified",
        message: completedAnswers.message,
        reply_to: completedAnswers.email,
        to_email: "info@smartfixautomation.com",
      }, { publicKey });
      setSubmitted(true);
    } catch {
      setError("We could not confirm your email was sent. Your answers are still here. Please contact info@smartfixautomation.com.");
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  const saveAnswer = (value) => {
    if (!activeStep || sendingRef.current) return;
    if (activeStep.required && !value.trim()) return setError("Please enter a response to continue.");
    if (activeStep.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return setError("Please enter a valid email address.");
    const next = { ...answers, [activeStep.name]: value };
    setAnswers(next);
    setDraft("");
    setError("");
    followLatest.current = true;
    setStepIndex(stepIndex + 1);
    // Submit the complete object directly: React state updates are asynchronous.
    if (stepIndex === steps.length - 1) void sendEnquiry(next);
  };

  const restart = () => {
    setStepIndex(0);
    setAnswers({});
    setDraft("");
    setError("");
    setSubmitted(false);
    followLatest.current = true;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[80] flex items-end justify-end p-3 text-white sm:p-5 lg:pr-8 xl:pr-12" role="dialog" aria-modal="true" aria-labelledby="query-dialog-title">
      <motion.section initial={{ opacity: 0, y: 22, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.97 }} transition={{ duration: 0.25 }} onClick={(event) => event.stopPropagation()}
        style={{ height: "min(620px, calc(100svh - 1.5rem))" }}
        className="flex flex-col w-[92vw] max-w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#061522] shadow-[0_28px_80px_rgba(0,0,0,0.5)] sm:w-[390px] lg:w-[400px]">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#091d2d] px-4 py-2 sm:px-5">
        
          <div className="flex min-w-0 items-center gap-2">
            <img src={icon} className="h-8 w-11"/>
            <div className="min-w-0"><h1 id="query-dialog-title" className="truncate text-sm font-semibold sm:text-base">Smartfix Project Assistant</h1><p className="text-[0.7rem] text-slate-400">Engineering enquiry</p></div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close query assistant" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-400 hover:text-white"><X size={18} /></button>
        </header>

        <div ref={scrollRef} onScroll={(event) => { const panel = event.currentTarget; followLatest.current = panel.scrollHeight - panel.scrollTop - panel.clientHeight < 60; }}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5" role="log" aria-label="Enquiry conversation" aria-live="polite">
          <div ref={contentRef} className="space-y-4">
            {steps.slice(0, stepIndex).map((step) => (
              <div key={step.name} className="space-y-3">
                <AssistantMessage>{step.prompt}</AssistantMessage>
                <div className="ml-auto flex max-w-[88%] items-end justify-end gap-2">
                  <div className="min-w-0 whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-(--primary) px-4 py-3 text-sm leading-6">{answers[step.name] || "Skipped"}</div>
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-slate-300"><User size={15} /></div>
                </div>
              </div>
            ))}
            {activeStep && <AssistantMessage>{activeStep.prompt}</AssistantMessage>}
            {sending && <AssistantMessage>Sending your completed enquiry to Smartfix by email…</AssistantMessage>}
            {submitted && <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.06] p-4 text-sm" role="status">
              <CheckCircle2 className="mb-2 text-cyan-300" size={26} />
              <h2 className="font-semibold">Thank you for contacting Smartfix!</h2>
              <p className="mt-2 text-slate-300">Your enquiry was sent to our office. Our team will reply to your email soon.</p>
            </div>}
            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            {complete && !sending && <div className="flex flex-wrap gap-4">
              {!submitted && <a href={emailLink} className="text-sm font-semibold text-cyan-300">Open email draft</a>}
              {error && <button type="button" onClick={() => sendEnquiry(answers)} className="text-sm font-semibold text-cyan-300">Retry submission</button>}
              <button type="button" onClick={restart} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300"><RotateCcw size={15} />Start another enquiry</button>
            </div>}
          </div>
        </div>

        {activeStep && <footer className="border-t border-white/10 bg-[#061522] px-3 py-2 sm:px-5">
          {activeStep.type === "choices" ? <div className="flex flex-wrap gap-2">
            {activeStep.choices.map((choice) => <button key={choice} type="button" onClick={() => saveAnswer(choice)} className="rounded-full border border-cyan-300/25 bg-cyan-400/[0.06] px-3 py-1.5 text-sm text-slate-200 hover:bg-cyan-400/10">{choice}</button>)}
            <button type="button" onClick={() => saveAnswer("")} className="px-3 py-1.5 text-sm text-slate-400">Skip</button>
          </div> : <form onSubmit={(event) => { event.preventDefault(); saveAnswer(draft.trim()); }} className="flex items-end gap-2">
            {activeStep.type === "textarea" ? <textarea ref={inputRef} rows={2} value={draft} maxLength={activeStep.max} aria-label={activeStep.placeholder} onChange={(event) => setDraft(event.target.value)} placeholder={activeStep.placeholder}
              onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); saveAnswer(draft.trim()); } }}
              className="min-h-10 min-w-0 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm outline-none focus:border-cyan-400/60" />
              : <input ref={inputRef} type={activeStep.type} value={draft} maxLength={activeStep.max} aria-label={activeStep.placeholder} onChange={(event) => setDraft(event.target.value)} placeholder={activeStep.placeholder} className="h-10 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-cyan-400/60" />}
            {activeStep.optional && !draft && <button type="button" onClick={() => saveAnswer("")} className="h-10 px-2 text-sm">Skip</button>}
            <button type="submit" aria-label={activeStep.name === "message" ? "Submit enquiry" : "Send answer"} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-(--primary) text-slate-950 hover:bg-cyan-300"><Send size={18} /></button>
          </form>}
          <p className="mt-1.5 text-center text-[0.68rem] text-slate-400">Step {stepIndex + 1} of {steps.length} · {activeStep.name === "message" ? "Enter to send · Shift+Enter for a new line" : "Your details are used to respond to this enquiry."}</p>
        </footer>}
      </motion.section>
    </motion.div>
  );
}
