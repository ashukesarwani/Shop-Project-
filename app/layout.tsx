// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "./components/JsonLd";

// ✅ Change these when you have your real domain & GSTIN
const SITE_URL = "https://shop-project-orcin-delta.vercel.app/";
const MAPS_LINK = "https://maps.app.goo.gl/JhYW42ZayHViGgLP8";

const SHOP_NAME = "Kesarwani General Store";
const SHOP_PHONE_1 = "+91 7668392051";
const SHOP_PHONE_2 = "+91 7380785853";
const SHOP_EMAIL = "satishchandrakesarwani94@gmail.com";

// ✅ Put your real GSTIN here
const GSTIN = "11223344";

// ✅ Business hours (edit if needed)
const BUSINESS_HOURS = ["Mon-Sat 09:00-21:30", "Sun 10:00-20:00"];

// ✅ Replace with your real Google Maps embed src (Share → Embed a map → copy src)
const MAPS_EMBED ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14408.09569479541!2d81.8333648!3d25.470876599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acb07d6253d87%3A0x7034be97a860df73!2sKesarwani%20general%20Store!5e0!3m2!1sen!2sin!4v1772480561023!5m2!1sen!2sin";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kesarwani General Store - Grocery Shop in Prayagraj",
    template: "%s | Kesarwani General Store",
  },
  description:
    "Buy daily grocery essentials from Kesarwani General Store, Prayagraj. Rice, dal, spices, oil, snacks & household items. Order easily via WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kesarwani General Store",
    description: "Daily grocery essentials at best prices in Prayagraj. Order via WhatsApp.",
    url: SITE_URL,
    siteName: "Kesarwani General Store",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ✅ Structured LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    name: SHOP_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/products/banner.jpg`,
    telephone: [SHOP_PHONE_1, SHOP_PHONE_2],
    email: SHOP_EMAIL,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Prayagraj",
      addressRegion: "Uttar Pradesh",
      postalCode: "211002",
      addressCountry: "IN",
    },
    // (Optional) Approx coordinates of Prayagraj. Replace with exact if you want.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.4358,
      longitude: 81.8463,
    },
    openingHours: BUSINESS_HOURS,
    sameAs: [MAPS_LINK],
  };

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <JsonLd data={localBusinessSchema} />

        {/* ✅ Professional Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <Link href="/" className="text-lg font-extrabold text-green-700">
              🛒 {SHOP_NAME}
            </Link>

            <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-gray-700">
              <Link className="hover:text-green-700" href="/">
                Home
              </Link>
              <a className="hover:text-green-700" href="/#categories">
                Categories
              </a>
              <a className="hover:text-green-700" href="/#products">
                Products
              </a>
              <a className="hover:text-green-700" href="/#blog">
                Blog
              </a>
              <Link className="hover:text-green-700" href="/about">
                About
              </Link>
              <Link className="hover:text-green-700" href="/contact">
                Contact
              </Link>
              <Link className="hover:text-green-700" href="/privacy-policy">
                Privacy
              </Link>
              <Link className="hover:text-green-700" href="/terms">
                Terms
              </Link>
            </nav>

            {/* Mobile quick links */}
            <div className="md:hidden flex gap-3 text-sm font-semibold">
              <a className="text-green-700" href="/#products">
                Shop
              </a>
              <Link className="text-green-700" href="/contact">
                Contact
              </Link>
            </div>
          </div>
        </header>

        <main>{children}</main>

        {/* ✅ Professional Footer (AdSense-friendly) */}
        <footer className="bg-gray-950 text-white mt-10">
          <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="text-lg font-extrabold">{SHOP_NAME}</div>
              <p className="text-sm text-white/75 mt-2">
                Daily grocery essentials at best prices in Prayagraj. Order easily via WhatsApp.
              </p>

              <div className="mt-4 text-sm text-white/80 space-y-1">
                <div>📞 {SHOP_PHONE_1}</div>
                <div>📞 {SHOP_PHONE_2}</div>
                <div>📧 {SHOP_EMAIL}</div>
                <div className="mt-2">
                  <span className="font-semibold text-white">GSTIN:</span>{" "}
                  <span className="text-white/80">{GSTIN}</span>
                </div>
              </div>

              <div className="mt-4">
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white text-gray-900 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
                >
                  📍 Open Shop Location
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="font-bold">Quick Links</div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
                <Link className="hover:underline" href="/about">
                  About
                </Link>
                <Link className="hover:underline" href="/contact">
                  Contact
                </Link>
                <a className="hover:underline" href="/#products">
                  Products
                </a>
                <a className="hover:underline" href="/#blog">
                  Blog
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <div className="font-bold">Legal</div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
                <Link className="hover:underline" href="/privacy-policy">
                  Privacy Policy
                </Link>
                <Link className="hover:underline" href="/terms">
                  Terms & Conditions
                </Link>
                <Link className="hover:underline" href="/refund">
                  Refund Policy
                </Link>
                <Link className="hover:underline" href="/shipping">
                  Shipping Policy
                </Link>
              </div>

              <div className="mt-6">
                <div className="font-bold">Business Hours</div>
                <ul className="mt-2 text-sm text-white/75 space-y-1">
                  {BUSINESS_HOURS.map((h) => (
                    <li key={h}>🕒 {h}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Map Embed */}
            <div>
              <div className="font-bold">Find Us</div>
              <div className="mt-3 rounded-xl overflow-hidden border border-white/10 bg-white">
                <iframe
                  src={MAPS_EMBED}
                  width="100%"
                  height="220"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                  aria-label="Google map location"
                />
              </div>
              <p className="mt-2 text-xs text-white/60">
                This map helps customers trust your business — helpful for AdSense review.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
            © {new Date().getFullYear()} {SHOP_NAME}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}