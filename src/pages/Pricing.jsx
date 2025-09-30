import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Check, X } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual teachers getting started",
      features: [
        "Up to 30 students",
        "Basic homework management",
        "File uploads (100MB)",
        "Email notifications",
        "Community support"
      ],
      limitations: [
        "No advanced analytics",
        "No AI summaries",
        "Limited storage"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Ideal for teachers and small schools",
      features: [
        "Up to 150 students",
        "Advanced homework management",
        "File uploads (1GB)",
        "AI-powered summaries",
        "Advanced analytics",
        "Discussion forums",
        "Priority support",
        "Custom branding"
      ],
      limitations: [],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For schools and districts with advanced needs",
      features: [
        "Unlimited students",
        "All Pro features",
        "Unlimited storage",
        "Advanced user management",
        "SSO integration",
        "Custom integrations",
        "Dedicated support",
        "Training & onboarding",
        "SLA guarantee"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales"
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
              <Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link to="/pricing" className="text-indigo-400 font-medium">Pricing</Link>
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
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Choose the perfect plan for your needs. Start free and upgrade as you grow.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border transition-all duration-300 ${
                  plan.popular 
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
                    : 'border-gray-700/50 hover:border-indigo-500/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period !== "contact us" && (
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-300">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {plan.limitations.map((limitation, i) => (
                      <li key={i} className="flex items-center text-gray-500">
                        <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Everything you need to know about our pricing</p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start."
              },
              {
                question: "What happens to my data if I cancel?",
                answer: "Your data remains accessible for 30 days after cancellation. You can export all your data during this period."
              },
              {
                question: "Do you offer educational discounts?",
                answer: "Yes, we offer special pricing for educational institutions. Contact our sales team for more information."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
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
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-indigo-100 mb-8">Join thousands of educators already using HomeworkHub</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors">
                Start Free Trial
              </Link>
              <Link to="/features" className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">
                View Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;