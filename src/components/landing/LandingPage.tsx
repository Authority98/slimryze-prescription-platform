import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight, CheckCircle2, Stethoscope, Shield, Clock, FileText, Star, Plus, Minus, PenLine } from 'lucide-react';
import { Navbar } from './Navbar';
import { PrescriptionMockup } from './PrescriptionMockup';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Particles as ReactParticles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export function LandingPage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Particles initialization
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "Secure & Compliant",
      description: "HIPAA-compliant platform ensuring the security of patient data and prescriptions"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Time-Saving",
      description: "Streamlined prescription process that saves valuable time for practitioners"
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      title: "Digital Records",
      description: "Maintain comprehensive digital records of all prescriptions and patient history"
    }
  ];

  const benefits = [
    "Easy-to-use digital prescription platform",
    "Secure patient data management",
    "Instant prescription generation",
    "Comprehensive patient history tracking",
    "Modern and intuitive interface",
    "Time-saving automated processes"
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Family Physician",
      content: "SlimRyze has transformed how I manage prescriptions. The digital platform saves me hours each week and reduces the risk of errors.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Pediatrician",
      content: "The interface is intuitive and the prescription process is streamlined. It's exactly what modern healthcare needs.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Internal Medicine",
      content: "Patient management has never been easier. The digital records and history tracking are invaluable features.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How secure is the platform?",
      answer: "Our platform is built with HIPAA compliance in mind, utilizing industry-standard encryption and security measures to protect all patient data and prescription information."
    },
    {
      question: "Can I access my prescription history?",
      answer: "Yes, you can access a comprehensive history of all prescriptions written through our platform, making it easy to track and manage patient care over time."
    },
    {
      question: "Is technical support available?",
      answer: "We provide 24/7 technical support to ensure you can always access and use the platform effectively. Our support team is trained to handle any issues promptly."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is simple! Click the 'Create Prescription' button, and you'll be guided through our intuitive setup process. No complex installation or training required."
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        {/* Particles background */}
        <ReactParticles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "#ffffff",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 150,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: ["#9333EA", "#2563EB"],
              },
              links: {
                color: "#9333EA",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              collisions: {
                enable: false,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 100,
              },
              opacity: {
                value: 0.5,
                animation: {
                  enable: true,
                  speed: 0.8,
                  minimumValue: 0.3,
                },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1.5, max: 3 },
              },
            },
            detectRetina: true,
            fullScreen: {
              enable: false,
              zIndex: -1,
            },
          }}
          className="absolute inset-0"
        />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-purple-600/20 bg-white text-purple-600 text-sm font-medium mb-4">
              <Stethoscope className="w-4 h-4 mr-2" />
              Modern E-Prescription Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Streamline Your Prescription Process
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              A secure and efficient platform for managing prescriptions digitally. Save time, reduce errors, and improve patient care.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => navigate('/prescription')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
              >
                <PenLine className="w-5 h-5 mr-2" />
                Create Prescription
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const featuresSection = document.querySelector('#features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-6 rounded-lg text-lg"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Powerful Features for Modern Healthcare
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to manage prescriptions efficiently and securely
            </p>
          </motion.div>
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="p-3 bg-purple-50 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6"
              >
                Why Choose Our Platform?
              </motion.h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-purple-600 mt-0.5" />
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl transform rotate-3" />
              <div className="relative bg-white p-8 rounded-3xl shadow-xl">
                <PrescriptionMockup />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              What Healthcare Professionals Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Trusted by doctors and medical practitioners
            </p>
          </motion.div>
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{testimonial.content}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about the platform
            </p>
          </motion.div>
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="rounded-lg border border-gray-200 bg-white"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="flex items-center justify-between w-full p-4 text-left"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <Minus className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Transform Your Practice?
          </h2>
          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/prescription')}
              className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <PenLine className="w-5 h-5" />
              Create Your First Prescription
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SlimRyze
              </div>
              <div className="text-sm text-gray-600 mt-1">
                The Modern E-Prescription Platform
              </div>
            </div>
            <div className="flex items-center gap-6 text-gray-600">
              <a href="/privacy" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-purple-600 transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-purple-600 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} SlimRyze Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 