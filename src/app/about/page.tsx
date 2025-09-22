'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Target, Award, Globe, Shield, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '500+', label: 'Families Helped' },
    { icon: Heart, value: '1,200+', label: 'Items Donated' },
    { icon: Globe, value: '25+', label: 'Communities' },
    { icon: Award, value: '98%', label: 'Satisfaction Rate' }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of kindness and helping those in need'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building stronger communities through meaningful connections'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Creating a safe and reliable platform for all community members'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Using technology to make generosity effortless and accessible'
    }
  ]

  const team = [
    {
      name: 'Deborah "Deb" Johnson',
      role: 'Founder & CEO',
      bio: 'Deborah founded DeBabs after seeing the need for a better way to connect community members through donations.',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'Sarah Chen',
      role: 'Community Manager',
      bio: 'Sarah ensures every donation reaches those who need it most and builds lasting community relationships.',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Technology Lead',
      bio: 'Marcus builds the technology that makes DeBabs seamless and accessible to everyone.',
      image: '/api/placeholder/200/200'
    }
  ]

  return (
    <div className="min-h-screen bg-primary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
            About DeBabs
          </h1>
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              We&apos;re on a mission to make generosity effortless by connecting communities 
              through meaningful donations and building stronger neighborhoods together.
            </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Our Mission
              </h2>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  DeBabs was born from a simple idea: what if we could make it easier 
                  for people to help each other? We believe that everyone has something 
                  to give, and everyone has something they need.
                </p>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  By creating a platform that connects donors with recipients in their 
                  local communities, we&apos;re not just facilitating transactions – we&apos;re 
                  building bridges between neighbors and strengthening the social fabric 
                  of our communities.
                </p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Target className="text-accent" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary">Our Goal</h3>
                  <p className="text-neutral-500">Make generosity effortless for everyone</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-accent/20 to-highlight/20 rounded-3xl flex items-center justify-center">
                <Heart className="text-accent" size={120} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="mb-20 py-16 bg-gradient-to-br from-accent/5 to-highlight/5 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Our Impact
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Numbers that show the real difference we're making in communities
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
                  <stat.icon className="text-accent" size={32} />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-500 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Our Values
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6">
                  <value.icon className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-4">
                  {value.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Meet Our Team
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              The passionate people behind DeBabs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-highlight/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="text-accent" size={48} />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {member.name}
                </h3>
                <div className="text-accent font-medium mb-4">
                  {member.role}
                </div>
                <p className="text-neutral-500 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center py-16 bg-gradient-to-br from-accent/10 to-highlight/10 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-secondary mb-6">
            Join Our Mission
          </h2>
            <p className="text-xl text-neutral-500 mb-8 max-w-2xl mx-auto">
              Be part of the movement that&apos;s making generosity effortless and 
              communities stronger, one donation at a time.
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/donate"
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Donating
            </motion.a>
            <motion.a
              href="/contact"
              className="btn-outline text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Involved
            </motion.a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
