"use client"
import React, { useState } from 'react';
import { 
  FiCloud, 
  FiZap, 
  FiShield, 
  FiUsers, 
  FiUpload, 
  FiDownload, 
  FiGlobe, 
  FiCheck, 
  FiArrowRight,
  FiStar,
  FiPlay,
  FiTrendingUp,
  FiLock,
  FiClock
} from 'react-icons/fi';

const Homepage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  // Simulate upload progress
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FiTrendingUp className="mr-2" />
                Trusted by 10M+ users worldwide
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Share Files 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Lightning Fast</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Send files of any size instantly with military-grade security. No registration required for basic transfers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
                  <FiUpload className="mr-2" />
                  Start Sharing Now
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-200 flex items-center justify-center">
                  <FiPlay className="mr-2" />
                  Watch Demo
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10TB</div>
                  <div className="text-sm text-gray-600">Max File Size</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">256-bit</div>
                  <div className="text-sm text-gray-600">Encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Interactive Demo */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="text-center mb-6">
                  <FiCloud className="text-6xl text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Drop files here</h3>
                  <p className="text-gray-600 text-sm">or click to browse</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors duration-200 cursor-pointer">
                  <FiUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Drag & drop files here</p>
                </div>
                
                {uploadProgress > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Uploading...</span>
                      <span className="text-sm text-gray-600">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={simulateUpload}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Try Demo Upload
                </button>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full animate-bounce">
                <FiShield />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-full animate-pulse">
                <FiZap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Giga Send?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for speed, security, and simplicity. Experience the future of file sharing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiZap className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 mb-4">Upload speeds up to 10x faster than traditional services with our optimized infrastructure.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Multi-threaded uploads</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Global CDN network</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Resume interrupted transfers</li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiShield className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Bank-Level Security</h3>
              <p className="text-gray-600 mb-4">Your files are protected with military-grade encryption and zero-knowledge architecture.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> End-to-end encryption</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Zero-knowledge storage</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Auto-delete options</li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Collaboration</h3>
              <p className="text-gray-600 mb-4">Advanced sharing controls and real-time collaboration tools for teams of any size.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Team workspaces</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Permission controls</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Activity tracking</li>
              </ul>
            </div>
            
            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiGlobe className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Access</h3>
              <p className="text-gray-600 mb-4">Access your files from anywhere in the world with our global infrastructure.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> 50+ global servers</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Mobile apps</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Offline sync</li>
              </ul>
            </div>
            
            {/* Feature 5 */}
            <div className="group bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiClock className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Scheduling</h3>
              <p className="text-gray-600 mb-4">Schedule transfers, set expiration dates, and automate your workflow.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Scheduled transfers</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Auto-expiration</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Batch processing</li>
              </ul>
            </div>
            
            {/* Feature 6 */}
            <div className="group bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiLock className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Privacy</h3>
              <p className="text-gray-600 mb-4">Complete control over your data with advanced privacy and compliance features.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> GDPR compliant</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Password protection</li>
                <li className="flex items-center"><FiCheck className="text-green-500 mr-2" /> Download limits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about Giga Send
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Giga Send has transformed how our team shares files. The speed is incredible and the security gives us peace of mind."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  JS
                </div>
                <div>
                  <div className="font-semibold text-gray-900">John Smith</div>
                  <div className="text-sm text-gray-600">CTO, TechCorp</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The collaboration features are amazing. We can work on projects seamlessly across different continents."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MJ
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Maria Johnson</div>
                  <div className="text-sm text-gray-600">Designer, Creative Studio</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Finally, a file sharing service that just works. No complicated setup, just drag, drop, and share."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AL
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Alex Lee</div>
                  <div className="text-sm text-gray-600">Freelancer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Lightning-Fast File Sharing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of users who trust Giga Send for their file sharing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
              <FiUpload className="mr-2" />
              Start Free Transfer
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center">
              View Pricing Plans
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;