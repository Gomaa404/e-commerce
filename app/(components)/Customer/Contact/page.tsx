"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-8">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center rounded">
            S
          </span>
          <span className="text-2xl font-semibold">Contact Us</span>
        </div>

        {/* Contact Info */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-black">Get in Touch</h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Have questions or need assistance? Fill out the form below, or reach
            us directly through email or phone. We’ll get back to you as soon as
            possible.
          </p>

          <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
            <li>
              <strong>Address:</strong> 123 Shop Street, October City, DC 12345
            </li>
            <li>
              <strong>Phone:</strong> (+20) 01093333333
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@shopmart.com"
                className="text-black font-semibold hover:underline"
              >
                support@shopmart.com
              </a>
            </li>
          </ul>
        </section>

        {/* Contact Form */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              Send Message
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
