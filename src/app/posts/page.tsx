'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { ErrorMessage } from '@/components/error-message'
import { LoadingCard } from '@/components/loading-spinner'
import { PageTransition } from '@/components/page-transition'
import {
  StaggeredContainer,
  StaggeredItem,
} from '@/components/staggered-container'
import { useFetch } from '@/hooks/use-fetch'
import type { Post } from '@/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function PostsPage() {
  const [showError, setShowError] = useState(false)

  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts', {
    errorEndpoint: showError,
  })

  return (
    <PageTransition>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Posts</h1>
            <p className="text-muted-foreground text-lg">
              Explore all posts from our community
            </p>
          </div>
        </motion.div>

        {loading && (
          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <StaggeredItem key={index}>
                <LoadingCard />
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        )}

        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {posts && !loading && !error && (
          <StaggeredContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.05}
          >
            {posts.map((post) => (
              <StaggeredItem key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <Card hover className="h-full">
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-base">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {post.body}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Post #{post.id}</span>
                        <span>User {post.userId}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        )}

        {posts && posts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            >
              📝
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No posts found
            </h3>
            <p className="text-muted-foreground">
              There are no posts to display at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}
