'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiExternalLink } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Resources',
      links: [
        { name: 'API Documentation', href: 'https://api.predictresistantibiotics.site/docs' },
        { name: 'Frontend Repository', href: 'https://github.com/david-dewanto/Kelompok8-WebsiteFE-Tubes' },
        { name: 'Backend Repository', href: 'https://github.com/david-dewanto/Kelompok8-WebsiteBE-Tubes' },
        { name: 'ML Model Repository', href: 'https://github.com/david-dewanto/Kelompok8-ModelMachineLearning-Tubes' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { name: 'About Antibiotic Resistance', href: '#educational-content' },
        { name: 'How It Works', href: '#educational-content' },
        { name: 'Clinical Applications', href: '#educational-content' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Disclaimer', href: '#' },
      ],
    },
  ]

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:contact@example.com', label: 'Email' },
  ]

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">AR</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                AR Predictor
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Advanced AI-powered antibiotic resistance prediction from epitope sequences.
              Helping healthcare professionals make informed treatment decisions.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="text-lg text-gray-600 dark:text-gray-400" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Links sections */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-gray-800 dark:text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-1"
                    >
                      {link.name}
                      {link.href.startsWith('http') && (
                        <FiExternalLink className="text-xs" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Antibiotic Resistance Predictor. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built with ❤️ using Next.js and AI
              </p>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-200 text-center">
              <strong>Medical Disclaimer:</strong> This tool is for research and educational purposes only.
              Results should not be used as the sole basis for clinical decisions.
              Always consult with healthcare professionals and conduct proper laboratory testing.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}