'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#008df3]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"/>
        </svg>
      ),
      title: "AI-Powered Generation",
      description: "Leverage artificial intelligence to create comprehensive and professional README files automatically."
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#008df3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Lightning Fast",
      description: "Generate complete README documentation in seconds, not hours. Save time and focus on coding."
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#008df3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      title: "Live Editor",
      description: "Edit and customize your README in real-time with our built-in markdown editor and instant preview."
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#008df3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Easy Download",
      description: "Download your polished README.md file instantly and add it to your repository with one click."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      {/* Hero Section */}
      <motion.section 
        className="pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-[#008df3] to-blue-400 bg-clip-text text-transparent">
              Professional
            </span>
            <br />
            <span className="text-white">README</span>
            <br />
            <span className="text-gray-300">Generator</span>
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-300 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            Transform your GitHub repositories with AI-powered README generation. 
            Create professional documentation in seconds, edit with our live markdown editor, 
            and download instantly.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => router.push('/generate-readme')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#008df3] to-blue-600 hover:from-[#0066cc] hover:to-blue-700 text-white font-semibold text-base sm:text-lg rounded-lg shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 141, 243, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#008df3] text-[#008df3] hover:bg-[#008df3] hover:text-white font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View on GitHub
            </motion.a>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8 sm:mt-10 lg:mt-12 px-4"
            variants={itemVariants}
          >
            {[{ label: "AI Powered", icon: "🤖" },{ label: "Instant Generation", icon: "⚡" },{ label: "Markdown Editor", icon: "📝" }].map((badge, index) => (
              <span key={index} className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm bg-[#008df3]/20 text-[#008df3] border border-[#008df3]/30">
                <span className="mr-2">{badge.icon}</span>
                <span className="hidden sm:inline">{badge.label}</span>
                <span className="sm:hidden">{badge.label.split(' ')[0]}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="py-12 sm:py-16 lg:py-20 px-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="container mx-auto">
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Why Choose Our Generator?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Built with modern technologies and designed for developers who value quality and efficiency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 sm:p-8 bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 hover:border-[#008df3]/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10, boxShadow: "0 20px 40px rgba(0, 141, 243, 0.2)" }}
              >
                <div className="mb-4 sm:mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white text-center">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 text-center leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="py-12 sm:py-16 lg:py-20 px-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="container mx-auto text-center">
          <motion.div className="bg-gradient-to-r from-[#008df3]/10 to-blue-600/10 rounded-2xl p-8 sm:p-10 lg:p-12 backdrop-blur-sm border border-[#008df3]/30" variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Get Started?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Join thousands of developers who have transformed their repositories with professional README documentation.
            </p>
            <motion.button
              onClick={() => router.push('/generate-readme')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#008df3] to-blue-600 hover:from-[#0066cc] hover:to-blue-700 text-white font-semibold text-base sm:text-lg rounded-lg shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 141, 243, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Your README Now
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
