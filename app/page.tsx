"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import jsPDF from "jspdf";

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string; // local path like "/products/rice.jpg"
};

type CartItem = Product & { qty: number };

export default function KesarwaniStore() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Basmati Rice",
      price: 80,
      unit: "kg",
      image: "/products/rice.jpg",
    },
    {
      id: 2,
      name: "Toor Dal",
      price: 120,
      unit: "kg",
      image: "/products/toor-dal.jpg",
    },
    {
      id: 3,
      name: "Sugar",
      price: 45,
      unit: "kg",
      image: "/products/sugar.jpg",
    },
  ]);

  const [search, setSearch] = useState("");
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
        i.id === id ? { ...i, qty: Math.max(0.5, i.qty + change) } : i
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const placeOrder = () => {
    const order = { items: cart, total, date: new Date().toISOString() };
    setOrders([...orders, order]);

    const message = cart
      .map((i) => `${i.name} - ${i.qty}${i.unit}`)
      .join("%0A");

    window.open(
      `https://wa.me/917668392051?text=Order:%0A${message}%0ATotal: ₹${total}`
    );

    setCart([]);
  };

  const downloadInvoice = (order: any) => {
    const pdf = new jsPDF();
    pdf.text("Kesarwani General Store Invoice", 20, 20);

    order.items.forEach((i: any, idx: number) => {
      pdf.text(`${i.name} ${i.qty}${i.unit} - ₹${i.qty * i.price}`, 20, 40 + idx * 10);
    });

    pdf.text(`Total: ₹${order.total}`, 20, 80);
    pdf.save("invoice.pdf");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-4 bg-green-700 text-white">
        <h1 className="text-xl font-bold">🛒 Kesarwani General Store</h1>

        <div className="flex gap-4 items-center">
          <a href="#products">Products</a>
          <a href="#about">About</a>

          <input
            className="p-1 rounded text-black"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link href="/login">
            <Button variant="secondary">Login</Button>
          </Link>

          <Link href="/register">
            <Button variant="secondary">Register</Button>
          </Link>
        </div>
      </nav>

      {/* PRODUCTS */}
      <div id="products" className="p-6 grid md:grid-cols-3 gap-4 flex-grow">
        {filteredProducts.map((p) => (
          <Card key={p.id}>
            <CardContent>
              <div className="relative w-full h-40 mb-2">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={p.id === 1}
                />
              </div>

              <h3 className="font-bold">{p.name}</h3>
              <p>
                ₹{p.price}/{p.unit}
              </p>

              <Button className="mt-2 w-full" onClick={() => addToCart(p)}>
                Add
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CART */}
      <div className="p-6 border-t">
        <h2 className="font-bold">Cart</h2>

        {cart.map((i) => (
          <div key={i.id} className="flex justify-between items-center mt-2">
            <span>{i.name}</span>

            <div className="flex gap-2 items-center">
              <Button size="icon" onClick={() => updateQty(i.id, -0.5)}>
                <Minus />
              </Button>

              {i.qty}

              <Button size="icon" onClick={() => updateQty(i.id, 0.5)}>
                <Plus />
              </Button>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => removeItem(i.id)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}

        <p className="mt-2 font-bold">Total: ₹{total}</p>
        <Button className="mt-3" onClick={placeOrder}>
          Order on WhatsApp
        </Button>
      </div>

      {/* ORDER HISTORY */}
      <div className="p-6">
        <h2 className="font-bold">Order History</h2>
        {orders.map((o, idx) => (
          <div key={idx} className="border p-2 mt-2">
            <p>Total: ₹{o.total}</p>
            <Button size="sm" onClick={() => downloadInvoice(o)}>
              Download Invoice
            </Button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer id="about" className="bg-gray-800 text-white p-6 mt-auto">
        <p className="text-center">
          © {new Date().getFullYear()} Kesarwani General Store
        </p>
        <br />
        <p className="text-center">📞 +917668392051 | +917380785853</p>
        <p className="text-center">📧 satishchandrakesarwani94@gmail.com</p>
      </footer>
    </div>
  );
}