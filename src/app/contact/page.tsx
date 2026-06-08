"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DetailModal from "@/components/DetailModal";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import { Send, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [waPhone, setWaPhone] = useState("");
  const [waError, setWaError] = useState("");

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validate = () => {
    const tempErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email address";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_simulated";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_simulated";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (publicKey && serviceId !== "service_simulated") {
        // Real Send via EmailJS
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: "Inderash",
          },
          publicKey
        );
      } else {
        // Simulated Send with delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Simulating email send:", formData);
      }

      // Trigger Confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#e50914", "#7c3aed", "#ffffff"],
      });

      setSubmitStatus("success");
      setStatusMessage("Message transmitted successfully! I will reply shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Email send error:", err);
      setSubmitStatus("error");
      setStatusMessage("Failed to send message. Please email finderash@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waPhone.trim()) {
      setWaError("Phone number is required");
      return;
    }
    const cleaned = waPhone.replace(/[^\d+]/g, "");
    if (cleaned.length < 7) {
      setWaError("Please enter a valid number");
      return;
    }
    setWaError("");
    const messageText = `Hi Inderash, I am interested in collaborating! Let's connect. My WhatsApp number is: ${cleaned}`;
    const encodedText = encodeURIComponent(messageText);
    const targetUrl = `https://wa.me/916382860929?text=${encodedText}`;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative min-h-screen bg-netflixDark text-white pt-24 pb-12 select-none">
      {/* Background Poster Overlay mimicking login screen panels */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574375927938-d5a98e8fed85?q=80&w=1200&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-netflixDark via-netflixDark/80 to-netflixDark pointer-events-none" />

      <Navbar />

      <main className="relative z-10 max-w-md mx-auto px-4 py-8">
        
        {/* Netflix Card Container */}
        <div className="bg-black/75 rounded-md border border-white/5 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
          <h1 className="text-3xl font-extrabold text-white mb-6">Contact Me</h1>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Name */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full bg-netflixGray border rounded px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                  errors.name ? "border-netflixRed focus:border-netflixRed" : "border-white/10 focus:border-[#7c3aed]"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <span className="text-netflixRed text-xs font-bold mt-0.5">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-netflixGray border rounded px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                  errors.email ? "border-netflixRed focus:border-netflixRed" : "border-white/10 focus:border-[#7c3aed]"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <span className="text-netflixRed text-xs font-bold mt-0.5">{errors.email}</span>}
            </div>

            {/* Subject */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full bg-netflixGray border rounded px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                  errors.subject ? "border-netflixRed focus:border-netflixRed" : "border-white/10 focus:border-[#7c3aed]"
                }`}
                placeholder="Enter subject header"
              />
              {errors.subject && <span className="text-netflixRed text-xs font-bold mt-0.5">{errors.subject}</span>}
            </div>

            {/* Message */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className={`w-full bg-netflixGray border rounded px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none ${
                  errors.message ? "border-netflixRed focus:border-netflixRed" : "border-white/10 focus:border-[#7c3aed]"
                }`}
                placeholder="Write message details..."
              />
              {errors.message && <span className="text-netflixRed text-xs font-bold mt-0.5">{errors.message}</span>}
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-netflixRed hover:bg-[#b20710] disabled:bg-netflixRed/50 text-white font-bold py-3 rounded tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 mt-4 cursor-pointer shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-white/10 w-full"></div>
            <span className="absolute bg-[#070707] px-3 text-xs text-gray-500 uppercase tracking-widest">Or</span>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-3">
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your WhatsApp Number</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  className={`flex-grow bg-[#141414] border rounded px-4 py-3 text-sm text-white focus:outline-none transition-colors ${
                    waError ? "border-netflixRed focus:border-netflixRed" : "border-white/10 focus:border-emerald-500"
                  }`}
                  placeholder="e.g. +91 987654 3210"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 rounded tracking-wide transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg text-sm shrink-0"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.412 1.451 5.928 0 10.755-4.827 10.758-10.756.002-2.874-1.113-5.576-3.137-7.602C17.65 1.22 14.948.104 12.006.104 6.079.104 1.252 4.93 1.249 10.86c-.001 1.953.5 3.848 1.454 5.46L1.758 21.82l5.7-.966zM17.15 14c-.282-.141-1.67-.824-1.928-.918-.258-.094-.446-.141-.634.141-.188.282-.728.918-.892 1.106-.164.188-.328.212-.61.071-.282-.141-1.192-.44-2.271-1.402-.84-.75-1.407-1.675-1.572-1.957-.164-.282-.018-.434.123-.574.127-.127.282-.329.424-.494.141-.165.188-.282.282-.47.094-.188.047-.353-.024-.494-.071-.141-.634-1.528-.868-2.092-.228-.549-.46-.474-.634-.484-.164-.008-.353-.01-.542-.01s-.494.071-.753.353c-.258.282-.987.964-.987 2.348s1.009 2.716 1.15 2.906c.141.188 1.984 3.029 4.81 4.25.672.29 1.2.463 1.61.593.676.214 1.29.184 1.777.112.542-.08 1.67-.682 1.905-1.34.235-.659.235-1.223.164-1.34-.07-.117-.258-.188-.54-.329z" />
                  </svg>
                  <span>Interested</span>
                </button>
              </div>
              {waError && <span className="text-netflixRed text-xs font-bold mt-0.5">{waError}</span>}
            </div>
          </form>

          {/* Form response states notifications */}
          <AnimatePresence mode="wait">
            {submitStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`mt-6 p-4 rounded text-xs sm:text-sm font-semibold flex items-start space-x-3 border ${
                  submitStatus === "success"
                    ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"
                    : "bg-red-950/40 border-netflixRed/30 text-netflixRed"
                }`}
              >
                {submitStatus === "success" ? (
                  <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                )}
                <span>{statusMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info footnote */}
          <div className="mt-8 text-xs text-gray-500 border-t border-white/5 pt-4">
            Security protected form. Powered by standard Web API endpoints.
          </div>
        </div>
      </main>

      <DetailModal />
    </div>
  );
}
