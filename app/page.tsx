"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Plus,
  Minus,
  Search,
  ShoppingBag,
  FileText,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import jsPDF from "jspdf";

type Category =
  | "Rice & Grains"
  | "Dals & Pulses"
  | "Atta & Flour"
  | "Spices"
  | "Oil & Ghee"
  | "Tea & Coffee"
  | "Sugar & Salt"
  | "Snacks"
  | "Household";

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: Category;
  image: string;
};

type CartItem = Product & { qty: number };

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tag: string;
};

const WHATSAPP_NUMBER = "917668392051";
const MAPS_LINK = "https://maps.app.goo.gl/JhYW42ZayHViGgLP8";

export default function KesarwaniStore() {
  // ✅ AUTO SLIDER BANNERS (Amazon style)
  const banners = useMemo(
    () => [
      { id: 1, src: "/banners/banner-1.jpg", alt: "Banner 1" },
      { id: 2, src: "/banners/banner-2.jpg", alt: "Banner 2" },
      { id: 3, src: "/banners/banner-3.jpg", alt: "Banner 3" },
    ],
    []
  );

  const [bannerIndex, setBannerIndex] = useState(0);

  // Auto-slide every 3.5s
  useEffect(() => {
    const t = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearInterval(t);
  }, [banners.length]);

  const goPrev = () =>
    setBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
  const goNext = () => setBannerIndex((prev) => (prev + 1) % banners.length);

  // ✅ MORE PRODUCTS
  const [products] = useState<Product[]>([
    { id: 1, name: "Basmati Rice", price: 80, unit: "kg", category: "Rice & Grains", image: "/products/rice.jpg" },
    { id: 2, name: "Sona Masoori Rice", price: 65, unit: "kg", category: "Rice & Grains", image: "/products/sona-masoori.jpg" },
    { id: 3, name: "Wheat Flour (Atta)", price: 38, unit: "kg", category: "Atta & Flour", image: "/products/atta.jpg" },
    { id: 4, name: "Besan (Gram Flour)", price: 70, unit: "kg", category: "Atta & Flour", image: "/products/besan.jpg" },

    { id: 5, name: "Toor Dal", price: 120, unit: "kg", category: "Dals & Pulses", image: "/products/toor-dal.jpg" },
    { id: 6, name: "Moong Dal", price: 110, unit: "kg", category: "Dals & Pulses", image: "/products/moong-dal.jpg" },
    { id: 7, name: "Chana Dal", price: 95, unit: "kg", category: "Dals & Pulses", image: "/products/chana-dal.jpg" },
    { id: 8, name: "Rajma", price: 140, unit: "kg", category: "Dals & Pulses", image: "/products/rajma.jpg" },

    { id: 9, name: "Sugar", price: 45, unit: "kg", category: "Sugar & Salt", image: "/products/sugar.jpg" },
    { id: 10, name: "Iodized Salt", price: 22, unit: "kg", category: "Sugar & Salt", image: "/products/salt.jpg" },

    { id: 11, name: "Turmeric Powder", price: 35, unit: "100g", category: "Spices", image: "/products/turmeric.jpg" },
    { id: 12, name: "Red Chilli Powder", price: 45, unit: "100g", category: "Spices", image: "/products/chilli.jpg" },
    { id: 13, name: "Coriander Powder", price: 40, unit: "100g", category: "Spices", image: "/products/coriander.jpg" },
    { id: 14, name: "Garam Masala", price: 55, unit: "100g", category: "Spices", image: "/products/garam-masala.jpg" },

    { id: 15, name: "Mustard Oil", price: 165, unit: "L", category: "Oil & Ghee", image: "/products/mustard-oil.jpg" },
    { id: 16, name: "Refined Oil", price: 150, unit: "L", category: "Oil & Ghee", image: "/products/refined-oil.jpg" },
    { id: 17, name: "Desi Ghee", price: 650, unit: "kg", category: "Oil & Ghee", image: "/products/ghee.jpg" },

    { id: 18, name: "Tea (Masala)", price: 120, unit: "250g", category: "Tea & Coffee", image: "/products/tea.jpg" },
    { id: 19, name: "Instant Coffee", price: 160, unit: "100g", category: "Tea & Coffee", image: "/products/coffee.jpg" },

    { id: 20, name: "Namkeen Mix", price: 60, unit: "400g", category: "Snacks", image: "/products/namkeen.jpg" },
    { id: 21, name: "Biscuits Pack", price: 25, unit: "pack", category: "Snacks", image: "/products/biscuits.jpg" },

    { id: 22, name: "Detergent Powder", price: 95, unit: "kg", category: "Household", image: "/products/detergent.jpg" },
    { id: 23, name: "Dishwash Liquid", price: 75, unit: "500ml", category: "Household", image: "/products/dishwash.jpg" },
  ]);

  const [posts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Monthly Grocery Checklist (Family of 4)",
      slug: "monthly-grocery-checklist-family-of-4",
      date: "2026-03-02",
      excerpt: "Budget-friendly list for rice, dal, spices, oil and household essentials with quantity tips.",
      tag: "Grocery Tips",
    },
    {
      id: 2,
      title: "How to Choose Good Quality Rice",
      slug: "how-to-choose-good-quality-rice",
      date: "2026-03-01",
      excerpt: "Quick checks: grain length, aroma, broken ratio, and storage tips for longer freshness.",
      tag: "Buying Guide",
    },
    {
      id: 3,
      title: "Best Spices to Keep in Every Indian Kitchen",
      slug: "best-spices-to-keep",
      date: "2026-02-28",
      excerpt: "Turmeric, chilli, coriander and more—what to buy, how much, and how to store.",
      tag: "Kitchen",
    },
  ]);

  const categories: Category[] = useMemo(
    () => [
      "Rice & Grains",
      "Dals & Pulses",
      "Atta & Flour",
      "Spices",
      "Oil & Ghee",
      "Tea & Coffee",
      "Sugar & Salt",
      "Snacks",
      "Household",
    ],
    []
  );

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const addToCart = (p: Product) => {
    const found = cart.find((i) => i.id === p.id);
    if (found) {
      setCart(cart.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 0.5 } : i)));
    } else {
      setCart([...cart, { ...p, qty: 1 }]);
    }
  };

  const updateQty = (id: number, change: number) => {
    setCart(
      cart.map((i) =>
        i.id === id ? { ...i, qty: Math.max(0.5, Number((i.qty + change).toFixed(1))) } : i
      )
    );
  };

  const removeItem = (id: number) => setCart(cart.filter((i) => i.id !== id));
  const total = useMemo(() => cart.reduce((s, i) => s + i.qty * i.price, 0), [cart]);

  const placeOrder = () => {
    if (cart.length === 0) return;

    const order = { items: cart, total, date: new Date().toISOString() };
    setOrders([...orders, order]);

    const message = cart
      .map((i) => `${i.name} - ${i.qty}${i.unit} (₹${i.qty * i.price})`)
      .join("%0A");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Order:%0A${message}%0ATotal: ₹${total}`);
    setCart([]);
  };

  const downloadInvoice = (order: any) => {
    const pdf = new jsPDF();
    pdf.text("Kesarwani General Store Invoice", 20, 20);
    pdf.text(`Date: ${new Date(order.date).toLocaleString()}`, 20, 30);

    order.items.forEach((i: any, idx: number) => {
      pdf.text(`${idx + 1}. ${i.name} ${i.qty}${i.unit} - ₹${i.qty * i.price}`, 20, 45 + idx * 8);
    });

    pdf.text(`Total: ₹${order.total}`, 20, 45 + order.items.length * 8 + 10);
    pdf.save("invoice.pdf");
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => (activeCategory === "All" ? true : p.category === activeCategory))
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [products, activeCategory, search]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      

      {/* HOMEPAGE HERO */}
      <section id="home" className="p-6 md:p-10 bg-white border-b">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Daily grocery essentials — order easily on WhatsApp
            </h1>
            <p className="mt-3 text-gray-600">
              Choose products, add to cart, and send order on WhatsApp. Invoice PDF also available.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>
                <ShoppingBag className="mr-2" size={18} />
                Shop Products
              </Button>

              <Button
                variant="secondary"
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Kesarwani%20General%20Store!`)}
              >
                WhatsApp Now
              </Button>
            </div>
          </div>

          <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden border">
            <Image
              src="/products/banner.jpg"
              alt="Kesarwani General Store"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* ✅ AMAZON-STYLE MIDDLE SLIDER BANNER (AUTO) */}
      <section className="bg-gray-50 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative w-full h-[220px] md:h-[320px] rounded-2xl overflow-hidden border bg-white">
            {/* Slides */}
            <div
              className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
            >
              {banners.map((b) => (
                <div key={b.id} className="relative min-w-full h-full">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority={b.id === 1}
                  />
                </div>
              ))}
            </div>

            {/* Left/Right controls */}
            <button
              aria-label="Previous banner"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow"
            >
              <ChevronLeft />
            </button>
            <button
              aria-label="Next banner"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow"
            >
              <ChevronRight />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to banner ${idx + 1}`}
                  onClick={() => setBannerIndex(idx)}
                  className={`h-2.5 w-2.5 rounded-full ${idx === bannerIndex ? "bg-gray-900" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT: SIDEBAR + CONTENT */}
      <main className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-6 p-6">
        {/* SIDEBAR */}
        <aside className="w-full md:w-1/3 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">Shop by Category</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCategory === "All" ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setActiveCategory("All")}
                >
                  All
                </Button>
                {categories.map((c) => (
                  <Button
                    key={c}
                    variant={activeCategory === c ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setActiveCategory(c)}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">Latest Blog Posts</h3>
              <div className="space-y-3">
                {posts.slice(0, 3).map((p) => (
                  <div key={p.id} className="text-sm">
                    <div className="text-gray-500">{new Date(p.date).toDateString()}</div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-gray-600">{p.excerpt}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <FileText className="mr-2" size={18} />
                  Read Blog
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">Contact</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex gap-2 items-center"><Phone size={16} /> +91 7668392051</div>
                <div className="flex gap-2 items-center"><Phone size={16} /> +91 7380785853</div>
                <div className="flex gap-2 items-center"><Mail size={16} /> satishchandrakesarwani94@gmail.com</div>
                <a
                  className="flex gap-2 items-center text-green-700 font-semibold hover:underline"
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={16} /> View Shop Location
                </a>
              </div>

              <div className="mt-3">
                <Button
                  className="w-full"
                  onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20I%20want%20to%20order%20grocery.`)}
                >
                  WhatsApp Order Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* CONTENT */}
        <section className="w-full md:w-2/3 space-y-8">
          {/* CATEGORIES */}
          <section id="categories">
            <h2 className="text-2xl font-extrabold">Categories</h2>
            <p className="text-gray-600 mt-1">Quickly filter products by category.</p>

            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setActiveCategory(c);
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-left p-4 rounded-xl bg-white border hover:shadow-sm transition"
                >
                  <div className="font-bold">{c}</div>
                  <div className="text-sm text-gray-600">View items →</div>
                </button>
              ))}
            </div>
          </section>

          {/* PRODUCTS */}
          <section id="products">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-2xl font-extrabold">Products</h2>
                <p className="text-gray-600 mt-1">
                  Showing <span className="font-semibold">{activeCategory === "All" ? "All" : activeCategory}</span>
                </p>
              </div>

              <Button variant="secondary" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
                Reset Filters
              </Button>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <Card key={p.id} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="relative w-full h-36 mb-2 rounded overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={p.id === 1}
                      />
                    </div>

                    <div className="text-xs text-gray-500">{p.category}</div>
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-sm text-gray-700">₹{p.price}/{p.unit}</p>

                    <Button className="mt-2 w-full" onClick={() => addToCart(p)}>
                      Add
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="mt-4 p-4 bg-white border rounded text-gray-700">
                No products found. Try changing category or search.
              </div>
            )}
          </section>

          {/* BLOG */}
          <section id="blog">
            <h2 className="text-2xl font-extrabold">Blog Posts</h2>
            <p className="text-gray-600 mt-1">Helpful grocery tips to improve approval and user value.</p>

            <div className="mt-4 grid gap-3">
              {posts.map((p) => (
                <div key={p.id} className="p-4 bg-white border rounded-xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span>{new Date(p.date).toDateString()}</span>
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">{p.tag}</span>
                  </div>
                  <div className="mt-1 font-bold text-lg">{p.title}</div>
                  <div className="text-gray-600">{p.excerpt}</div>

                  <div className="mt-3">
                    <Button variant="secondary" size="sm" onClick={() => alert("Create /blog/[slug] route to open full post.")}>
                      Read More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CART */}
          <section className="bg-white border rounded-xl p-5">
            <h2 className="text-xl font-extrabold">Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-600 mt-2">Your cart is empty. Add some products.</p>
            ) : (
              <>
                <div className="mt-3 space-y-2">
                  {cart.map((i) => (
                    <div key={i.id} className="flex justify-between items-center gap-3">
                      <div>
                        <div className="font-semibold">{i.name}</div>
                        <div className="text-sm text-gray-600">₹{i.price}/{i.unit}</div>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Button size="icon" variant="secondary" onClick={() => updateQty(i.id, -0.5)}>
                          <Minus />
                        </Button>

                        <span className="min-w-10 text-center font-semibold">{i.qty}</span>

                        <Button size="icon" variant="secondary" onClick={() => updateQty(i.id, 0.5)}>
                          <Plus />
                        </Button>

                        <Button size="icon" variant="destructive" onClick={() => removeItem(i.id)}>
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-extrabold text-lg">Total: ₹{total}</p>
                  <Button onClick={placeOrder}>Order on WhatsApp</Button>
                </div>
              </>
            )}
          </section>

          {/* ORDER HISTORY */}
          <section className="bg-white border rounded-xl p-5">
            <h2 className="text-xl font-extrabold">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600 mt-2">No orders yet.</p>
            ) : (
              <div className="mt-3 grid gap-3">
                {orders.map((o, idx) => (
                  <div key={idx} className="border rounded p-3">
                    <div className="text-sm text-gray-600">{new Date(o.date).toLocaleString()}</div>
                    <div className="font-bold">Total: ₹{o.total}</div>
                    <Button size="sm" className="mt-2" onClick={() => downloadInvoice(o)}>
                      Download Invoice
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>

    </div>
  );
}