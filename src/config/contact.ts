export const contact = {
  companyName: "NIFSEN Investment Services Limited",
  shortName: "NIFSEN",
  tagline: "Mutual Funds • Insurance • Wealth Management",
  phone: "+918088071633",
  phoneDisplay: "+91 8088071633",
  email: "support@nifseninvestmentservices.in",
  whatsappMessage: "Hello, I would like to know more about NIFSEN Investment Services Limited.",
  whatsappConsultMessage: "Hello, I would like to schedule a consultation.",
  address: {
    line1: "Ground Floor, Kakateeya Residency Apartment,",
    line2: "Old HDFC Bank Building, Kappagal Road,",
    line3: "Ballari - 583101",
  },
  mapEmbedUrl: "https://www.google.com/maps?q=15.156939,76.932528&z=17&output=embed",
  openDematUrl: "https://mosl.co/MOSWEB/kc1PWeQYgr",
  arn: "253725",
} as const;

export const whatsappLink = (msg: string = contact.whatsappMessage) =>
  `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
