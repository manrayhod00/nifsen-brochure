export interface Branch {
  id: "bellary" | "bidar" | "gangavathi";
  city: string;
  isHeadOffice?: boolean;
  addressLines: string[];
  pincode: string;
  state: string;
  mapEmbedUrl: string;
}

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
  },
  {
    id: "gangavathi",
    city: "Gangavathi",
    addressLines: [
      "Motilal Oswal Shop 1, Ward 5,",
      "CBS Complex, Bus Stand Road,",
      "Koppal District,",
    ],
    pincode: "583227",
    state: "Karnataka",
    mapEmbedUrl: "https://www.google.com/maps?q=15.432166,76.530835&z=17&output=embed",
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
  arn: "253725",
} as const;

export const whatsappLink = (msg: string = contact.whatsappMessage) =>
  `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
