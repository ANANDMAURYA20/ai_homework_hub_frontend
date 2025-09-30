import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart3, MessageSquare, Brain, CheckCircle, Users, Shield, Zap, FileText, Clock, Bell } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Smart Homework Management",
      description: "Create, assign, and track homework with file attachments and due dates",
      benefits: ["Automated reminders", "File upload support", "Progress tracking", "Due date management"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get insights into student performance and engagement patterns",
      benefits: ["Performance metrics", "Engagement tracking", "Custom reports", "Data visualization"]
    },
    {
      icon: MessageSquare,
      title: "Interactive Discussions",
      description: "Foster collaboration with Q&A discussions and peer support",
      benefits: ["Real-time discussions", "Upvoting system", "Teacher moderation", "Peer collaboration"]
    },
    {
      icon: Brain,
      title: "AI-Powered Summaries",
      description: "Automatically generate summaries and insights from homework content",
      benefits: ["Content summarization", "Key insights", "Time-saving automation", "Smart analysis"]
    },
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive user roles and permissions system",
      benefits: ["Role-based access", "Class organization", "Student enrollment", "Teacher assignments"]
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Stay updated with intelligent notification system",
      benefits: ["Due date alerts", "Grade notifications", "Discussion updates", "Custom preferences"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <header className="bg-transparent border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-white">HomeworkHub</span>
            </Link>
            <nav className="flex items-center space-x-8">
              <Link to="/features" className="text-indigo-400 font-medium">Features</Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              <Link to="/security" className="text-gray-300 hover:text-white transition-colors">Security</Link>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Powerful Features for Modern Education
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover all the tools and capabilities that make HomeworkHub the perfect solution for homework management
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-indigo-600/20 p-4 rounded-full w-fit mb-6">
                    <FeatureIcon className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 p-12 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-indigo-100 mb-8">Experience all these features with a free trial</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors">
                Start Free Trial
              </Link>
              <Link to="/pricing" className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;