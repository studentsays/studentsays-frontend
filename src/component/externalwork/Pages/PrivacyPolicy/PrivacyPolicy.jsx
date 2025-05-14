import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-lg shadow-lg mb-10">
        <h1 className="text-3xl font-bold text-white text-center">Privacy Policy</h1>
        <p className="text-blue-100 text-center mt-2">Last updated: 23 March,2025</p>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
          <p className="text-gray-700">Welcome to Student Says, a platform developed under Roy-Wiz Tech by Ayush Kumar Roy. Your privacy is essential to us, and this policy outlines how we collect, use, and protect your information.</p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">1. Introduction</h2>
          <p className="text-gray-600">Student Says is a unique initiative that allows students to search, rate, and review their schools, helping them voice their opinions and connect with their peers. Your privacy is essential to us, and this policy outlines how we collect, use, and protect your information.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">2. Information We Collect</h2>
          <div className="space-y-4 text-gray-600">
            <ul className="list-disc pl-8">
              <li>
                <strong className="text-gray-800">Personal Information:</strong> When you register or post a review, we may collect your name, email address, class, and school to authenticate users and maintain community standards.
              </li>
              <li>
                <strong className="text-gray-800">Usage Data:</strong> We collect data on how you use our platform, including pages viewed, interactions with advertisements, and search history.
              </li>
              <li>
                <strong className="text-gray-800">Device Information:</strong> We collect technical information about your device, IP address, browser type, and operating system for analytics and platform security.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">3. How We Use Your Information</h2>
          <div className="space-y-4 text-gray-600">
            <ul className="list-disc pl-8">
              <li>To provide, maintain, and improve our platform experience.</li>
              <li>To monitor and analyze usage for research and development purposes.</li>
              <li>To ensure compliance with our terms and policies.</li>
              <li>To communicate with you regarding updates, marketing opportunities, and partnerships.</li>
              <li>To personalize your experience and display relevant ads.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">4. Sharing of Information</h2>
          <div className="space-y-4 text-gray-600">
            <ul className="list-disc pl-8">
              <li>We do not sell your personal data to third parties.</li>
              <li>We may share your information with trusted third-party service providers for analytics, advertising, and platform enhancements.</li>
              <li>In case of legal obligations, we may disclose your information to comply with applicable laws and regulations.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">5. Your Choices and Rights</h2>
          <div className="space-y-4 text-gray-600">
            <ul className="list-disc pl-8">
              <li>You can edit or delete your profile information at any time.</li>
              <li>You may choose to opt out of receiving marketing communications.</li>
              <li>You can request the deletion of your data by contacting us at <a href="mailto:info.studentsays@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">info.studentsays@gmail.com</a>.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">6. Data Security</h2>
          <p className="text-gray-600">We implement industry-standard security measures to protect your data, but no method of online transmission is entirely secure. We encourage you to use the platform responsibly.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">7. Changes to This Privacy Policy</h2>
          <p className="text-gray-600">We may update this policy periodically. Any significant changes will be communicated through our platform or email notifications.</p>
        </section>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Student Says. All rights reserved.
        </p>
      </div>
    </div>
  );
}