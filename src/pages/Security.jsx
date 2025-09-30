import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Lock, Eye, Server, CheckCircle, Users, FileText } from 'lucide-react';

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption"
    },
    {
      icon: Lock,
      title: "Secure Authentication",
      description: "Multi-factor authentication and secure password policies protect user accounts"
    },
    {
      icon: Eye,
      title: "Privacy Controls",
      description: "Granular privacy settings give users complete control over their data visibility"
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Hosted on enterprise-grade cloud infrastructure with 99.9% uptime guarantee"
    },
    {
      icon: Users,
      title: "Access Controls",
      description: "Role-based permissions ensure users only access appropriate content and features"
    },
    {
      icon: FileText,
      title: "Audit Logs",
      description: "Comprehensive logging and monitoring of all system activities for transparency"
    }
  ];

  const certifications = [
    { name: "SOC 2 Type II", status: "Certified" },
    { name: "GDPR Compliant", status: "Compliant" },
    { name: "FERPA Compliant", status: "Compliant" },
    { name: "ISO 27001", status: "In Progress" }
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
              <Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              <Link to="/security" className="text-indigo-400 font-medium">Security</Link>
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
            Security & Privacy First
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your data security and privacy are our top priorities. Learn how we protect your information with enterprise-grade security measures.
          </motion.p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Comprehensive Security</h2>
            <p className="text-xl text-gray-300">Multiple layers of protection keep your data safe</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-indigo-600/20 p-3 rounded-lg w-fit mb-4">
                    <IconComponent className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Compliance & Certifications</h2>
            <p className="text-xl text-gray-300">Meeting the highest industry standards</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{cert.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  cert.status === 'Certified' || cert.status === 'Compliant' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {cert.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Your Data, Your Control</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Data Ownership</h3>
                    <p className="text-gray-300">You retain full ownership of all your data. We never sell or share your information with third parties.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Data Portability</h3>
                    <p className="text-gray-300">Export your data anytime in standard formats. No vendor lock-in, complete freedom.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Right to Deletion</h3>
                    <p className="text-gray-300">Request complete deletion of your data at any time. We ensure permanent removal from all systems.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-8 rounded-2xl border border-indigo-500/30"
            >
              <Shield className="h-16 w-16 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">24/7 Security Monitoring</h3>
              <p className="text-gray-300 mb-6">
                Our security team monitors systems around the clock, with automated threat detection and immediate response protocols.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  Real-time threat detection
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  Automated security updates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  Incident response team
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Security Questions</h2>
            <p className="text-xl text-gray-300">Common questions about our security practices</p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                question: "How is my data encrypted?",
                answer: "We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. All encryption keys are managed using industry-standard key management systems."
              },
              {
                question: "Where is my data stored?",
                answer: "Data is stored in secure, SOC 2 certified data centers with multiple geographic backups. We use leading cloud providers with proven security track records."
              },
              {
                question: "Who has access to my data?",
                answer: "Only authorized personnel with legitimate business needs can access data, and all access is logged and monitored. We follow the principle of least privilege."
              },
              {
                question: "How do you handle security incidents?",
                answer: "We have a comprehensive incident response plan with immediate notification protocols. All incidents are investigated, documented, and reported as required."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold text-white mb-4">Questions About Security?</h2>
            <p className="text-xl text-indigo-100 mb-8">Our security team is here to help address any concerns</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors">
                Start Secure Trial
              </Link>
              <a href="mailto:security@homeworkhub.com" className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">
                Contact Security Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Security;