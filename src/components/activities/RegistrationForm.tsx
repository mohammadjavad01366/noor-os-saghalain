import { useState, type FormEvent } from "react";
import { useContent } from "@/content/store";
import { Icon } from "@/components/ui/Icon";

type Values = { name: string; phone: string; age: string; note: string };
type Errors = Partial<Record<keyof Values, string>>;

const emptyValues: Values = { name: "", phone: "", age: "", note: "" };

export function RegistrationForm({ activitySlug, activityTitle }: { activitySlug: string; activityTitle: string }) {
  const { addRegistration } = useContent();
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const setField = (field: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 3) next.name = "نام و نام خانوادگی را کامل وارد کنید.";
    const digits = values.phone.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[^\d]/g, "");
    if (!values.phone.trim()) next.phone = "شماره تماس الزامی است.";
    else if (digits.length < 8) next.phone = "شماره تماس معتبر نیست.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    addRegistration({
      activitySlug,
      activityTitle,
      name: values.name.trim(),
      phone: values.phone.trim(),
      age: values.age.trim(),
      note: values.note.trim(),
    });
    setValues(emptyValues);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-turquoise/40 bg-turquoise/8 p-5 text-center">
        <Icon className="mx-auto text-turquoise" name="check-circle" size={28} />
        <p className="mt-3 text-[13.5px] font-semibold text-teal-900">درخواست ثبت‌نام ثبت شد</p>
        <p className="mt-1.5 text-[12px] leading-6 text-teal-950/60">
          درخواست شما برای «{activityTitle}» ثبت شد. هماهنگی نهایی از سوی مجموعه انجام می‌شود.
        </p>
        <button
          className="mt-4 text-[12px] font-medium text-teal-800 transition-colors hover:text-gold"
          onClick={() => setSent(false)}
          type="button"
        >
          ثبت درخواست دیگر
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-3.5" noValidate onSubmit={onSubmit}>
      <div>
        <input
          aria-label="نام و نام خانوادگی"
          aria-invalid={Boolean(errors.name)}
          className={`field ${errors.name ? "field-error" : ""}`}
          onChange={(event) => setField("name")(event.target.value)}
          placeholder="نام و نام خانوادگی"
          value={values.name}
        />
        {errors.name ? <span className="mt-1 block text-[10.5px] text-terracotta">{errors.name}</span> : null}
      </div>
      <div>
        <input
          aria-label="شماره تماس"
          aria-invalid={Boolean(errors.phone)}
          className={`field ${errors.phone ? "field-error" : ""}`}
          inputMode="tel"
          onChange={(event) => setField("phone")(event.target.value)}
          placeholder="شماره تماس"
          value={values.phone}
        />
        {errors.phone ? (
          <span className="mt-1 block text-[10.5px] text-terracotta">{errors.phone}</span>
        ) : null}
      </div>
      <input
        aria-label="سن"
        className="field"
        inputMode="numeric"
        onChange={(event) => setField("age")(event.target.value)}
        placeholder="سن (اختیاری)"
        value={values.age}
      />
      <textarea
        aria-label="توضیحات"
        className="field min-h-[84px] resize-y"
        onChange={(event) => setField("note")(event.target.value)}
        placeholder="توضیح کوتاه (اختیاری)"
        value={values.note}
      />
      <button
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-900 px-5 py-3 text-[13px] font-medium text-ivory transition-colors hover:bg-turquoise"
        type="submit"
      >
        <Icon name="check" size={16} />
        ارسال درخواست ثبت‌نام
      </button>
    </form>
  );
}
