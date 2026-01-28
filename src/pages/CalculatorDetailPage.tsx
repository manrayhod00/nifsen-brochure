import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import GlassCard from "@/components/GlassCard";

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
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Monthly Investment: {formatCurrency(monthlyInvestment)}
          </label>
          <input
            type="range"
            min="500"
            max="100000"
            step="500"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Investment Period: {years} years
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Expected Return: {expectedReturn}% p.a.
          </label>
          <input
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      <GlassCard className="p-6" hover={false}>
        <h3 className="font-semibold mb-6">Results</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-border/30">
            <span className="text-muted-foreground">Total Invested</span>
            <span className="font-semibold">{formatCurrency(totalInvested)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border/30">
            <span className="text-muted-foreground">Est. Returns</span>
            <span className="font-semibold text-accent">{formatCurrency(earnings)}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-medium">Future Value</span>
            <span className="text-xl font-bold text-gradient-gold">{formatCurrency(futureValue)}</span>
          </div>
        </div>
      </GlassCard>
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
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Principal Amount: {formatCurrency(principal)}
          </label>
          <input
            type="range"
            min="10000"
            max="10000000"
            step="10000"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Time Period: {years} years
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Interest Rate: {rate}% p.a.
          </label>
          <input
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      <GlassCard className="p-6" hover={false}>
        <h3 className="font-semibold mb-6">Results</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-border/30">
            <span className="text-muted-foreground">Principal</span>
            <span className="font-semibold">{formatCurrency(principal)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border/30">
            <span className="text-muted-foreground">Interest Earned</span>
            <span className="font-semibold text-accent">{formatCurrency(earnings)}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-medium">Total Value</span>
            <span className="text-xl font-bold text-gradient-gold">{formatCurrency(futureValue)}</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflation, setInflation] = useState(6);

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = 25;
  const inflatedMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflation / 100, yearsToRetirement);
  const retirementCorpus = inflatedMonthlyExpenses * 12 * yearsInRetirement;
  const monthlyRate = expectedReturn / 12 / 100;
  const months = yearsToRetirement * 12;
  const monthlySIP =
    retirementCorpus /
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Current Age: {currentAge} years
          </label>
          <input
            type="range"
            min="20"
            max="55"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Retirement Age: {retirementAge} years
          </label>
          <input
            type="range"
            min={currentAge + 5}
            max="70"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Monthly Expenses: {formatCurrency(monthlyExpenses)}
          </label>
          <input
            type="range"
            min="10000"
            max="500000"
            step="5000"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Expected Return: {expectedReturn}% p.a.
          </label>
          <input
            type="range"
            min="6"
            max="20"
            step="0.5"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      <GlassCard className="p-6" hover={false}>
        <h3 className="font-semibold mb-6">Results</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-border/30">
            <span className="text-muted-foreground">Years to Retirement</span>
            <span className="font-semibold">{yearsToRetirement} years</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border/30">
            <span className="text-muted-foreground">Corpus Needed</span>
            <span className="font-semibold">{formatCurrency(retirementCorpus)}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-medium">Monthly SIP Required</span>
            <span className="text-xl font-bold text-gradient-gold">{formatCurrency(monthlySIP)}</span>
          </div>
        </div>
      </GlassCard>
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
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Loan Amount: {formatCurrency(loanAmount)}
          </label>
          <input
            type="range"
            min="100000"
            max="50000000"
            step="100000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Loan Tenure: {tenure} years
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Interest Rate: {interestRate}% p.a.
          </label>
          <input
            type="range"
            min="5"
            max="20"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      <GlassCard className="p-6" hover={false}>
        <h3 className="font-semibold mb-6">Results</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-border/30">
            <span className="text-muted-foreground">Principal</span>
            <span className="font-semibold">{formatCurrency(loanAmount)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border/30">
            <span className="text-muted-foreground">Total Interest</span>
            <span className="font-semibold text-destructive">{formatCurrency(totalInterest)}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-medium">Monthly EMI</span>
            <span className="text-xl font-bold text-gradient-gold">{formatCurrency(emi)}</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const CalculatorDetailPage = () => {
  const { type } = useParams<{ type: CalculatorType }>();
  const config = calculatorConfig[type as CalculatorType];

  if (!config) {
    return (
      <div className="section-container py-20 text-center">
        <h1 className="heading-lg mb-4">Calculator not found</h1>
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
      <section className="py-12">
        <div className="section-container">
          <Link
            to="/calculators"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calculators
          </Link>

          <div className="max-w-3xl animate-fade-up">
            <h1 className="heading-lg mb-4">{config.title}</h1>
            <p className="text-lg text-muted-foreground">{config.description}</p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="section-container">
          {renderCalculator()}

          {/* Disclaimer */}
          <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/30">
            <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              This calculator provides illustrative projections only and should not be considered as investment advice. 
              Actual returns may vary based on market conditions. Please consult a financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CalculatorDetailPage;
