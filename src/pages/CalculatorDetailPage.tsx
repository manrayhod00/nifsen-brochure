import { ReactNode, useEffect, useId, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { animate, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Info } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import { FloatingCoins, Magnetic, WordReveal, useParallax } from "@/components/motion";
import { useSEO } from "@/hooks/useSEO";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type CalculatorType = "sip" | "compounding" | "retirement" | "emi";

const calculatorConfig = {
  sip: {
    title: "SIP Calculator",
    description: "Calculate the future value of your Systematic Investment Plan investments.",
  },
  compounding: {
    title: "Compounding Calculator",
    description: "See how your money grows with the power of compound interest over time.",
  },
  retirement: {
    title: "Retirement Calculator",
    description: "Estimate how much you need to save monthly for your retirement corpus.",
  },
  emi: {
    title: "EMI Calculator",
    description: "Calculate your Equated Monthly Installment for loans.",
  },
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatYears = (value: number) => `${Math.round(value)} years`;

/* -------------------------------------------------------------------------- */
/* Local presentation helpers (no maths in here)                              */
/* -------------------------------------------------------------------------- */

/**
 * Shows a number that glides smoothly to its new value whenever it changes.
 * The animation always lands exactly on `value`, so the final text matches
 * `format(value)` precisely. Screen readers get the final value only.
 */
const AnimatedValue = ({
  value,
  format,
  className,
}: {
  value: number;
  format: (value: number) => string;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);
  const current = useRef(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !Number.isFinite(value) || !Number.isFinite(current.current)) {
      current.current = value;
      setDisplay(value);
      return;
    }
    const controls = animate(current.current, value, {
      duration: 0.7,
      ease: EASE_OUT,
      onUpdate: (v) => {
        current.current = v;
        setDisplay(v);
      },
      onComplete: () => {
        current.current = value;
        setDisplay(value);
      },
    });
    return () => controls.stop();
  }, [value, reduce]);

  return (
    <span className={className}>
      <span aria-hidden="true" className="tabular-nums">
        {format(display)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
};

interface RangeFieldProps {
  label: string;
  valueText: string;
  value: number;
  min: number | string;
  max: number | string;
  step?: number | string;
  onChange: (value: number) => void;
}

const RangeField = ({ label, valueText, value, min, max, step, onChange }: RangeFieldProps) => {
  const id = useId();
  const lo = Number(min);
  const hi = Number(max);
  const pct = hi > lo ? Math.min(100, Math.max(0, ((value - lo) / (hi - lo)) * 100)) : 0;

  return (
    <div className="group/field">
      <label htmlFor={id} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm font-medium mb-3">
        <span className="text-foreground/85">{label}:</span>{" "}
        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 font-semibold text-accent tabular-nums transition-shadow duration-300 group-focus-within/field:shadow-[0_0_18px_hsla(45,90%,60%,0.35)]">
          {valueText}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(90deg, hsl(262 83% 58%) 0%, hsl(45 90% 62%) ${pct}%, hsl(var(--muted)) ${pct}%, hsl(var(--muted)) 100%)`,
        }}
        className={[
          "w-full h-2 rounded-full appearance-none cursor-pointer accent-accent",
          "transition-shadow duration-300 focus:outline-none",
          "focus-visible:shadow-[0_0_0_3px_hsla(45,90%,60%,0.25),0_0_22px_hsla(262,85%,60%,0.45)]",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
          "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent",
          "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background",
          "[&::-webkit-slider-thumb]:shadow-[0_0_0_4px_hsla(45,90%,60%,0.2),0_0_16px_hsla(45,90%,60%,0.6)]",
          "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200",
          "hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-125",
          "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background",
          "[&::-moz-range-thumb]:shadow-[0_0_0_4px_hsla(45,90%,60%,0.2),0_0_16px_hsla(45,90%,60%,0.6)]",
        ].join(" ")}
      />
    </div>
  );
};

const InputsPanel = ({ children }: { children: ReactNode }) => (
  <ScrollReveal>
    <GlassCard className="p-6 sm:p-8 h-full" hover={false}>
      <div className="relative space-y-7">{children}</div>
    </GlassCard>
  </ScrollReveal>
);

const ResultRow = ({
  label,
  children,
  index,
  final = false,
}: {
  label: string;
  children: ReactNode;
  index: number;
  final?: boolean;
}) => (
  <motion.div
    className={
      final
        ? "flex flex-wrap justify-between items-center gap-x-4 gap-y-1 pt-2"
        : "flex flex-wrap justify-between items-center gap-x-4 gap-y-1 pb-3 border-b border-border/30"
    }
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay: 0.35 + index * 0.1, ease: EASE_OUT }}
  >
    <span className={final ? "font-medium" : "text-muted-foreground"}>{label}</span>
    {children}
  </motion.div>
);

interface Segment {
  label: string;
  value: number;
  color: string;
}

const BreakdownBar = ({ segments }: { segments: Segment[] }) => {
  const total = segments.reduce((sum, s) => sum + Math.max(0, Number.isFinite(s.value) ? s.value : 0), 0);
  const share = (v: number) => (total > 0 && Number.isFinite(v) ? (Math.max(0, v) / total) * 100 : 0);

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
    >
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted/60" aria-hidden="true">
        {segments.map((s) => (
          <motion.div
            key={s.label}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ background: s.color, boxShadow: `0 0 14px ${s.color}` }}
            initial={{ width: "0%" }}
            animate={{ width: `${share(s.value)}%` }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
        {segments.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} aria-hidden="true" />
            {s.label}
            <span className="font-semibold text-foreground/80 tabular-nums">{Math.round(share(s.value))}%</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const PURPLE = "hsl(262 83% 58%)";
const GOLD = "hsl(45 90% 62%)";
const RED = "hsl(var(--destructive))";

const ResultsPanel = ({ children }: { children: ReactNode }) => (
  <ScrollReveal delay={0.1} scale>
    <GlassCard className="border-spin p-6 sm:p-8 h-full" hover={false}>
      {/* Breathing orbs behind the numbers */}
      <motion.div
        className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="relative">
        <h3 className="font-semibold mb-6 flex items-center gap-3">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Results
        </h3>
        {children}
      </div>
    </GlassCard>
  </ScrollReveal>
);

const FINAL_VALUE_CLASS = "text-2xl sm:text-3xl font-bold text-gradient-gold";

/* -------------------------------------------------------------------------- */
/* Calculators                                                                */
/* -------------------------------------------------------------------------- */

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const monthlyRate = expectedReturn / 12 / 100;
  const months = years * 12;
  const futureValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);
  const totalInvested = monthlyInvestment * months;
  const earnings = futureValue - totalInvested;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <InputsPanel>
        <RangeField
          label="Monthly Investment"
          valueText={formatCurrency(monthlyInvestment)}
          min="500"
          max="100000"
          step="500"
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
        />
        <RangeField
          label="Investment Period"
          valueText={`${years} years`}
          min="1"
          max="30"
          value={years}
          onChange={setYears}
        />
        <RangeField
          label="Expected Return"
          valueText={`${expectedReturn}% p.a.`}
          min="1"
          max="30"
          step="0.5"
          value={expectedReturn}
          onChange={setExpectedReturn}
        />
      </InputsPanel>

      <ResultsPanel>
        <div className="space-y-4">
          <ResultRow label="Total Invested" index={0}>
            <AnimatedValue value={totalInvested} format={formatCurrency} className="font-semibold" />
          </ResultRow>
          <ResultRow label="Est. Returns" index={1}>
            <AnimatedValue value={earnings} format={formatCurrency} className="font-semibold text-accent" />
          </ResultRow>
          <ResultRow label="Future Value" index={2} final>
            <AnimatedValue value={futureValue} format={formatCurrency} className={FINAL_VALUE_CLASS} />
          </ResultRow>
        </div>
        <BreakdownBar
          segments={[
            { label: "Total Invested", value: totalInvested, color: PURPLE },
            { label: "Est. Returns", value: earnings, color: GOLD },
          ]}
        />
      </ResultsPanel>
    </div>
  );
};

const CompoundingCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const futureValue = principal * Math.pow(1 + rate / 100, years);
  const earnings = futureValue - principal;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <InputsPanel>
        <RangeField
          label="Principal Amount"
          valueText={formatCurrency(principal)}
          min="10000"
          max="10000000"
          step="10000"
          value={principal}
          onChange={setPrincipal}
        />
        <RangeField
          label="Time Period"
          valueText={`${years} years`}
          min="1"
          max="30"
          value={years}
          onChange={setYears}
        />
        <RangeField
          label="Interest Rate"
          valueText={`${rate}% p.a.`}
          min="1"
          max="30"
          step="0.5"
          value={rate}
          onChange={setRate}
        />
      </InputsPanel>

      <ResultsPanel>
        <div className="space-y-4">
          <ResultRow label="Principal" index={0}>
            <AnimatedValue value={principal} format={formatCurrency} className="font-semibold" />
          </ResultRow>
          <ResultRow label="Interest Earned" index={1}>
            <AnimatedValue value={earnings} format={formatCurrency} className="font-semibold text-accent" />
          </ResultRow>
          <ResultRow label="Total Value" index={2} final>
            <AnimatedValue value={futureValue} format={formatCurrency} className={FINAL_VALUE_CLASS} />
          </ResultRow>
        </div>
        <BreakdownBar
          segments={[
            { label: "Principal", value: principal, color: PURPLE },
            { label: "Interest Earned", value: earnings, color: GOLD },
          ]}
        />
      </ResultsPanel>
    </div>
  );
};

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflation, setInflation] = useState(6);
  const [yearsInRetirement, setYearsInRetirement] = useState(25);

  const yearsToRetirement = retirementAge - currentAge;
  const inflatedMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflation / 100, yearsToRetirement);
  const retirementCorpus = inflatedMonthlyExpenses * 12 * yearsInRetirement;
  const monthlyRate = expectedReturn / 12 / 100;
  const months = yearsToRetirement * 12;
  const monthlySIP =
    retirementCorpus /
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <InputsPanel>
        <RangeField
          label="Current Age"
          valueText={`${currentAge} years`}
          min="20"
          max="55"
          value={currentAge}
          onChange={setCurrentAge}
        />
        <RangeField
          label="Retirement Age"
          valueText={`${retirementAge} years`}
          min={currentAge + 5}
          max="70"
          value={retirementAge}
          onChange={setRetirementAge}
        />
        <RangeField
          label="Years in Retirement"
          valueText={`${yearsInRetirement} years`}
          min="10"
          max="40"
          value={yearsInRetirement}
          onChange={setYearsInRetirement}
        />
        <RangeField
          label="Monthly Expenses (today)"
          valueText={formatCurrency(monthlyExpenses)}
          min="10000"
          max="500000"
          step="5000"
          value={monthlyExpenses}
          onChange={setMonthlyExpenses}
        />
        <RangeField
          label="Inflation"
          valueText={`${inflation}% p.a.`}
          min="2"
          max="10"
          step="0.5"
          value={inflation}
          onChange={setInflation}
        />
        <RangeField
          label="Expected Return"
          valueText={`${expectedReturn}% p.a.`}
          min="6"
          max="20"
          step="0.5"
          value={expectedReturn}
          onChange={setExpectedReturn}
        />
      </InputsPanel>

      <ResultsPanel>
        <div className="space-y-4">
          <ResultRow label="Years to Retirement" index={0}>
            <AnimatedValue value={yearsToRetirement} format={formatYears} className="font-semibold" />
          </ResultRow>
          <ResultRow label="Monthly expenses at retirement" index={1}>
            <AnimatedValue value={inflatedMonthlyExpenses} format={formatCurrency} className="font-semibold" />
          </ResultRow>
          <ResultRow label="Corpus Needed" index={2}>
            <AnimatedValue value={retirementCorpus} format={formatCurrency} className="font-semibold" />
          </ResultRow>
          <ResultRow label="Monthly SIP Required" index={3} final>
            <AnimatedValue value={monthlySIP} format={formatCurrency} className={FINAL_VALUE_CLASS} />
          </ResultRow>
        </div>
      </ResultsPanel>
    </div>
  );
};

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <InputsPanel>
        <RangeField
          label="Loan Amount"
          valueText={formatCurrency(loanAmount)}
          min="100000"
          max="50000000"
          step="100000"
          value={loanAmount}
          onChange={setLoanAmount}
        />
        <RangeField
          label="Loan Tenure"
          valueText={`${tenure} years`}
          min="1"
          max="30"
          value={tenure}
          onChange={setTenure}
        />
        <RangeField
          label="Interest Rate"
          valueText={`${interestRate}% p.a.`}
          min="5"
          max="20"
          step="0.1"
          value={interestRate}
          onChange={setInterestRate}
        />
      </InputsPanel>

      <ResultsPanel>
        <div className="space-y-4">
          <ResultRow label="Principal" index={0}>
            <AnimatedValue value={loanAmount} format={formatCurrency} className="font-semibold" />
          </ResultRow>
          <ResultRow label="Total Interest" index={1}>
            <AnimatedValue value={totalInterest} format={formatCurrency} className="font-semibold text-destructive" />
          </ResultRow>
          <ResultRow label="Monthly EMI" index={2} final>
            <AnimatedValue value={emi} format={formatCurrency} className={FINAL_VALUE_CLASS} />
          </ResultRow>
        </div>
        <BreakdownBar
          segments={[
            { label: "Principal", value: loanAmount, color: PURPLE },
            { label: "Total Interest", value: totalInterest, color: RED },
          ]}
        />
      </ResultsPanel>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

const CalculatorHero = ({ title, description }: { title: string; description: string }) => {
  const [ref, orbY] = useParallax(100);
  const words = title.split(" ");
  const lead = words.slice(0, -1).join(" ");
  const last = words[words.length - 1];

  return (
    <section ref={ref} className="relative overflow-hidden pt-12 pb-16 sm:pb-20">
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: orbY }} aria-hidden="true">
        <motion.div
          className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-primary/35 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-[-5rem] h-64 w-64 rounded-full bg-accent/20 blur-3xl"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.6, 0.35, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="grid-floor opacity-50" aria-hidden="true" />
      <FloatingCoins className="opacity-60" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-8"
        >
          <Magnetic strength={0.2}>
            <Link
              to="/calculators"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground hover:border-accent/40"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Calculators
            </Link>
          </Magnetic>
        </motion.div>

        <div className="max-w-3xl">
          <motion.span
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Free calculator
          </motion.span>
          <WordReveal as="h1" className="heading-xl mb-5 !leading-[1.08]" immediate delay={0.2} stagger={0.08}>
            {lead} <span className="text-shimmer-gold">{last}</span>
          </WordReveal>
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE_OUT }}
          >
            {description}
          </motion.p>
          <motion.div
            className="mt-6 h-px w-32 origin-left bg-gradient-to-r from-accent via-accent/60 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.9, ease: EASE_OUT }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

const CalculatorDetailPage = () => {
  const { type } = useParams<{ type: CalculatorType }>();
  const config = calculatorConfig[type as CalculatorType];

  useSEO({
    title: config ? config.title : "Calculator",
    description: config ? config.description : "Free financial calculators from NIFSEN.",
    canonicalPath: `/calculators/${type ?? ""}`,
  });

  if (!config) {
    return (
      <div className="section-container py-20 text-center">
        <WordReveal as="h1" className="heading-lg mb-4" immediate>
          Calculator not found
        </WordReveal>
        <Link to="/calculators" className="text-accent hover:underline">
          Back to Calculators
        </Link>
      </div>
    );
  }

  const renderCalculator = () => {
    switch (type) {
      case "sip":
        return <SIPCalculator />;
      case "compounding":
        return <CompoundingCalculator />;
      case "retirement":
        return <RetirementCalculator />;
      case "emi":
        return <EMICalculator />;
      default:
        return null;
    }
  };

  return (
    <>
      <CalculatorHero key={type} title={config.title} description={config.description} />

      <section className="pb-16">
        <div className="section-container">
          {renderCalculator()}

          {/* Disclaimer */}
          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-muted/30 border border-border/30 backdrop-blur-md">
              <span className="icon-orb flex-shrink-0 mt-0.5 rounded-full">
                <Info className="w-5 h-5 text-muted-foreground" />
              </span>
              <p className="text-sm text-muted-foreground">
                This calculator provides illustrative projections only and should not be considered as investment advice.
                Actual returns may vary based on market conditions. Please consult a financial advisor before making investment decisions.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default CalculatorDetailPage;
