type Variant = "gold" | "solid" | "outlineLight" | "outlineDark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-teal-950 shadow-[0_16px_34px_-18px_rgba(197,154,90,0.9)] hover:bg-gold-300 hover:shadow-[0_18px_40px_-16px_rgba(197,154,90,0.75)]",
  solid: "bg-teal-900 text-ivory hover:bg-turquoise",
  outlineLight: "border border-ivory/35 text-ivory hover:border-gold/70 hover:bg-ivory/10",
  outlineDark:
    "border border-teal-900/25 text-teal-900 hover:border-gold hover:bg-teal-900/5",
  ghost: "text-gold hover:text-gold-300",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-[15px]",
};

export function actionClass(variant: Variant = "gold", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}
