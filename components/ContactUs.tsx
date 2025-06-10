"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiPhone,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';
import { BsBuildings } from 'react-icons/bs';
import axios from 'axios';

// Validation schema
const validationSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  company: z
    .string()
    .max(100, 'Company name must not exceed 100 characters')
    .optional(),
  phone: z
    .string()
    .regex(/^[\+]?[0-9\(\)\-\s]*$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must not exceed 20 characters'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must not exceed 100 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
});

type FormData = z.infer<typeof validationSchema>;

const ContactForm = () => {
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  // Watch message field for character count
  const messageValue = watch('message') || '';

  const onSubmit = async (data: FormData) => {
    setSubmitStatus(null);

    try {
      await axios.post<ApiResponse>('/api/contact', data);
      setSubmitStatus("success")
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We&lsquo;d love to hear from you. Send us a message and we&lsquo;ll respond as soon as possible.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`w-full pl-12 pr-4 py-4 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.name ? 'border-red-300' : 'border-gray-200'
                      }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full pl-12 pr-4 py-4 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.email ? 'border-red-300' : 'border-gray-200'
                      }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Company and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <div className="relative">
                  <BsBuildings className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="company"
                    {...register('company')}
                    className={`w-full pl-12 pr-4 py-4 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.company ? 'border-red-300' : 'border-gray-200'
                      }`}
                    placeholder="Enter your company name"
                  />
                </div>
                {errors.company && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.company.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`w-full pl-12 pr-4 py-4 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.phone ? 'border-red-300' : 'border-gray-200'
                      }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="relative">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="subject"
                  {...register('subject')}
                  className={`w-full pl-12 pr-4 py-4 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.subject ? 'border-red-300' : 'border-gray-200'
                    }`}
                  placeholder="What's this about?"
                />
              </div>
              {errors.subject && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <span className="text-sm text-gray-500">
                  {messageValue.length}/1000
                </span>
              </div>
              <textarea
                id="message"
                {...register('message')}
                rows={6}
                className={`w-full px-4 py-4 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none ${errors.message ? 'border-red-300' : 'border-gray-200'
                  }`}
                placeholder="Tell us more about your inquiry..."
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Status Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center bg-green-50 border border-green-200 rounded-xl p-4 text-green-800">
                <FiCheck className="mr-3 text-green-600" />
                <span>Thank you! Your message has been sent successfully. We&lsquo;ll get back to you soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center bg-red-50 border border-red-200 rounded-xl p-4 text-red-800">
                <FiAlertCircle className="mr-3 text-red-600" />
                <span>Oops! Something went wrong. Please try again later.</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center min-w-[200px] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-16 grid grid-cols-1 gap-8 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-white text-xl" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600">info@gigasend.us</p>
          </div>

          {/* <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
            <div className="bg-green-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiPhone className="text-white text-xl" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div> */}

          {/* <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
            <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiMessageSquare className="text-white text-xl" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600">Available 24/7</p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;