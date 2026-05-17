// import type { Metadata } from "next";
// import { Press_Start_2P } from "next/font/google";
// import "./globals.css";
// import "nes.css/css/nes.min.css";

// const pressStart2P = Press_Start_2P({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-press-start",
// });

// export const metadata: Metadata = {
//   title: "SprintSync AI - Retro Meeting Assistant",
//   description: "Transform engineering meetings into actionable tasks with AI",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${pressStart2P.variable} h-full`}
//     >
//       <body className="min-h-full flex flex-col" style={{ fontFamily: 'Press Start 2P, cursive' }}>{children}</body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "SprintSync AI — Meeting Intelligence",
  description: "Transform engineering meetings into actionable tasks with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}