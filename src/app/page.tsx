'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const stats = [
  { title: 'Total Posts', value: '1,234', change: '+12%', icon: '📝' },
  { title: 'Active Users', value: '856', change: '+8%', icon: '👥' },
  { title: 'Page Views', value: '45.2K', change: '+23%', icon: '👁️' },
  { title: 'Engagement', value: '92%', change: '+5%', icon: '📊' },
]

const recentActivity = [
  { action: 'New post published', time: '2 minutes ago', user: 'Rian Islam' },
  { action: 'User registered', time: '5 minutes ago', user: 'Jane Smith' },
  { action: 'Comment posted', time: '8 minutes ago', user: 'Mike Johnson' },
  { action: 'Post liked', time: '12 minutes ago', user: 'Sarah Wilson' },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gradient mb-2">
          {session ? `Welcome back, ${session.user?.name || 'User'}!` : 'Welcome to Your Dashboard'}
        </h1>
        <p className="text-muted-foreground text-lg">
          {session
            ? "Here's what's happening with your application today."
            : "Sign in to access your personalized dashboard and profile."
          }
        </p>
        {!session && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4"
          >
            <Link href="/auth/signin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-6 py-2"
              >
                Sign In with Google
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} delay={index * 0.1} hover>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-card-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    {stat.change} from last month
                  </p>
                </div>
                <motion.div
                  className="text-4xl"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                    delay: index * 0.5,
                  }}
                >
                  {stat.icon}
                </motion.div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card delay={0.4}>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'API Response Time', value: 85, color: 'bg-blue-500' },
                {
                  label: 'User Satisfaction',
                  value: 92,
                  color: 'bg-green-500',
                },
                { label: 'System Uptime', value: 99, color: 'bg-purple-500' },
                { label: 'Data Processing', value: 78, color: 'bg-orange-500' },
              ].map((metric, index) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="font-medium">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{
                        duration: 1.5,
                        delay: 0.5 + index * 0.2,
                        ease: 'easeOut',
                      }}
                      className={`h-3 rounded-full ${metric.color} shadow-sm`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card delay={0.5}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="gradient-primary/10 border-primary/30 shadow-glow">
          <CardContent>
            <div className="text-center py-8">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
                className="text-6xl mb-4"
              >
                🚀
              </motion.div>
              <h2 className="text-3xl font-bold text-gradient mb-3">
                Ready to Explore?
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Navigate to Posts or Users to see the full functionality in
                action.
              </p>
              <div className="flex justify-center space-x-4">
                <motion.a
                  href="/posts"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-3 text-lg"
                >
                  View Posts
                </motion.a>
                <motion.a
                  href="/users"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary px-8 py-3 text-lg"
                >
                  View Users
                </motion.a>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
