
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

const ModernMobileNavMenu = ({ 
  isOpen, 
  onClose, 
  children, 
  className = "" 
}) => {
  // Animation variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Animation variants for the menu panel
  const menuVariants = {
    hidden: { 
      x: '100%',
      opacity: 0
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.4
      }
    },
    exit: { 
      x: '100%',
      opacity: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        duration: 0.3
      }
    }
  };

  // Animation variants for menu items
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: 20
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  // Animation variants for the close button
  const closeButtonVariants = {
    hidden: { 
      opacity: 0,
      rotate: -90,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        delay: 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden ${className}`}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                Menu
              </div>
              <motion.button
                variants={closeButtonVariants}
                initial="hidden"
                animate="visible"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col h-full">
              {/* Navigation Items */}
              <div className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
                {Array.isArray(children) ? 
                  children.map((child, index) => {
                    if (child.type === 'a' || (child.props && child.props.href)) {
                      return (
                        <motion.div
                          key={index}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          className="group"
                        >
                          <div 
                            className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                            onClick={() => {
                              if (child.props.onClick) child.props.onClick();
                              onClose();
                            }}
                          >
                            <span className="text-base font-medium text-gray-700 dark:text-gray-200 group-hover:text-[#008df3]">
                              {child.props.children?.props?.children || child.props.children}
                            </span>
                            <motion.div
                              className="text-gray-400 group-hover:text-[#008df3]"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    }
                    return null;
                  }).filter(Boolean)
                  :
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                  >
                    {children}
                  </motion.div>
                }
              </div>

              {/* Bottom Actions */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                {Array.isArray(children) && 
                  children.find(child => child.props?.className?.includes('flex w-full flex-col gap-4')) && (
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={children.length}
                      className="space-y-3"
                    >
                      {children.find(child => 
                        child.props?.className?.includes('flex w-full flex-col gap-4')
                      )}
                    </motion.div>
                  )
                }
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#008df3] to-blue-600" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModernMobileNavMenu;
