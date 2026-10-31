import { useState, type FormEvent } from "react";
import { useContent } from "@/content/store";
import { Icon } from "@/components/ui/Icon";

type Values = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const subjects = [
  "آشنایی با مجموعه",
  "ثبت‌نام در دوره‌ها",
  "برنامه‌های تربیتی",
  "همکاری و مشارکت",
  "سایر موارد",
];

const emptyValues: Values = { name: "", phone: "", email: "", subject: subjects[0], message: "" };

function normalizeDigits(value: string) {
  return value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
}

export function ContactForm() {
  const { addMessage } = useContent();
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const setField = (field: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (values.name.trim().length < 3) next.name = "نام و نام خانوادگی را کامل وارد کنید.";
    const phone = normalizeDigits(values.phone).replace(/[^\d]/g, "");
    if (!values.phone.trim()) next.phone = "شماره تماس الزامی است.";
    else if (phone.length < 8) next.phone = "شماره تماس معتبر نیست.";
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "قالب ایمیل درست نیست.";
    }
    if (values.message.trim().length < 10) next.message = "متن پیام باید دست‌کم ۱۰ نویسه باشد.";
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    addMessage({
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      subject: values.subject,
      message: values.message.trim(),
    });
    setValues(emptyValues);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-gold/30 bg-white/70 px-6 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-turquoise/40 bg-turquoise/10 text-turquoise">
          <Icon name="check-circle" size={30} />
        </span>
        <h3 className="mt-5 text-[18px] font-semibold text-teal-900">پیام شما ثبت شد</h3>
        <p className="mt-2 max-w-sm text-[13px] leading-7 text-teal-950/60">
          پیام شما در صندوق پیام‌های مجموعه ثبت شد. پاسخگویی از سوی مدیران مجموعه انجام می‌شود.
        </p>
        <button
          className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-medium text-teal-800 transition-colors hover:text-gold"
          onClick={() => setSent(false)}
          type="button"
        >
          ارسال پیام دیگر
          <Icon name="arrow" size={15} />
        </button>
      </div>
    );
  }

  return (
    <form className="rounded-3xl border border-teal-900/10 bg-white/65 p-6 sm:p-8" noValidate onSubmit={onSubmit}>
      <div className="flex items-center gap-2 text-[10.5px] tracking-[0.28em] text-teal-800">
        <span className="h-px w-6 bg-teal-900/25" />
        فرم ارتباط
      </div>
      <h3 className="mt-3 text-[18px] font-semibold text-teal-900">پیام خود را برای ما بنویسید</h3>
      <p className="mt-1.5 text-[12.5px] leading-6 text-teal-950/55">
        برای پاسخگویی دقیق‌تر، موضوع پیام را انتخاب کنید.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[12px] text-teal-950/70">
            نام و نام خانوادگی <span className="text-terracotta">*</span>
          </span>
          <input
            aria-invalid={Boolean(errors.name)}
            className={`field ${errors.name ? "field-error" : ""}`}
            onChange={(event) => setField("name")(event.target.value)}
            placeholder="مثلاً: محمد رضایی"
            value={values.name}
          />
          {errors.name ? <span className="mt-1.5 block text-[11px] text-terracotta">{errors.name}</span> : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[12px] text-teal-950/70">
            شماره تماس <span className="text-terracotta">*</span>
          </span>
          <input
            aria-invalid={Boolean(errors.phone)}
            className={`field ${errors.phone ? "field-error" : ""}`}
            inputMode="tel"
            onChange={(event) => setField("phone")(event.target.value)}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            value={values.phone}
          />
          {errors.phone ? <span className="mt-1.5 block text-[11px] text-terracotta">{errors.phone}</span> : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[12px] text-teal-950/70">ایمیل (اختیاری)</span>
          <input
            aria-invalid={Boolean(errors.email)}
            className={`field ${errors.email ? "field-error" : ""}`}
            dir="ltr"
            onChange={(event) => setField("email")(event.target.value)}
            placeholder="name@example.com"
            type="email"
            value={values.email}
          />
          {errors.email ? <span className="mt-1.5 block text-[11px] text-terracotta">{errors.email}</span> : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[12px] text-teal-950/70">موضوع</span>
          <select
            className="field"
            onChange={(event) => setField("subject")(event.target.value)}
            value={values.subject}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[12px] text-teal-950/70">
            متن پیام <span className="text-terracotta">*</span>
          </span>
          <textarea
            aria-invalid={Boolean(errors.message)}
            className={`field min-h-[130px] resize-y leading-7 ${errors.message ? "field-error" : ""}`}
            onChange={(event) => setField("message")(event.target.value)}
            placeholder="پیام خود را بنویسید…"
            value={values.message}
          />
          {errors.message ? (
            <span className="mt-1.5 block text-[11px] text-terracotta">{errors.message}</span>
          ) : null}
        </label>
      </div>

      <button
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-900 px-7 py-3 text-[13.5px] font-medium text-ivory transition-colors duration-300 hover:bg-turquoise"
        type="submit"
      >
        <Icon name="send" size={16} />
        ارسال پیام
      </button>
      <p className="mt-3 text-[11px] leading-6 text-teal-950/40">
        اطلاعات شما فقط برای پاسخگویی به همین پیام استفاده می‌شود.
      </p>
    </form>
  );
}
