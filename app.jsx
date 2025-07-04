import React, { useState, useEffect } from 'react';
import {
  Home,
  Droplet,
  Heart,
  MessageCircle,
  User,
  Activity,
  Award,
  Zap,
  ShieldCheck,
  Hospital,
  Users,
  Bell,
  Settings,
  LogOut,
  Calendar,
  Thermometer,
  Cloud,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Search,
  BookOpen,
  HelpCircle,
  BarChart2,
  List,
  CheckCircle,
  XCircle,
  Clock,
  Star, // Ensure Star icon is imported
  Loader // For loading indicator
} from 'lucide-react';

// Reusable Modal Component
const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full transform transition-all duration-300 scale-100 opacity-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200 shadow-md"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeScreen, setActiveScreen] = useState('patient'); // 'patient', 'donor', 'chatbot', 'admin'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  // Sample data for demonstration
  const patientData = {
    name: 'Priya Sharma',
    age: 12,
    diagnosis: 'Beta Thalassemia Major',
    lastTransfusion: '2025-06-28',
    nextTransfusion: '2025-07-15',
    ironLevels: '1800 ng/mL (High)',
    bloodType: 'A+',
    medications: ['Desferal', 'Folic Acid'],
    supportGroups: ['Thalassemia Warriors - Delhi Chapter'],
    recentActivity: [
      { type: 'Transfusion Request', date: '2025-06-27', status: 'Completed' },
      { type: 'Chatbot Interaction', date: '2025-06-29', status: 'Completed' },
      { type: 'Lab Report Upload', date: '2025-07-01', status: 'Completed' },
    ],
  };

  const donorData = {
    name: 'Arjun Singh',
    bloodType: 'O+',
    totalDonations: 7,
    livesSaved: 3,
    points: 1540,
    badges: ['Life Saver', 'Community Hero', 'O+ Champion'],
    lastDonation: '2025-04-10',
    nextEligible: '2025-07-10',
    recentActivity: [
      { type: 'Donation', date: '2025-04-10', status: 'Completed', recipient: '7-year-old warrior in Hyderabad' },
      { type: 'Campaign Join', date: '2025-05-01', status: 'Completed', campaign: 'Summer Blood Drive' },
      { type: 'Referral', date: '2025-06-15', status: 'Pending' },
    ],
    leaderboard: [
      { name: 'Ravi Kumar', donations: 12, points: 2500 },
      { name: 'Priya Mehta', donations: 10, points: 2100 },
      { name: 'You (Arjun Singh)', donations: 7, points: 1540 },
      { name: 'Deepak Patel', donations: 6, points: 1300 },
    ],
  };

  const adminData = {
    totalPatients: 1245,
    totalDonors: 8976,
    activeRequests: 18,
    pendingVerifications: 5,
    bloodStockOverview: {
      'A+': 'Low', 'B+': 'Medium', 'O+': 'Critical', 'AB+': 'Good',
      'A-': 'Medium', 'B-': 'Good', 'O-': 'Low', 'AB-': 'Good',
    },
    recentActivities: [
      { type: 'New Patient Request', id: 'P-00123', date: '2025-07-03', status: 'Pending Approval' },
      { type: 'Donor Availability Update', id: 'D-00456', date: '2025-07-03', status: 'O+ available' },
      { type: 'Campaign Launched', id: 'C-007', date: '2025-07-02', status: 'Summer Drive' },
    ],
  };

  // Function to handle screen change with loading state
  const handleScreenChange = (screenName) => {
    setIsLoading(true);
    // Simulate network request or data loading
    setTimeout(() => {
      setActiveScreen(screenName);
      setIsLoading(false);
      setIsSidebarOpen(false); // Close sidebar on mobile after selection
    }, 500); // 0.5 second delay
  };

  const ChatbotScreen = () => (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold text-lg flex items-center justify-between rounded-t-lg">
        <div className="flex items-center">
          <MessageCircle className="w-6 h-6 mr-2" />
          Thala-Saathi AI Chatbot
        </div>
        <HelpCircle className="w-5 h-5 cursor-pointer" />
      </div>
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col-reverse">
        {/* Chat messages */}
        <div className="flex items-end mb-4">
          <div className="bg-blue-100 text-blue-800 p-3 rounded-xl rounded-bl-none max-w-[80%] shadow-sm">
            <p className="text-sm">Hi there! How can I assist you today regarding Thalassemia?</p>
            <p className="text-xs text-gray-500 mt-1 text-right">Thala-Saathi • 10:00 AM</p>
          </div>
        </div>
        <div className="flex justify-end items-end mb-4">
          <div className="bg-red-100 text-red-800 p-3 rounded-xl rounded-br-none max-w-[80%] shadow-sm">
            <p className="text-sm">What are the common symptoms of iron overload?</p>
            <p className="text-xs text-gray-500 mt-1 text-left">You • 10:01 AM</p>
          </div>
        </div>
        <div className="flex items-end mb-4">
          <div className="bg-blue-100 text-blue-800 p-3 rounded-xl rounded-bl-none max-w-[80%] shadow-sm">
            <p className="text-sm">Common symptoms of iron overload include fatigue, joint pain, abdominal pain, and heart problems. Regular chelation therapy is crucial to manage this.</p>
            <p className="text-xs text-gray-500 mt-1 text-right">Thala-Saathi • 10:02 AM</p>
          </div>
        </div>
        <div className="flex justify-end items-end mb-4">
          <div className="bg-red-100 text-red-800 p-3 rounded-xl rounded-br-none max-w-[80%] shadow-sm">
            <p className="text-sm">Can you remind me about my next transfusion?</p>
            <p className="text-xs text-gray-500 mt-1 text-left">You • 10:03 AM</p>
          </div>
        </div>
        <div className="flex items-end mb-4">
          <div className="bg-blue-100 text-blue-800 p-3 rounded-xl rounded-bl-none max-w-[80%] shadow-sm">
            <p className="text-sm">Your next scheduled transfusion is on July 15, 2025, at City Hospital. I'll send you a reminder closer to the date!</p>
            <p className="text-xs text-gray-500 mt-1 text-right">Thala-Saathi • 10:04 AM</p>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 flex items-center rounded-b-lg">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200"
        />
        <button className="ml-3 p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all duration-200">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const PatientScreen = () => {
    const [showRequestModal, setShowRequestModal] = useState(false);

    const handleRequestBloodConfirm = () => {
      // Logic to actually request blood (e.g., API call)
      console.log('Blood request confirmed!');
      setShowRequestModal(false);
      // In a real app, you'd show a success message or update status
    };

    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold text-lg flex items-center rounded-t-lg">
          <User className="w-6 h-6 mr-2" />
          Patient Dashboard
        </div>
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {/* Patient Profile Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 p-4 rounded-xl shadow-md border border-red-200">
              <h3 className="font-bold text-red-700 text-xl mb-2 flex items-center"><User className="w-5 h-5 mr-2" /> Welcome, {patientData.name}!</h3>
              <p className="text-gray-700 text-sm">Diagnosis: <span className="font-medium">{patientData.diagnosis}</span></p>
              <p className="text-gray-700 text-sm">Blood Type: <span className="font-medium">{patientData.bloodType}</span></p>
              <p className="text-gray-700 text-sm">Last Transfusion: <span className="font-medium">{patientData.lastTransfusion}</span></p>
              <p className="text-gray-700 text-sm">Next Transfusion: <span className="font-medium text-red-600">{patientData.nextTransfusion}</span></p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl shadow-md border border-blue-200 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-blue-700 text-xl mb-2 flex items-center"><Droplet className="w-5 h-5 mr-2" /> Blood Request Status</h3>
                <p className="text-gray-700 text-sm">Your last request was <span className="font-medium text-green-600">Completed</span>.</p>
                <p className="text-gray-700 text-sm">Need blood urgently?</p>
              </div>
              <button
                onClick={() => setShowRequestModal(true)}
                className="mt-4 w-full bg-red-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg flex items-center justify-center"
              >
                <PlusCircle className="w-5 h-5 mr-2" /> Request Blood Now
              </button>
            </div>
          </div>

          {/* Personal Health Dashboard */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
            <h2 className="font-bold text-gray-800 text-2xl mb-4 flex items-center"><Activity className="w-6 h-6 mr-2" /> Personal Health Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-700 flex items-center"><Thermometer className="w-4 h-4 mr-2" /> Key Health Metrics</h4>
                <p className="text-gray-700 text-sm mt-1">Iron Levels: <span className="font-medium">{patientData.ironLevels}</span></p>
                <p className="text-gray-700 text-sm">Medications: <span className="font-medium">{patientData.medications.join(', ')}</span></p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-700 flex items-center"><BookOpen className="w-4 h-4 mr-2" /> Health Vault</h4>
                <p className="text-gray-700 text-sm mt-1">Securely manage your lab reports and medical history.</p>
                <button className="text-sm text-blue-600 hover:underline mt-2">View My Vault</button>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 text-lg mb-3">Recent Activity</h3>
              <ul className="space-y-2">
                {patientData.recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center">
                      {activity.status === 'Completed' ? <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> : <Clock className="w-5 h-5 text-yellow-500 mr-2" />}
                      <span className="font-medium text-gray-800">{activity.type}</span>
                    </div>
                    <span className="text-sm text-gray-600">{activity.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support & Resources */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="font-bold text-gray-800 text-2xl mb-4 flex items-center"><Users className="w-6 h-6 mr-2" /> Support & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-700 flex items-center"><MessageCircle className="w-4 h-4 mr-2" /> Thala-Saathi Chatbot</h4>
                <p className="text-gray-700 text-sm mt-1">Get instant answers and support 24/7.</p>
                <button
                  onClick={() => handleScreenChange('chatbot')} // Use handleScreenChange
                  className="text-sm text-blue-600 hover:underline mt-2 flex items-center"
                >
                  Launch Chatbot <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h4 className="font-semibold text-teal-700 flex items-center"><Heart className="w-4 h-4 mr-2" /> Support Groups</h4>
                <p className="text-gray-700 text-sm mt-1">Connect with local Thalassemia communities.</p>
                <p className="text-sm text-gray-600 mt-1">My Groups: <span className="font-medium">{patientData.supportGroups[0]}</span></p>
                <button className="text-sm text-blue-600 hover:underline mt-2">Find More Groups</button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
          onConfirm={handleRequestBloodConfirm}
          title="Confirm Blood Request"
          message="Are you sure you want to submit an urgent blood request? Our system will immediately start matching you with available donors."
          confirmText="Yes, Request Blood"
        />
      </div>
    );
  };

  const DonorScreen = () => {
    const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

    const handleDeclareAvailabilityConfirm = () => {
      // Logic to actually declare availability
      console.log('Donor availability confirmed!');
      setShowAvailabilityModal(false);
      // In a real app, you'd show a success message or update status
    };

    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg flex items-center rounded-t-lg">
          <Droplet className="w-6 h-6 mr-2" />
          Donor Dashboard
        </div>
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {/* Donor Profile Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-xl shadow-md border border-green-200">
              <h3 className="font-bold text-green-700 text-xl mb-2 flex items-center"><User className="w-5 h-5 mr-2" /> Welcome, {donorData.name}!</h3>
              <p className="text-gray-700 text-sm">Blood Type: <span className="font-medium">{donorData.bloodType}</span></p>
              <p className="text-gray-700 text-sm">Last Donation: <span className="font-medium">{donorData.lastDonation}</span></p>
              <p className="text-gray-700 text-sm">Next Eligible Donation: <span className="font-medium text-green-600">{donorData.nextEligible}</span></p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl shadow-md border border-emerald-200 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-emerald-700 text-xl mb-2 flex items-center"><Zap className="w-5 h-5 mr-2" /> Your Impact</h3>
                <p className="text-gray-700 text-sm">Total Donations: <span className="font-medium text-xl">{donorData.totalDonations}</span></p>
                <p className="text-gray-700 text-sm">Lives Touched: <span className="font-medium text-xl">{donorData.livesSaved}</span></p>
              </div>
              <button
                onClick={() => setShowAvailabilityModal(true)}
                className="mt-4 w-full bg-emerald-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg flex items-center justify-center"
              >
                <Droplet className="w-5 h-5 mr-2" /> Declare Availability
              </button>
            </div>
          </div>

          {/* Gamification Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
            <h2 className="font-bold text-gray-800 text-2xl mb-4 flex items-center"><Award className="w-6 h-6 mr-2" /> Gamified Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-700 flex items-center"><Star className="w-4 h-4 mr-2" /> Your Points</h4>
                <p className="text-gray-700 text-sm mt-1 text-2xl font-bold">{donorData.points}</p>
                <p className="text-xs text-gray-500">Earn more by donating & referring!</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-700 flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> Your Badges</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {donorData.badges.map((badge, index) => (
                    <span key={index} className="bg-purple-200 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">{badge}</span>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-gray-700 text-lg mb-3 flex items-center"><List className="w-5 h-5 mr-2" /> Top Donors Leaderboard</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Rank</th>
                    <th className="py-3 px-6 text-left">Donor</th>
                    <th className="py-3 px-6 text-center">Donations</th>
                    <th className="py-3 px-6 text-center">Points</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {donorData.leaderboard.map((donor, index) => (
                    <tr key={index} className={`border-b border-gray-200 hover:bg-gray-50 ${donor.name.includes('You') ? 'bg-emerald-50 font-semibold' : ''}`}>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                      <td className="py-3 px-6 text-left">{donor.name}</td>
                      <td className="py-3 px-6 text-center">{donor.donations}</td>
                      <td className="py-3 px-6 text-center">{donor.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="font-bold text-gray-800 text-2xl mb-4 flex items-center"><Clock className="w-6 h-6 mr-2" /> Recent Activity</h2>
            <ul className="space-y-3">
              {donorData.recentActivity.map((activity, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    {activity.status === 'Completed' ? <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> : <XCircle className="w-5 h-5 text-red-500 mr-2" />}
                    <span className="font-medium text-gray-800">{activity.type}</span>
                    {activity.recipient && <span className="ml-2 text-gray-600 text-sm italic">({activity.recipient})</span>}
                    {activity.campaign && <span className="ml-2 text-gray-600 text-sm italic">({activity.campaign})</span>}
                  </div>
                  <span className="text-sm text-gray-600">{activity.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Modal
          isOpen={showAvailabilityModal}
          onClose={() => setShowAvailabilityModal(false)}
          onConfirm={handleDeclareAvailabilityConfirm}
          title="Confirm Availability"
          message="Are you sure you want to declare your availability for blood donation? You will be notified if a matching request comes up."
          confirmText="Yes, I'm Available"
        />
      </div>
    );
  };

  const AdminScreen = () => (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg flex items-center rounded-t-lg">
        <Hospital className="w-6 h-6 mr-2" />
        Admin/Hospital Dashboard
      </div>
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl shadow-md border border-blue-200 flex flex-col items-center justify-center text-center">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-gray-700 text-sm">Total Patients</p>
            <p className="text-3xl font-bold text-blue-800">{adminData.totalPatients}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl shadow-md border border-green-200 flex flex-col items-center justify-center text-center">
            <Droplet className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-gray-700 text-sm">Total Donors</p>
            <p className="text-3xl font-bold text-green-800">{adminData.totalDonors}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl shadow-md border border-red-200 flex flex-col items-center justify-center text-center">
            <Bell className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-gray-700 text-sm">Active Requests</p>
            <p className="text-3xl font-bold text-red-800">{adminData.activeRequests}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl shadow-md border border-yellow-200 flex flex-col items-center justify-center text-center">
            <Clock className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-gray-700 text-sm">Pending Verifications</p>
            <p className="text-3xl font-bold text-yellow-800">{adminData.pendingVerifications}</p>
          </div>
        </div>

        {/* Blood Stock Overview */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
          <h2 className="font-bold text-gray-800 text-2xl mb-4 flex items-center"><Droplet className="w-6 h-6 mr-2" /> Blood Stock Overview (e-RaktKosh Sync)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(adminData.bloodStockOverview).map(([bloodType, status]) => (
              <div key={bloodType} className={`p-3 rounded-lg text-center font-semibold ${
                status === 'Critical' ? 'bg-red-100 text-red-800 border border-red-300' :
                status === 'Low' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                status === 'Medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                'bg-green-100 text-green-800 border border-green-300'
              }`}>
                <p className="text-lg">{bloodType}</p>
                <p className="text-xs">{status}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">Last updated: 2025-07-04 10:30 AM</p>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="font-bold text-gray-800 text-2xl mb-4 flex items-center"><List className="w-6 h-6 mr-2" /> Recent Activities</h2>
          <ul className="space-y-3">
            {adminData.recentActivities.map((activity, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  {activity.type.includes('Request') ? <PlusCircle className="w-5 h-5 text-blue-500 mr-2" /> :
                   activity.type.includes('Update') ? <Activity className="w-5 h-5 text-green-500 mr-2" /> :
                   <Bell className="w-5 h-5 text-purple-500 mr-2" />}
                  <span className="font-medium text-gray-800">{activity.type}</span>
                  {activity.id && <span className="ml-2 text-gray-600 text-sm italic">({activity.id})</span>}
                </div>
                <span className="text-sm text-gray-600">{activity.date} - {activity.status}</span>
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg flex items-center justify-center">
            <BarChart2 className="w-5 h-5 mr-2" /> View Full Analytics
          </button>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg shadow-lg">
          <Loader className="animate-spin text-red-500 w-12 h-12 mb-4" />
          <p className="text-lg text-gray-700">Loading content...</p>
        </div>
      );
    }
    switch (activeScreen) {
      case 'patient':
        return <PatientScreen />;
      case 'donor':
        return <DonorScreen />;
      case 'chatbot':
        return <ChatbotScreen />;
      case 'admin':
        return <AdminScreen />;
      default:
        return <PatientScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800 flex flex-col md:flex-row">
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Inter Font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Custom Scrollbar Style */}
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        `}
      </style>

      {/* Sidebar for Navigation */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="p-6 bg-gradient-to-r from-red-600 to-rose-700 text-white text-2xl font-bold flex items-center justify-center rounded-br-3xl">
          <Heart className="w-8 h-8 mr-2" /> Raksha AI
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => handleScreenChange('patient')}
            className={`w-full flex items-center p-3 rounded-lg text-left font-medium transition-all duration-200 ${activeScreen === 'patient' ? 'bg-red-100 text-red-700 shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <User className="w-5 h-5 mr-3" /> Patient Dashboard
          </button>
          <button
            onClick={() => handleScreenChange('donor')}
            className={`w-full flex items-center p-3 rounded-lg text-left font-medium transition-all duration-200 ${activeScreen === 'donor' ? 'bg-green-100 text-green-700 shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <Droplet className="w-5 h-5 mr-3" /> Donor Dashboard
          </button>
          <button
            onClick={() => handleScreenChange('chatbot')}
            className={`w-full flex items-center p-3 rounded-lg text-left font-medium transition-all duration-200 ${activeScreen === 'chatbot' ? 'bg-blue-100 text-blue-700 shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <MessageCircle className="w-5 h-5 mr-3" /> Thala-Saathi Chatbot
          </button>
          <button
            onClick={() => handleScreenChange('admin')}
            className={`w-full flex items-center p-3 rounded-lg text-left font-medium transition-all duration-200 ${activeScreen === 'admin' ? 'bg-indigo-100 text-indigo-700 shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <Hospital className="w-5 h-5 mr-3" /> Admin/Hospital
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center p-3 rounded-lg text-left font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200">
            <Settings className="w-5 h-5 mr-3" /> Settings
          </button>
          <button className="w-full flex items-center p-3 rounded-lg text-left font-medium text-red-500 hover:bg-red-50 transition-all duration-200">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-4 md:p-6">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md bg-white shadow-md text-gray-700">
            <List className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Raksha AI</h1>
          <div className="w-6 h-6"></div> {/* Placeholder for alignment */}
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Render Active Screen */}
        <div className="flex-1 min-h-0">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
};

export default App;

