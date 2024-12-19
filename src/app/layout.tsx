import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Roboto, Urbanist } from "next/font/google";

// Configuração da fonte Roboto
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
});

export const metadata = {
  title: "Agro m2",
  description: "Seu gerenciamento é aqui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className={`${roboto.variable} ${urbanist.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
