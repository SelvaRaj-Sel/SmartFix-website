import { useContext, useEffect, useRef, useState } from "react";
import { Bot, CheckCircle2, Mail, RotateCcw, Send, Sparkles, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ContactContext } from "../context/ContactContext.jsx";

const steps = [
  { name: "name", prompt: "Hello! What should I call you?", placeholder: "Enter your full name", type: "text", required: true },
  { name: "company", prompt: "Great. Which company or organization are you representing?", placeholder: "Company name", type: "text", optional: true },
  { name: "email", prompt: "What email address should our automation team reply to?", placeholder: "you@company.com", type: "email", required: true },
  { name: "phone", prompt: "Would you like to include a phone number?", placeholder: "Phone number", type: "tel", optional: true },
  {
    name: "service",
    prompt: "Which area best matches your requirement?",
    type: "choices",
    optional: true,
    choices: ["Automation engineering", "System integration", "Migration or retrofit", "Commissioning and support", "Plant automation design"],
  },
  { name: "message", prompt: "Finally, tell us about your equipment, process, or automation goal.", placeholder: "Describe your project requirements...", type: "textarea", required: true },
];

const validate = (step, value) => {
  if (step.required && !value.trim()) return "Please enter a response to continue.";
  if (step.name === "email" && !/^\S+@\S+\.\S+$/.test(value)) return "Please enter a valid email address.";
  return "";
};

const AssistantMessage = ({ children }) => (
  <div className="flex max-w-[88%] items-end gap-2 sm:max-w-[72%]">
    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-400/10 text-cyan-300"><Bot size={16} /></div>
    <div className="rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-6 text-slate-200">{children}</div>
  </div>
);

export default function Query({ onClose }) {
  const { form, submitted, error, updateField, submit, setSubmitted, setError } = useContext(ContactContext);
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [localError, setLocalError] = useState("");
  const [answers, setAnswers] = useState({});
  const inputRef = useRef(null);
  const isReview = stepIndex >= steps.length;
  const activeStep = steps[Math.min(stepIndex, steps.length - 1)];
  const replies = steps.slice(0, stepIndex).map((step) => ({
    ...step,
    value: answers[step.name] || (step.optional ? "Skipped" : ""),
  }));

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

  const saveAnswer = (value) => {
    const validationError = validate(activeStep, value);
    if (validationError) return setLocalError(validationError);
    updateField({ target: { name: activeStep.name, value } });
    setAnswers((current) => ({ ...current, [activeStep.name]: value }));
    setDraft("");
    setLocalError("");
    setAnswers({});
    setStepIndex((current) => current + 1);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleAnswer = (event) => {
    event.preventDefault();
    saveAnswer(draft.trim());
  };

  const restart = () => {
    setStepIndex(0);
    setDraft("");
    setLocalError("");
    setError("");
    setSubmitted(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-end justify-end p-3 text-white sm:p-5 lg:pr-8 xl:pr-12"
      role="dialog"
      aria-modal="true"
      aria-labelledby="query-dialog-title"
    >
        <motion.section
          initial={{ opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => event.stopPropagation()}
          className="flex max-h-[85vh] w-[92vw] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_28px_80px_rgba(0,0,0,0.5)]  sm:h-[88svh] sm:w-[390px] lg:h-[80svh] lg:w-[400px]"
        >
          <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#091d2d] px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-300">
                <Bot size={21} /><span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#091d2d] bg-emerald-400" />
              </div>
              <div className="min-w-0">
                <h1 id="query-dialog-title" className="truncate text-sm font-semibold text-white sm:text-base">Smartfix Project Assistant</h1>
                <p className="truncate text-[0.7rem] text-slate-400">Online · Engineering enquiry</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              
              <button type="button" onClick={onClose} aria-label="Close query assistant" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-white">
                <X size={18} />
              </button>
            </div>
          </header>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-white/[0.02] backdrop-blur px-4 py-5 sm:px-5">
           

            {replies.map((reply, index) => (
              <div key={reply.name} className="space-y-3">
                <AssistantMessage>{reply.prompt}</AssistantMessage>
                <div className="ml-auto flex max-w-[88%] items-end justify-end gap-2 sm:max-w-[72%]">
                  <div className="rounded-2xl rounded-br-sm bg-(--primary) px-4 py-3 text-sm leading-6 text-slate-950">{reply.value}</div>
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-slate-300"><User size={15} /></div>
                </div>
                {index === replies.length - 1 && !isReview && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><AssistantMessage>{activeStep.prompt}</AssistantMessage></motion.div>
                )}
              </div>
            ))}

            {stepIndex === 0 && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><AssistantMessage>{activeStep.prompt}</AssistantMessage></motion.div>}

            {isReview && !submitted && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 shrink-0 text-cyan-300" size={20} />
                  <div><h2 className="font-semibold text-white">Your enquiry is ready</h2><p className="mt-1 text-sm leading-6 text-slate-400">Send it now and our team will reply to {form.email}.</p></div>
                </div>
                <button onClick={submit} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-(--primary) px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">Send to Smartfix <Mail size={17} /></button>
                {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
              </motion.div>
            )}

            <AnimatePresence>
              {submitted && (
                <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-6 text-center">
                  <CheckCircle2 className="mx-auto text-emerald-300" size={34} />
                  <h2 className="mt-3 text-lg font-semibold">Enquiry sent successfully</h2>
                  <p className="mt-2 text-sm text-slate-300">Thank you. Our automation team will contact you shortly.</p>
                  <button onClick={restart} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200"><RotateCcw size={15} /> Start another enquiry</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isReview && !submitted && (
            <footer className="shrink-0 border-t border-white/10 bg-[#061522] p-3 sm:px-5 sm:py-4">
              {activeStep.type === "choices" ? (
                <div className="flex flex-wrap gap-2">
                  {activeStep.choices.map((choice) => <button key={choice} onClick={() => saveAnswer(choice)} className="rounded-full border border-cyan-300/25 bg-cyan-400/[0.06] px-4 py-2.5 text-sm text-slate-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/10 hover:text-white">{choice}</button>)}
                  <button onClick={() => saveAnswer("")} className="rounded-full border border-white/10 px-4 py-2.5 text-sm text-slate-400 transition hover:border-white/25 hover:text-white">Skip</button>
                </div>
              ) : (
                <form onSubmit={handleAnswer} className="flex items-end gap-2">
                  {activeStep.type === "textarea" ? (
                    <textarea ref={inputRef} autoFocus rows="2" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={activeStep.placeholder} className="min-h-12 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10" />
                  ) : (
                    <input ref={inputRef} autoFocus type={activeStep.type} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={activeStep.placeholder} className="h-12 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10" />
                  )}
                  {activeStep.optional && !draft && <button type="button" onClick={() => saveAnswer("")} className="h-12 px-3 text-sm font-semibold text-white hover:text-white">Skip</button>}
                  <button type="submit" aria-label="Send answer" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-(--primary) text-slate-950 transition hover:bg-cyan-300"><Send size={18} /></button>
                  
                </form>
              )}
              {localError && <p className="mt-3 text-sm text-red-300">{localError}</p>}
              <p className="mt-3 text-center text-[0.68rem] text-slate-600">Step {stepIndex + 1} of {steps.length} · Your details are used only to respond to this enquiry.</p>
            </footer>
          )}
        </motion.section>
    </motion.div>
  );
}
