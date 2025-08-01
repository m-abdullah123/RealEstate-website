import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactInfoItem from './InfoItem';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '+971507860233',
    link: 'tel:+971507860233',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'ilyasm67@gmail.com',
    link: 'mailto:ilyasm67@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Address',
    content: '210 Makiya Sharafi Building, Dubai, UAE',
    link: '#map',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Mon-Sat: 9 AM - 6 PM',
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-2xl shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-8">Our Office</h2>
      <div className="space-y-6">
        {contactInfo.map((info, index) => (
          <ContactInfoItem key={index} {...info} />
        ))}
      </div>
    </motion.div>
  );
}