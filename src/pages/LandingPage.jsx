import { useState, Suspense, lazy, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Lazy load components
const Particles = lazy(() => import('../components/LandingPage/Particles'));
const TextType = lazy(() => import('../components/LandingPage/TextType'));
const SplitText = lazy(() => import('../components/LandingPage/SplitText'));
const ClickSpark = lazy(() => import('../components/LandingPage/ClickSpark'));
const SplashCursor = lazy(() => import('../components/LandingPage/SplashCursor'));
const SpotlightCard = lazy(() => import('../components/LandingPage/SpotlightCard'));
import {
  BookOpen,
  Users,
  BarChart3,
  MessageSquare,
  Brain,
  CheckCircle,
  Shield,
  ArrowRight,
  Star,
  Zap,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';

const LandingPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleLogout = () => {
    logout();
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard');
    }
  };



  const features = useMemo(() => [
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
  ], []);

  const testimonials = useMemo(() => [
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
  ], []);

  const handleSlideChange = useCallback((direction) => {
    if (direction === 'next') {
      setCurrentSlide(prev => prev < features.slice(1).length - 1 ? prev + 1 : 0);
    } else {
      setCurrentSlide(prev => prev > 0 ? prev - 1 : features.slice(1).length - 1);
    }
  }, [features]);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange('next');
    }, 5000);
    return () => clearInterval(interval);
  }, [handleSlideChange]);



  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-900 to-black" />}>
      <ClickSpark
        sparkColor="#fff"
        sparkSize={12}
        sparkRadius={20}
        sparkCount={6}
        duration={600}
        easing="ease-out"
        extraScale={1.2}
      >
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative">
          <div className="fixed inset-0 z-0">
            <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />}>
              <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
              />
            </Suspense>
          </div>
          <div className="fixed inset-0 z-1">
            <Suspense fallback={<div />}>
              <SplashCursor
                SIM_RESOLUTION={24}
                DYE_RESOLUTION={128}
                CAPTURE_RESOLUTION={64}
                DENSITY_DISSIPATION={0.995}
                VELOCITY_DISSIPATION={0.99}
                PRESSURE={0.2}
                PRESSURE_ITERATIONS={6}
                CURL={8}
                SPLAT_RADIUS={0.08}
                SPLAT_FORCE={1000}
                SHADING={false}
                COLOR_UPDATE_SPEED={2}
                BACK_COLOR={{ r: 0, g: 0, b: 0 }}
                TRANSPARENT={true}
              />
            </Suspense>
          </div>
          {/* Header */}
          <header className="bg-transparent border-b border-gray-700 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-white">HomeworkHub</span>
                </div>
                <nav className="flex items-center space-x-8">
                  <Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                  <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
                  <Link to="/security" className="text-gray-300 hover:text-white transition-colors">Security</Link>
                  <Link to="/docs" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <FileText className="h-4 w-4" />
                    Docs
                  </Link>
                  {user ? (
                    <>
                      <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                        Dashboard ({user.role})
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
                      <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">Sign Up</Link>
                    </>
                  )}
                </nav>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-20 relative overflow-hidden z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
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
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                >
                  <Link to="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <button className="border border-gray-500 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
                    Watch Demo
                  </button>
                </motion.div>
              </div>

              {/* Main Feature Card - Centered */}
              <div className="flex justify-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-md w-full"
                >
                  <Suspense fallback={<div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl shadow-2xl text-center text-white border border-indigo-400/30" />}>
                    <SpotlightCard className="bg-gradient-to-br from-indigo-600 to-purple-700 text-center text-white" spotlightColor="rgba(255, 255, 255, 0.3)">
                      <BookOpen className="h-16 w-16 mx-auto mb-6 text-white" />
                      <div className="mb-4">
                        <Suspense fallback={<h3 className="text-2xl font-bold">Smart Homework Management</h3>}>
                          <SplitText text="Smart Homework Management" className="text-2xl font-bold" tag="h3" textAlign="center" />
                        </Suspense>
                      </div>
                      <div className="mb-6">
                        <Suspense fallback={<p className="text-indigo-100">Create, assign, and track homework with file attachments and due dates</p>}>
                          <SplitText text="Create, assign, and track homework with file attachments and due dates" className="text-indigo-100" delay={0.3} textAlign="center" />
                        </Suspense>
                      </div>
                      <ul className="space-y-2 text-left">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-300 mr-3" />
                          <Suspense fallback={<span className="text-sm">Automated reminders</span>}>
                            <SplitText text="Automated reminders" className="text-sm" delay={0.5} textAlign="left" />
                          </Suspense>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-300 mr-3" />
                          <Suspense fallback={<span className="text-sm">File upload support</span>}>
                            <SplitText text="File upload support" className="text-sm" delay={0.6} textAlign="left" />
                          </Suspense>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-300 mr-3" />
                          <Suspense fallback={<span className="text-sm">Progress tracking</span>}>
                            <SplitText text="Progress tracking" className="text-sm" delay={0.7} textAlign="left" />
                          </Suspense>
                        </li>
                      </ul>
                    </SpotlightCard>
                  </Suspense>
                </motion.div>
              </div>

              {/* Carousel for Other Features */}
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="mb-2">
                    <SplitText text="More Amazing Features" className="text-2xl font-bold text-white" tag="h3" textAlign="center" />
                  </div>
                  <div>
                    <SplitText text="Discover what else HomeworkHub can do for you" className="text-gray-300" delay={0.3} textAlign="center" />
                  </div>
                </div>

                <div className="relative overflow-hidden h-96">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -300, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        opacity: { duration: 0.2 }
                      }}
                      className="absolute inset-0 flex items-center justify-center px-4"
                    >
                      {(() => {
                        const feature = features.slice(1)[currentSlide];
                        const FeatureIcon = feature.icon;
                        return (
                          <div className="max-w-sm w-full">
                            <Suspense fallback={<div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50" />}>
                              <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.3)">
                                <div className="text-center">
                                  <div className="bg-indigo-600/20 p-4 rounded-full w-fit mx-auto mb-4">
                                    <FeatureIcon className="h-12 w-12 text-indigo-400" />
                                  </div>
                                  <div className="mb-3">
                                    <Suspense fallback={<h4 className="text-xl font-semibold text-white">{feature.title}</h4>}>
                                      <SplitText text={feature.title} className="text-xl font-semibold text-white" tag="h4" textAlign="center" />
                                    </Suspense>
                                  </div>
                                  <div className="mb-4">
                                    <Suspense fallback={<p className="text-gray-300">{feature.description}</p>}>
                                      <SplitText text={feature.description} className="text-gray-300" delay={0.3} textAlign="center" />
                                    </Suspense>
                                  </div>
                                  <ul className="space-y-2">
                                    {feature.benefits.map((benefit, i) => (
                                      <li key={i} className="flex items-center text-sm text-gray-400">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                        {benefit}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </SpotlightCard>
                            </Suspense>
                          </div>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  <motion.button
                    onClick={() => handleSlideChange('prev')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors z-20"
                    aria-label="Previous slide"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleSlideChange('next')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors z-20"
                    aria-label="Next slide"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </motion.button>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  {features.slice(1).map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-indigo-500' : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        scale: currentSlide === index ? 1.3 : 1,
                        opacity: currentSlide === index ? 1 : 0.7
                      }}
                    />
                  ))}
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
                  className="flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Suspense fallback={<div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700/50 flex flex-col h-full" />}>
                    <SpotlightCard className="flex flex-col h-full" spotlightColor="rgba(59, 130, 246, 0.3)">
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
                    </SpotlightCard>
                  </Suspense>
                </motion.div>

                <motion.div
                  className="flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Suspense fallback={<div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700/50 flex flex-col h-full" />}>
                    <SpotlightCard className="flex flex-col h-full" spotlightColor="rgba(99, 102, 241, 0.3)">
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
                    </SpotlightCard>
                  </Suspense>
                </motion.div>

                <motion.div
                  className="flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Suspense fallback={<div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700/50 flex flex-col h-full" />}>
                    <SpotlightCard className="flex flex-col h-full" spotlightColor="rgba(147, 51, 234, 0.3)">
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
                    </SpotlightCard>
                  </Suspense>
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Suspense fallback={<div className="bg-gray-700 p-6 rounded-xl" />}>
                      <SpotlightCard spotlightColor="rgba(251, 191, 36, 0.3)">
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
                      </SpotlightCard>
                    </Suspense>
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
                    <li><Link to="/features" className="hover:text-white">Features</Link></li>
                    <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                    <li><Link to="/security" className="hover:text-white">Security</Link></li>
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
      </ClickSpark>
    </Suspense>
  );
};

export default LandingPage;