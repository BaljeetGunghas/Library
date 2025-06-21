import { contactData } from '@/Data/data';
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaInstagram
} from 'react-icons/fa';

const FixedFooterIcons = () => {
  const iconLinks = [
    {
      href: `tel:${contactData.phone}`,
      icon: <FaPhone />,
      label: 'Phone',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      href: `mailto:${contactData.email}`,
      icon: <FaEnvelope />,
      label: 'Email',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      href: contactData.linkdin,
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      color: 'bg-[#0077b5] hover:bg-[#0a66c2]'
    },
    {
      href: contactData.github,
      icon: <FaGithub />,
      label: 'GitHub',
      color: 'bg-gray-800 hover:bg-gray-700'
    },
    {
      href: contactData.instagram,
      icon: <FaInstagram />,
      label: 'Instagram',
      color: 'bg-gradient-to-br from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600'
    }
  ];

  return (
    <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[80%] max-w-5xl bg-black/30 backdrop-blur-md rounded-full shadow-xl px-6 py-3 flex items-center justify-center gap-6 z-50">
      {iconLinks.map(({ href, icon, label, color }, idx) => (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-white text-lg md:text-xl transition-all duration-300 ${color}`}
        >
          {icon}
        </a>
      ))}
    </footer>
  );
};

export default FixedFooterIcons;
