import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-lg shadow-lg mb-10">
        <h1 className="text-3xl font-bold text-white text-center">Terms & Conditions</h1>
        <p className="text-blue-100 text-center mt-2">Last updated: 23 March,2025</p>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
          <p className="text-gray-700">Please read these terms and conditions carefully before using Our Service.</p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600">By accessing Student Says, you agree to these Terms & Conditions. If you disagree with any part, please refrain from using our platform.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">2. User Conduct</h2>
          <div className="space-y-4 text-gray-600">
            <ul className="list-disc pl-8">
              <li>You must be respectful, truthful, and considerate in your reviews.</li>
              <li>Misuse of the platform for spamming, fake reviews, or offensive content is strictly prohibited.</li>
              <li>Any content you post must not violate the rights of others or infringe on intellectual property.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">3. Reviews and Content</h2>
          <div className="space-y-4 text-gray-600">
            <ul className="list-disc pl-8">
              <li>Reviews reflect personal opinions and may not represent the views of Student Says or Roy-Wiz Tech.</li>
              <li>We reserve the right to modify, remove, or moderate any content that violates our guidelines.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">4. Advertising and Opportunities</h2>
          <div className="space-y-4 text-gray-600">
            <ul className="list-disc pl-8">
              <li>Advertisements help us maintain and expand our platform.</li>
              <li>We do not explicitly endorse any product or service advertised on the platform.</li>
              <li>Any opportunities posted are subject to user verification and discretion.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">5. Intellectual Property</h2>
          <p className="text-gray-600">All content on Student Says, including logos, graphics, and text, is owned by Ayush Kumar Roy, the founder of Student Says. Unauthorized use or reproduction is strictly prohibited.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-600">We are not liable for any damages resulting from the use of the platform, including misinformation, miscommunication, or disputes arising from user interactions.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">7. Changes to Terms & Conditions</h2>
          <p className="text-gray-600">We may revise these terms at any time. Continued use of the platform implies acceptance of any changes.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Contact Us</h2>
          <div className="space-y-4 text-gray-600">
            <p>For any questions or concerns, reach out to our support team at <a href="mailto:info.studentsays@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">info.studentsays@gmail.com</a>.</p>
          </div>
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