"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';

const ReadmeGenerator = () => {
  const [repoURL, setRepoURL] = useState('');
  const [readme, setReadme] = useState('');
  const [editedReadme, setEditedReadme] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('generator');

  const handleGenerate = async () => {
    if (!repoURL.trim()) {
      alert('Please enter a valid GitHub repository URL');
      return;
    }

    setLoading(true);
    try {
      const urlParts = repoURL.replace('https://github.com/', '').split('/');
      const [owner, repo] = urlParts;
      
      if (!owner || !repo) {
        throw new Error('Invalid GitHub URL format');
      }

      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!repoRes.ok) {
        throw new Error('Repository not found');
      }
      
      const repoData = await repoRes.json();
      
      const generatedReadme = generateMockReadme(repoData);
      setReadme(generatedReadme);
      setEditedReadme(generatedReadme);
      setActiveTab('editor');
      
    } catch (error) {
      alert(error.message || 'Failed to generate README');
    } finally {
      setLoading(false);
    }
  };

  const generateMockReadme = (repoData) => {
    return `# ${repoData.name}

${repoData.description || 'A modern web application'}

## 🚀 Features

- Modern and responsive design
- Built with cutting-edge technologies
- Easy to use and customize
- Comprehensive documentation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🛠️ Installation

\`\`\`bash
# Clone the repository
git clone ${repoData.clone_url}

# Navigate to the project directory
cd ${repoData.name}

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

## 🎯 Usage

Describe how to use your application here.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ${repoData.license?.name || 'MIT'} License.

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ by ${repoData.owner.login}**
`;
  };

  const downloadReadme = () => {
    const element = document.createElement('a');
    const file = new Blob([editedReadme], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-br from-black to-gray-900">
      <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center gap-2 mb-4">
            <svg className="w-8 h-8 text-[#008df3]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#008df3] to-blue-400 bg-clip-text text-transparent">README Generator</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your GitHub repositories into professional documentation with AI-powered README generation
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#008df3]/20 text-[#008df3] border border-[#008df3]/30">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"/></svg>
              AI Powered
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
              Instant Generation
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0-1.125.504 1.125 1.125V11.25a9 9 0 0 0-9-9z"/></svg>
              Markdown Editor
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="max-w-6xl mx-auto">
            <div className="flex mb-8 bg-gray-800 rounded-lg p-1 border border-gray-700">
              <button
                onClick={() => setActiveTab('generator')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'generator' 
                    ? 'bg-[#008df3] text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Generate
              </button>
              <button
                onClick={() => setActiveTab('editor')}
                disabled={!readme}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'editor' && readme
                    ? 'bg-[#008df3] text-white' 
                    : 'text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit & Preview
              </button>
            </div>

            {activeTab === 'generator' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 p-8"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Enter Your GitHub Repository</h2>
                </div>
                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="https://github.com/username/repository"
                      value={repoURL}
                      onChange={(e) => setRepoURL(e.target.value)}
                      className="w-full text-base py-3 pl-10 pr-4 border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-[#008df3] transition-colors rounded-lg outline-none"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  
                  <motion.button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full text-base py-3 bg-gradient-to-r from-[#008df3] to-blue-600 hover:from-[#0066cc] hover:to-blue-700 text-white rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Generating README...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="generate"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"/>
                          </svg>
                          Generate README
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === 'editor' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Edit Your README</h2>
                  <motion.button
                    onClick={downloadReadme}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-colors text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download README.md
                  </motion.button>
                </div>

                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
                  <div data-color-mode="dark">
                    <MDEditor
                      value={editedReadme}
                      onChange={(val) => setEditedReadme(val || '')}
                      height={600}
                      preview="edit"
                      hideToolbar={false}
                      visibleDragbar={false}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-300">
                    ✨ Edit your README using Markdown syntax and download when ready!
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          variants={itemVariants}
        >
          <h3 className="text-3xl font-bold text-white mb-8">Why Choose Our Generator?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-[#008df3]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                  </svg>
                ),
                title: "Instant Generation",
                description: "Generate professional READMEs in seconds"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                ),
                title: "Live Editor",
                description: "Edit and preview your README in real-time"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Easy Download",
                description: "Download your README.md file instantly"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-white">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ReadmeGenerator;