import React from "react";
import { FaCalendarAlt, FaTrophy, FaBriefcase, FaVideo, FaPiggyBank, FaBrain, FaNewspaper, FaUserFriends } from "react-icons/fa";

export default function StudentSaysTimes() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Newsletter Header */}
        <div className="bg-white rounded-t-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-8 px-8">
            <div className="flex flex-col items-center justify-center text-white">
              <span className="bg-white text-orange-600 font-bold py-1 px-4 rounded-full text-sm mb-4">EDITION #1</span>
              <h1 className="text-4xl font-bold text-center mb-2">Student Says Times</h1>
              <p className="text-lg font-medium opacity-90">Your Ultimate Student Newsletter</p>
            </div>
          </div>
          
          <div className="p-8 border-b border-gray-100">
            <p className="text-lg text-gray-700 text-center">
              Welcome to the inaugural edition of Student Says Times! 🎉 Your one-stop source for scholarships, competitions, internships, events, and career opportunities tailored for Indian students. Stay informed and make the most of your academic journey. 💡
            </p>
          </div>
        </div>
        
        {/* Newsletter Content */}
        <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden p-8">
          <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-orange-500">
            <span className="bg-orange-100 text-orange-600 p-2 rounded-lg mr-3">🔥</span>
            Featured Opportunities
          </h2>
          
          {/* Featured Opportunities Section */}
          <div className="mb-8">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-800">ISRO's Young Scientist Programme (YUVIKA) 2025</h4>
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Apr 10, 2025</span>
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Objective:</span>
                    <span>To impart basic knowledge of space technologies to young students and foster interest in space science.</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Eligibility:</span>
                    <span>Students in India, with a preference for those from rural backgrounds.</span>
                  </div>
                </div>
                <div className="mt-3">
                  <a href="https://www.isro.gov.in/YUVIKA.html" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Learn More
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-800">Techkriti 2025 – IIT Kanpur's Annual Technical and Entrepreneurial Festival</h4>
                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Mar 27–31, 2025</span>
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Location:</span>
                    <span>IIT Kanpur, India</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Highlights:</span>
                    <span>Workshops, competitions, talks by renowned professionals, and exhibitions.</span>
                  </div>
                </div>
                <div className="mt-3">
                  <a href="https://techkriti.org/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Learn More
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-800">Cognizance 2025 – IIT Roorkee's Annual Technical Festival</h4>
                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Mar 21–23, 2025</span>
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Location:</span>
                    <span>IIT Roorkee, India</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Highlights:</span>
                    <span>Over 200 events, including technical competitions, workshops, exhibitions, guest lectures, and cultural performances.</span>
                  </div>
                </div>
                <div className="mt-3">
                  <a href="https://www.cognizance.org.in/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Competitions Section */}
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
              <FaTrophy className="text-orange-500 mr-2" />
              Upcoming Competitions
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-800">National Science Olympiad (NSO) 2025</h4>
                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Aug 31, 2025</span>
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Objective:</span>
                    <span>Encourages students to develop scientific reasoning and analytical skills.</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Eligibility:</span>
                    <span>Students from classes 1 to 12.</span>
                  </div>
                </div>
                <div className="mt-3">
                  <a href="https://www.sofworld.org/nso" className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
                    Learn More
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-800">CBSE Science Exhibition 2025</h4>
                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Sep 15, 2025</span>
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Objective:</span>
                    <span>Promotes innovative scientific ideas and projects among school students.</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Eligibility:</span>
                    <span>Students from CBSE-affiliated schools.</span>
                  </div>
                </div>
                <div className="mt-3">
                  <a href="http://cbseacademic.nic.in/science_exhibition.html" className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Internship Spotlight */}
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
              <FaBriefcase className="text-orange-500 mr-2" />
              Internship Spotlight
            </h3>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-800">NITI Aayog Internship Scheme 2025</h4>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Apr 1–10, 2025</span>
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Stipend:</span>
                  <span>Unpaid; however, provides valuable experience in public policy and governance.</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Eligibility:</span>
                  <span>Students pursuing undergraduate or postgraduate degrees.</span>
                </div>
              </div>
              <div className="mt-3">
                <a href="https://niti.gov.in/internship" className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          
          {/* Webinar */}
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
              <FaVideo className="text-orange-500 mr-2" />
              Must-Attend Webinar
            </h3>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-800">Automate Preview Series: Digital Transformation & The Future of Industrial Production</h4>
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">Mar 27, 2025</span>
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Time:</span>
                  <span>11:00 AM - 12:00 PM ET</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Description:</span>
                  <span>This webinar will examine how digital technologies, such as cloud computing, simulation, data analytics, and Generative AI are reshaping manufacturing and production processes.</span>
                </div>
              </div>
              <div className="mt-3">
                <a href="https://www.automate.org/ai/webinars/upcoming-webinars" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                  Register Now
                </a>
              </div>
            </div>
          </div>
          
          {/* Scholarship Alert */}
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
              <FaPiggyBank className="text-orange-500 mr-2" />
              Scholarship Alert
            </h3>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-800">Inspire Scholarship for Higher Education (SHE) 2025</h4>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Oct 31, 2025</span>
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Amount:</span>
                  <span>₹80,000 per annum</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Eligibility:</span>
                  <span>Top 1% students in 12th standard or those who have secured ranks in specified competitive exams.</span>
                </div>
              </div>
              <div className="mt-3">
                <a href="http://www.inspire-dst.gov.in/scholarship.html" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Tips Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Money Tip */}
            <div className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <FaPiggyBank className="text-orange-500 mr-2" />
                Money Tip of the Week
              </h3>
              <h4 className="font-bold text-gray-700">Start Early with Mutual Funds</h4>
              <p className="mt-2 text-gray-600 text-sm">Investing ₹500/month in a mutual fund from age 16 could grow to over ₹25,00,000 by age 30, thanks to compound interest. Start early to maximize your returns.</p>
            </div>
            
            {/* Study Hack */}
            <div className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <FaBrain className="text-orange-500 mr-2" />
                Study Hack
              </h3>
              <h4 className="font-bold text-gray-700">The Pomodoro Technique</h4>
              <p className="mt-2 text-gray-600 text-sm">Study for 25 minutes, then take a 5-minute break. This method enhances focus and improves information retention.</p>
            </div>
          </div>
          
          {/* Trending News */}
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
              <FaNewspaper className="text-orange-500 mr-2" />
              Trending News
            </h3>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-gray-500 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-gray-800">Spring Internships 2025: 'A Hot War for Talent'</h4>
              <p className="mt-2 text-gray-600">Spring internships have become crucial stepping stones for students aiming for top positions in various industries. Early applications and tailored cover letters are essential.</p>
              <div className="mt-3">
                <a href="https://www.thetimes.co.uk/article/spring-internships-2025-student-work-experience-vwlggtgd6" className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                  Read More
                </a>
              </div>
            </div>
          </div>
          
          {/* Ambassador Program */}
          <div className="mb-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
            <h3 className="flex items-center text-xl font-bold mb-4">
              <FaUserFriends className="mr-2" />
              Join the Student Says Ambassador Program!
            </h3>
            <p className="mb-3">Become a leader at your institution by representing Student Says. As an ambassador, you'll:</p>
            <ul className="space-y-2 list-disc list-inside mb-4">
              <li>Host events and engage students</li>
              <li>Spread awareness about our platform</li>
              <li>Earn certificates and exclusive internship opportunities</li>
            </ul>
            <a href="https://forms.gle/eLtHuBgUM1g6kDNx6" className="inline-flex items-center px-6 py-3 bg-white text-orange-600 text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Apply Now
            </a>
          </div>
          
          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="text-gray-700 mb-2">Enjoyed this edition? Share it with your friends to keep them informed!</p>
            <p className="text-gray-700 mb-2">Have an opportunity or event to feature? Email us at <span className="font-semibold">info.studentsays@gmail.com</span></p>
            <p className="text-gray-700">Follow us for more updates:</p>
            <p className="text-gray-700 font-medium">
  Instagram:{" "}
  <a
    href="https://www.instagram.com/saysstudent"
    className="text-blue-600 hover:text-blue-700 hover:underline"
  >
    @saysstudent
  </a>{" "}
  | LinkedIn:{" "}
  <a
    href="https://www.linkedin.com/company/student-says"
    className="text-blue-600 hover:text-blue-700 hover:underline"
  >
    Student Says
  </a>
</p>          </div>
        </div>
      </div>
    </div>
  );
}