
import logo from "@/assets/site/logo-construction.png";
import footerLogo from "@/assets/site/footer-logo-construction.png";
import manModel from "@/assets/site/man-model.png";
import slide2 from "@/assets/site/slide-2.jpg";
import rowBg from "@/assets/site/row-bg.jpg";
import safetyIcon from "@/assets/site/safety-icon.png";
import service1 from "@/assets/site/service-1.jpg";
import service2 from "@/assets/site/service-2.jpg";
import service3 from "@/assets/site/service-3.jpg";
import aboutCompany from "@/assets/site/about-company.jpg";
import s1 from "@/assets/site/s1.png";
import s2 from "@/assets/site/s2.png";
import s3 from "@/assets/site/s3.png";
import processImg from "@/assets/site/process.jpg";

import p1 from "@/assets/site/personal_gift-1-600x600.jpg";
import p2 from "@/assets/site/tick_tock-1-1-600x600.jpg";
import p3 from "@/assets/site/portfolio7-1-600x600.jpg";
import p4 from "@/assets/site/portfolio10-1-600x600.jpg";
import p5 from "@/assets/site/portfolio3-1-600x600.jpg";
import p6 from "@/assets/site/portfolio6-1-600x600.jpg";
import p7 from "@/assets/site/portfolio9-1-600x600.jpg";
import p8 from "@/assets/site/portfolio2-1-600x600.jpg";

import team1 from "@/assets/site/team1.jpg";
import team2 from "@/assets/site/team2.jpg";
import team3 from "@/assets/site/team3.jpg";

import logo1 from "@/assets/site/logo1.png";
import logo2 from "@/assets/site/logo-2.png";
import logo3 from "@/assets/site/logo-3.png";
import logo4 from "@/assets/site/logo-4.png";
import logo5 from "@/assets/site/logo-5.png";

export const img = {
  logo,
  footerLogo,
  manModel,
  slide2,
  rowBg,
  safetyIcon,
  aboutCompany,
  process: processImg,
};

export const PHONE = "+1 (818) 23 45 678";
export const VIDEO_ID = "FyS_zcvmUr4";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const NAV: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#process" },
  { label: "Blog", href: "#projects" },
  {
    label: "Pages",
    href: "#",
    children: [
      { label: "Shop", href: "/shop" },
      { label: "Cart", href: "#quote" },
      { label: "Wishlist", href: "#projects" },
      { label: "My account", href: "/my-account" },
      { label: "Submenu example", href: "#services" },
      {
        label: "Dropdown menu",
        href: "#",
        children: [
          { label: "Submenu 1", href: "#about" },
          { label: "Submenu 2", href: "#testimonials" },
        ],
      },
    ],
  },
  { label: "Contact", href: "#quote" },
];

export const FEATURES = [
  {
    title: "Building Engineering",
    text: "A Building Engineer is recognised as being expert in the use of technology for the design, construction, assessment and maintenance of the built environment.",
    image: service1,
  },
  {
    title: "Safety First",
    text: "Safety First explores the challenges at the heart of needlestick and sharps safety and highlights promising efforts to ensure patient and health care worker safety in hospitals.",
    image: service2,
  },
  {
    title: "Road Construction",
    text: "The construction of a new road whether from asphalt or concrete requires the production of an bonded pavement structure, beginning with a stable base.",
    image: service3,
  },
];

export const ABOUT_LIST = [
  "Excellent engineering",
  "Modern & up to date",
  "Grade #1 materials",
  "Structures with long life",
];

export const SERVICES = [
  {
    title: "Building",
    text: "A building, or edifice, is a structure with a roof and walls standing.",
    icon: s1,
  },
  {
    title: "Road Construction",
    text: "Road construction involves the use of asphalt, liquid asphalt, concrete, soil stabilization, rebar, paving and pavement recycling machines, and other road repair materials.",
    icon: s2,
  },
  {
    title: "Maintenance",
    text: "All are assigned responsibilities relate to the maintenance mode.",
    icon: s3,
  },
];

export const STEPS = [
  {
    n: "01",
    title: "Agency / Bidding",
    text: "Ensure design documents are reviewed and permitted",
  },
  {
    n: "02",
    title: "Construction",
    text: "Helps to coordinate furnishings and move-in process",
  },
  {
    n: "03",
    title: "Project Execution",
    text: "Client directs move in of equipment, operations & staff",
  },
];

export const PROJECTS = [
  {
    title: "Riverview Green Building",
    cats: "Building, Road Construction",
    image: p1,
  },
  {
    title: "The Langham Hotel",
    cats: "Building, Construction",
    image: p2,
  },
  {
    title: "Villa Rustica Renovation",
    cats: "Construction, Road Construction",
    image: p3,
  },
  {
    title: "Land Rustica Renovation",
    cats: "Building, Maintenance",
    image: p4,
  },
  {
    title: "Kitchen And Living Room",
    cats: "Architecture, Building",
    image: p5,
  },
  {
    title: "House Under The Palms",
    cats: "Construction, Road Construction",
    image: p6,
  },
  {
    title: "Green House",
    cats: "Construction, Road Construction",
    image: p7,
  },
  {
    title: "Inside renovation",
    cats: "Construction, Road Construction",
    image: p8,
  },
];

export const DEPARTMENTS = [
  "Business Departemant",
  "Personal Departemant",
  "Support Departemant",
  "Others",
];

export const TESTIMONIALS = [
  {
    quote:
      "\"Great Experience!! Michael has made the whole process easy from the planning stage to the final plant going in. Steve & his crew did a great job. I felt like Lavish Gardens really listened to what I wanted, gave me ideas, and helped me decide how to make my backyard a place to relax and enjoy the view.",
    name: "Richard Dowson",
    avatar: team1,
  },
  {
    quote:
      "“I just wanted to say thank you to all of you for being so fun to work with and being rock stars with the best attitudes EVER on this 16th floor build for SPS. It means a great deal to me that you all come to the table every week with smiles on your faces and ready to solve whatever issue.”",
    name: "Lisa Jordan",
    avatar: team2,
  },
  {
    quote:
      "\"Greiner has been a critical partner to us on the redevelopment of West End Center Office Park. The team of project managers, supervisors, and their support teams can't be rivaled by any other contractor I have worked with over the past 15 years.\"",
    name: "Michael Anderson",
    avatar: team3,
  },
];

export const CLIENT_LOGOS = [
  { src: logo4, w: 130, h: 80, alt: "Logo 4" },
  { src: logo5, w: 218, h: 70, alt: "Logo 5" },
  { src: logo3, w: 163, h: 79, alt: "Logo 3" },
  { src: logo1, w: 193, h: 80, alt: "Logo 1" },
  { src: logo2, w: 141, h: 80, alt: "Logo 2" },
];
