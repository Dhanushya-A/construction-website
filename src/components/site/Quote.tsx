import { useState } from "react";
import { toast } from "sonner";
import { DEPARTMENTS } from "./data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

type Form = { name: string; email: string; subject: string; department: string; message: string };
const EMPTY: Form = { name: "", email: "", subject: "", department: DEPARTMENTS[0] ?? "", message: "" };

export function Quote() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sending, setSending] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "The field is required.";
    if (!form.email.trim()) next.email = "The field is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "The e-mail address entered is invalid.";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("One or more fields have an error. Please check and try again.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm(EMPTY);
      toast.success("Thank you for your message. It has been sent.");
    }, 700);
  };

  const label = "mb-2 block text-[14px] text-navy/70";

  return (
    <section id="quote" className="relative overflow-x-clip pt-[80px]">
      <div className="relative lg:flex lg:items-center">
        <div className="relative bg-navy px-5 pb-[200px] pt-[100px] md:px-[90px] lg:flex lg:min-h-[825px] lg:w-[57%] lg:flex-col lg:justify-center lg:py-[120px] lg:pr-[170px]">
          <SectionTitle
            dark
            align="left"
            watermark="QUOTE"
            subtitle="Interested in construction?"
            title={
              <>
                Request a free and <br className="hidden lg:block" />
                fair quote
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="mt-12 text-center text-[17px] leading-[2.35] text-body md:text-left xl:text-[19px]">
              Slogan creation for your construction company is crucial for the overall branding. And branding in
              today’s world can’t be ignored, We hope that the above Construction Slogans. Don’t forget to share it on
              social media.
            </p>
          </Reveal>
        </div>

        <Reveal
          x={60}
          y={0}
          className="relative z-10 mx-5 -mt-[140px] bg-gold p-6 md:mx-10 md:p-[75px] lg:absolute lg:right-[50px] lg:top-1/2 lg:-translate-y-1/2 lg:mx-0 lg:mt-0 lg:w-[46%] lg:max-w-[660px]"
        >
          <form onSubmit={submit} noValidate className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="q-name" className={label}>Your Name (required)</label>
              <input id="q-name" value={form.name} onChange={set("name")} className="form-field" aria-invalid={!!errors.name} />
              {errors.name && <span className="mt-1 block text-[13px] text-destructive">{errors.name}</span>}
            </div>
            <div>
              <label htmlFor="q-email" className={label}>Your Email (required)</label>
              <input id="q-email" type="email" value={form.email} onChange={set("email")} className="form-field" aria-invalid={!!errors.email} />
              {errors.email && <span className="mt-1 block text-[13px] text-destructive">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="q-subject" className={label}>Subject</label>
              <input id="q-subject" value={form.subject} onChange={set("subject")} className="form-field" />
            </div>
            <div>
              <label htmlFor="q-dept" className={label}>Departemant</label>
              <select id="q-dept" value={form.department} onChange={set("department")} className="form-field cursor-pointer bg-field text-[14px]">
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="q-msg" className={label}>Your Message</label>
              <textarea id="q-msg" value={form.message} onChange={set("message")} className="form-field h-[160px] resize-y" />
            </div>
            <div className="flex justify-end sm:col-span-2">
              <button type="submit" disabled={sending} className="btn-theme px-10 py-3 disabled:opacity-70">
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
