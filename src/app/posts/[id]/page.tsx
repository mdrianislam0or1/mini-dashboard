'use client'

import { Button } from '@/components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { ErrorMessage } from '@/components/error-message'
import { LoadingSpinner } from '@/components/loading-spinner'
import { useFetch } from '@/hooks/use-fetch'
import type { Post, User } from '@/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { use } from 'react'

interface PostPageProps {
  params: Promise<{ id: string }>
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params)

  const {
    data: post,
    loading: postLoading,
    error: postError,
    refetch: refetchPost,
  } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch<User>(
    post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : '',
    { immediate: !!post }
  )

  const loading = postLoading || userLoading
  const error = postError || userError

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <LoadingSpinner size="lg" className="py-12" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <ErrorMessage message={error} onRetry={refetchPost} />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Post not found
          </h1>
          <p className="text-muted-foreground mb-6">
            The post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/posts">
            <Button>Back to Posts</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/posts"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Posts
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                  {user && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>By</span>
                      <Link
                        href={`/users`}
                        className="font-medium text-primary hover:underline"
                      >
                        {user.name}
                      </Link>
                      <span>•</span>
                      <span>@{user.username}</span>
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Post #{post.id}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <p className="text-foreground leading-relaxed text-lg">
                  {post.body}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {user.name}
                    </h4>
                    <p className="text-muted-foreground mb-4">
                      {user.company.catchPhrase}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="text-foreground">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="text-foreground">{user.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Website:</span>
                        <span className="text-foreground">{user.website}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Company
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="text-foreground">
                          {user.company.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Business:</span>
                        <span className="text-foreground">
                          {user.company.bs}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
