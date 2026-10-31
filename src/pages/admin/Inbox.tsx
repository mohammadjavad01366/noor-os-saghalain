import { useContent } from "@/content/store";
import { DeleteButton, Panel } from "./fields";

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function Inbox() {
  const { submissions, removeSubmission } = useContent();

  return (
    <div className="space-y-5">
      <Panel description="پیام‌هایی که از فرم ارتباط با ما ارسال شده‌اند." title={`پیام‌های دریافتی (${submissions.messages.length})`}>
        {submissions.messages.length === 0 ? (
          <p className="rounded-xl border border-dashed border-teal-900/15 p-6 text-center text-[11.5px] text-teal-950/40">
            هنوز پیامی دریافت نشده است.
          </p>
        ) : (
          <ul className="space-y-3">
            {submissions.messages.map((message) => (
              <li className="rounded-xl border border-teal-900/10 bg-white/50 p-4" key={message.id}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-teal-950/45">
                    <span className="font-medium text-teal-900">{message.name}</span>
                    <span>·</span>
                    <span dir="ltr">{message.phone}</span>
                    {message.email ? (
                      <>
                        <span>·</span>
                        <span dir="ltr">{message.email}</span>
                      </>
                    ) : null}
                    <span>·</span>
                    <span>{formatDate(message.createdAt)}</span>
                  </div>
                  <DeleteButton onClick={() => removeSubmission("messages", message.id)} />
                </div>
                <p className="mt-2 text-[10.5px] text-gold">{message.subject}</p>
                <p className="mt-1.5 text-[12.5px] leading-7 text-teal-950/70">{message.message}</p>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel
        description="درخواست‌های ثبت‌نام ثبت‌شده از صفحات فعالیت‌ها."
        title={`درخواست‌های ثبت‌نام (${submissions.registrations.length})`}
      >
        {submissions.registrations.length === 0 ? (
          <p className="rounded-xl border border-dashed border-teal-900/15 p-6 text-center text-[11.5px] text-teal-950/40">
            هنوز درخواستی ثبت نشده است.
          </p>
        ) : (
          <ul className="space-y-3">
            {submissions.registrations.map((registration) => (
              <li className="rounded-xl border border-teal-900/10 bg-white/50 p-4" key={registration.id}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-teal-950/45">
                    <span className="font-medium text-teal-900">{registration.name}</span>
                    <span>·</span>
                    <span dir="ltr">{registration.phone}</span>
                    {registration.age ? (
                      <>
                        <span>·</span>
                        <span>سن: {registration.age}</span>
                      </>
                    ) : null}
                    <span>·</span>
                    <span>{formatDate(registration.createdAt)}</span>
                  </div>
                  <DeleteButton onClick={() => removeSubmission("registrations", registration.id)} />
                </div>
                <p className="mt-2 text-[10.5px] text-gold">{registration.activityTitle}</p>
                {registration.note ? (
                  <p className="mt-1.5 text-[12px] leading-7 text-teal-950/65">{registration.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
