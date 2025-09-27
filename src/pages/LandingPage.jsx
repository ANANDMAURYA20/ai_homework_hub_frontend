import { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Lazy load components
const Particles = lazy(() => import('../components/LandingPage/Particles'));
const TextType = lazy(() => import('../components/LandingPage/TextType'));
const SplitText = lazy(() => import('../components/LandingPage/SplitText'));
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Brain, 
  CheckCircle, 
  Clock, 
  Shield,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: BookOpen,
      title: "Smart Homework Management",
      description: "Create, assign, and track homework with file attachments and due dates",
      benefits: ["Automated reminders", "File upload support", "Progress tracking"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get insights into student performance and engagement patterns",
      benefits: ["Performance metrics", "Engagement tracking", "Custom reports"]
    },
    {
      icon: MessageSquare,
      title: "Interactive Discussions",
      description: "Foster collaboration with Q&A discussions and peer support",
      benefits: ["Real-time discussions", "Upvoting system", "Teacher moderation"]
    },
    {
      icon: Brain,
      title: "AI-Powered Summaries",
      description: "Automatically generate summaries and insights from homework content",
      benefits: ["Content summarization", "Key insights", "Time-saving automation"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "High School Teacher",
      content: "This platform has revolutionized how I manage assignments. The analytics help me understand each student's progress.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Student",
      content: "Finally, a homework system that actually makes sense. The discussions feature helped me understand concepts better.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "School Administrator",
      content: "The comprehensive analytics and user management features make this perfect for our institution.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative">
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />}>
          <Particles
            particleCount={150}
            particleSpread={15}
            speed={0.05}
            particleColors={['#ffffff', '#f8fafc', '#e2e8f0']}
            alphaParticles={true}
            particleBaseSize={80}
            sizeRandomness={0.5}
          />
        </Suspense>
      </div>
      {/* Header */}
      <header className="bg-transparent border-b border-gray-700 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-white">HomeworkHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-6">
              <Suspense fallback={<div className="text-5xl font-bold text-white">The Future of Homework Management</div>}>
                <TextType 
                  text="The Future of Homework Management"
                  speed={100}
                  className="text-5xl font-bold text-white"
                />
              </Suspense>
            </div>
            <div className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              <Suspense fallback={<div className="text-xl text-gray-300">Streamline assignments, boost engagement, and gain powerful insights with our comprehensive homework management platform designed for modern education.</div>}>
                <TextType 
                  text="Streamline assignments, boost engagement, and gain powerful insights with our comprehensive homework management platform designed for modern education."
                  speed={50}
                  delay={3000}
                  className="text-xl text-gray-300"
                />
              </Suspense>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="border border-gray-500 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-4">
              <Suspense fallback={<h2 className="text-3xl font-bold text-white">Why Choose HomeworkHub?</h2>}>
                <SplitText text="Why Choose HomeworkHub?" className="text-3xl font-bold text-white" tag="h2" textAlign="center" />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<p className="text-xl text-gray-300">Everything you need to manage homework effectively in one platform</p>}>
                <SplitText text="Everything you need to manage homework effectively in one platform" className="text-xl text-gray-300" delay={0.5} textAlign="center" />
              </Suspense>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg cursor-pointer transition-all ${
                    activeFeature === index ? 'bg-indigo-900 border-2 border-indigo-500' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start">
                    <feature.icon className={`h-8 w-8 ${activeFeature === index ? 'text-indigo-400' : 'text-gray-300'}`} />
                    <div className="ml-4">
                      <div className="mb-2">
                        <Suspense fallback={<h3 className="text-xl font-semibold text-white">{feature.title}</h3>}>
                          <SplitText text={feature.title} className="text-xl font-semibold text-white" tag="h3" textAlign="left" />
                        </Suspense>
                      </div>
                      <div className="mb-3">
                        <Suspense fallback={<p className="text-gray-300">{feature.description}</p>}>
                          <SplitText text={feature.description} className="text-gray-300" delay={0.3} textAlign="left" />
                        </Suspense>
                      </div>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
             <motion.div
  key={activeFeature}
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  className="text-center"
>
  {(() => {
    const FeatureIcon = features[activeFeature].icon;
    return <FeatureIcon className="h-16 w-16 mx-auto mb-6" />;
  })()}
  <div className="mb-4">
    <Suspense fallback={<h3 className="text-2xl font-bold">{features[activeFeature].title}</h3>}>
      <SplitText text={features[activeFeature].title} className="text-2xl font-bold" tag="h3" textAlign="center" />
    </Suspense>
  </div>
  <div>
    <Suspense fallback={<p className="text-lg opacity-90">{features[activeFeature].description}</p>}>
      <SplitText text={features[activeFeature].description} className="text-lg opacity-90" delay={0.3} textAlign="center" />
    </Suspense>
  </div>
</motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-4">
              <SplitText text="Built for Everyone" className="text-3xl font-bold text-white" tag="h2" textAlign="center" />
            </div>
            <div>
              <SplitText text="Tailored experiences for students, teachers, and administrators" className="text-xl text-gray-300" delay={0.5} textAlign="center" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <motion.div 
              className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full"
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-blue-600/20 p-4 rounded-full mb-4">
                  <Users className="h-12 w-12 text-blue-400" />
                </div>
                <div>
                  <SplitText text="For Students" className="text-xl font-bold text-white" tag="h3" textAlign="center" />
                </div>
              </div>
              <ul className="space-y-4 text-gray-300 flex-grow">
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />Easy homework submission</li>
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />Progress tracking</li>
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />Peer discussions</li>
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />Grade notifications</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-full"
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-indigo-600/20 p-4 rounded-full mb-4">
                  <BookOpen className="h-12 w-12 text-indigo-400" />
                </div>
                <div>
                  <SplitText text="For Teachers" className="text-xl font-bold text-white" tag="h3" textAlign="center" />
                </div>
              </div>
              <ul className="space-y-4 text-gray-300 flex-grow">
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />Assignment creation</li>
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />Automated grading</li>
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />Performance analytics</li>
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />Class management</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full"
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-purple-600/20 p-4 rounded-full mb-4">
                  <Shield className="h-12 w-12 text-purple-400" />
                </div>
                <div>
                  <SplitText text="For Admins" className="text-xl font-bold text-white" tag="h3" textAlign="center" />
                </div>
              </div>
              <ul className="space-y-4 text-gray-300 flex-grow">
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />User management</li>
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />System analytics</li>
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />Security controls</li>
                <li className="flex items-center justify-start"><Zap className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />Institution insights</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-4">
              <SplitText text="What Our Users Say" className="text-3xl font-bold text-white" tag="h2" textAlign="center" />
            </div>
            <div>
              <SplitText text="Join thousands of satisfied educators and students" className="text-xl text-gray-300" delay={0.5} textAlign="center" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="mb-4">
                  <SplitText text={`"${testimonial.content}"`} className="text-gray-300" textAlign="left" />
                </div>
                <div>
                  <div className="mb-1">
                    <SplitText text={testimonial.name} className="font-semibold text-white" delay={0.3} textAlign="left" />
                  </div>
                  <div>
                    <SplitText text={testimonial.role} className="text-sm text-gray-400" delay={0.5} textAlign="left" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <SplitText text="Ready to Transform Your Homework Management?" className="text-3xl font-bold text-white" tag="h2" textAlign="center" />
          </div>
          <div className="mb-8">
            <SplitText text="Join thousands of educators already using HomeworkHub" className="text-xl text-indigo-100" delay={0.5} textAlign="center" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors">
              Start Free Trial
            </Link>
            <Link to="/login" className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-transparent text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold text-white">HomeworkHub</span>
              </div>
              <div>
                <SplitText text="The modern solution for homework management in education." className="text-gray-400" textAlign="left" />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <SplitText text="Product" className="font-semibold" tag="h3" textAlign="left" />
              </div>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-4">
                <SplitText text="Support" className="font-semibold" tag="h3" textAlign="left" />
              </div>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-4">
                <SplitText text="Company" className="font-semibold" tag="h3" textAlign="left" />
              </div>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <div>
              <SplitText text="© 2025 HomeworkHub. All rights reserved." className="text-gray-400" textAlign="center" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;