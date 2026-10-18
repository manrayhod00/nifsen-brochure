export interface Branch {
  id: "bellary" | "hyderabad" | "bidar" | "gangavathi" | "kolkata";
  city: string;
  isHeadOffice?: boolean;
  isRegionalOffice?: boolean;
  badge?: string;         // extra office label, e.g. "Research and Development Hub"
  addressLines: string[];
  pincode: string;
  state: string;
  mapEmbedUrl: string;
  phone?: string;         // raw, with +91 country code, no spaces (used in tel: links)
  phoneDisplay?: string;  // formatted for display
  manager?: {
    name: string;
    role?: string;        // defaults to "Branch Manager"
  };
}

const formatIndianPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(-10);
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
};

export const branches: Branch[] = [
  {
    id: "bellary",
    city: "Ballari",
    isHeadOffice: true,
    addressLines: [
      "Ground Floor, Kakateeya Residency Apartment,",
      "Old HDFC Bank Building, Kappagal Road,",
    ],
    pincode: "583101",
    state: "Karnataka",
    mapEmbedUrl: "https://www.google.com/maps?q=15.156939,76.932528&z=17&output=embed",
    phone: "+918088071633",
    phoneDisplay: formatIndianPhone("8088071633"),
    manager: { name: "Nandeesha", role: "Chief Marketing Officer" },
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    isRegionalOffice: true,
    addressLines: [
      "4th Floor, Sai Mithra Elantra,",
      "H.No. 2-22/3/401, DD Colony,",
      "Amberpet,",
    ],
    pincode: "500013",
    state: "Telangana",
    mapEmbedUrl: "https://www.google.com/maps?q=17.396262,78.512019&z=17&output=embed",
    phone: "+918123938585",
    phoneDisplay: formatIndianPhone("8123938585"),
    manager: { name: "Mr. S. Raghavendra Prasad" },
  },
  {
    id: "bidar",
    city: "Bidar",
    addressLines: [
      "1st Floor, Nandadeep Comhub,",
      "Above Amulya Medical, Madiwala Circle,",
      "KHB Nawadgeri,",
    ],
    pincode: "585401",
    state: "Karnataka",
    mapEmbedUrl: "https://www.google.com/maps?q=17.920013,77.514402&z=17&output=embed",
    phone: "+919189228691",
    phoneDisplay: formatIndianPhone("9189228691"),
    manager: { name: "Siddharth Verma" },
  },
  {
    id: "gangavathi",
    city: "Gangavathi",
    addressLines: [
      "Sree Complex, Shop No. 05,",
      "Venkateshwar Colony, Vaddarahatti,",
      "Gangavathi, Koppal District,",
    ],
    pincode: "583235",
    state: "Karnataka",
    mapEmbedUrl: "https://www.google.com/maps?q=Venkateshwar+Colony,+Vaddarahatti,+Gangavathi+583235&z=16&output=embed",
    phone: "+917892884747",
    phoneDisplay: formatIndianPhone("7892884747"),
    manager: { name: "Satish Baliza", role: "Chief Operational Officer" },
  },
  {
    // Placeholder workspace until the final Kolkata office address is confirmed
    id: "kolkata",
    city: "Kolkata",
    badge: "Research and Development Hub",
    addressLines: [
      "Ambuja Neotia EcoCentre, EM 4,",
      "Sector V, Salt Lake City,",
    ],
    pincode: "700091",
    state: "West Bengal",
    mapEmbedUrl: "https://www.google.com/maps?q=Ambuja+Neotia+EcoCentre,+Sector+V,+Salt+Lake,+Kolkata&z=16&output=embed",
    manager: { name: "Amitrajit Chattopadhya", role: "Chief Research Officer" },
  },
];

export const headOffice = branches.find((b) => b.isHeadOffice) ?? branches[0];

export const contact = {
  companyName: "NIFSEN Investment Services Limited",
  shortName: "NIFSEN",
  tagline: "Mutual Funds • Insurance • Wealth Management",
  phone: "+918088071633",
  phoneDisplay: "+91 8088071633",
  email: "support@nifseninvestmentservices.in",
  whatsappMessage: "Hello, I would like to know more about NIFSEN Investment Services Limited.",
  whatsappConsultMessage: "Hello, I would like to schedule a consultation.",
  openDematUrl: "https://mosl.co/MOSWEB/kc1PWeQYgr",
  arn: "XXXXXXXXX",
  // Corporate identifiers
  cin: "U66190KA2026PLC218664",
  isin: "INE2XK601013",
  isinActivationDate: "03 Jul 2026",
  faceValue: "₹10",
  rta: "Integrated Registry Management Services Private Limited",
} as const;

export const whatsappLink = (msg: string = contact.whatsappMessage) =>
  `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
