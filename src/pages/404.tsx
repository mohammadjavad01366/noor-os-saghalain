import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { actionClass } from "@/components/ui/buttonStyles";
import { BrandMark } from "@/components/ui/Ornament";
import { Icon } from "@/components/ui/Icon";

export default function Notfound() {
  usePageMeta("صفحه یافت نشد");

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-teal-950 px-6 text-center text-ivory">
      <div aria-hidden="true" className="pattern-star absolute inset-0 opacity-[0.08]" />
      <BrandMark className="relative h-16 w-16 text-gold" />
      <p className="relative mt-8 text-[10px] tracking-[0.4em] text-gold/70">۴۰۴</p>
      <h1 className="relative mt-4 text-[1.6rem] font-bold sm:text-[2rem]">این صفحه یافت نشد</h1>
      <p className="relative mt-3 max-w-md text-[13px] leading-7 text-ivory/60">
        نشانی وارد شده در مجموعه وجود ندارد یا جابه‌جا شده است.
      </p>
      <Link className={`${actionClass("gold", "md")} relative mt-8`} to="/">
        بازگشت به صفحه اصلی
        <Icon name="arrow" size={16} />
      </Link>
    </div>
  );
}
