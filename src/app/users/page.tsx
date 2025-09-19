'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { ErrorMessage } from '@/components/error-message'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Modal } from '@/components/modal'
import { PageTransition } from '@/components/page-transition'
import {
  StaggeredContainer,
  StaggeredItem,
} from '@/components/staggered-container'
import { useFetch } from '@/hooks/use-fetch'
import type { User } from '@/types'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users')

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
  }

  const closeModal = () => {
    setSelectedUser(null)
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">Users</h1>
          <p className="text-muted-foreground text-lg">
            Click on any user to view their detailed information
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {users && !loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>All Users ({users.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Company
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          City
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                          onClick={() => handleUserClick(user)}
                          className="border-b border-border cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-foreground">
                                {user.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                @{user.username}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {user.email}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {user.company.name}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {user.address.city}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <StaggeredContainer className="md:hidden space-y-4">
                  {users.map((user) => (
                    <StaggeredItem key={user.id}>
                      <motion.div
                        onClick={() => handleUserClick(user)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 border border-border/50 rounded-xl cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:shadow-md hover:border-primary/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">
                            {user.name}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            @{user.username}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>{user.email}</div>
                          <div>{user.company.name}</div>
                          <div>{user.address.city}</div>
                        </div>
                      </motion.div>
                    </StaggeredItem>
                  ))}
                </StaggeredContainer>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Modal
          isOpen={!!selectedUser}
          onClose={closeModal}
          title="User Details"
        >
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {selectedUser.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Username:</span>
                    <span className="ml-2 text-foreground">
                      @{selectedUser.username}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <span className="ml-2 text-foreground">
                      {selectedUser.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="ml-2 text-foreground">
                      {selectedUser.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Website:</span>
                    <span className="ml-2 text-foreground">
                      {selectedUser.website}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Address</h4>
                <div className="text-sm text-muted-foreground">
                  <div>
                    {selectedUser.address.street}, {selectedUser.address.suite}
                  </div>
                  <div>
                    {selectedUser.address.city}, {selectedUser.address.zipcode}
                  </div>
                  <div className="mt-2">
                    <span className="text-muted-foreground">Coordinates:</span>
                    <span className="ml-2">
                      {selectedUser.address.geo.lat},{' '}
                      {selectedUser.address.geo.lng}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Company</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <span className="ml-2 text-foreground">
                      {selectedUser.company.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Catchphrase:</span>
                    <span className="ml-2 text-foreground italic">
                      &quot;{selectedUser.company.catchPhrase}&quot;
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Business:</span>
                    <span className="ml-2 text-foreground">
                      {selectedUser.company.bs}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    window.open(`mailto:${selectedUser.email}`, '_blank')
                  }
                  className="btn-primary px-6 py-2"
                >
                  Send Email
                </motion.button>
              </div>
            </motion.div>
          )}
        </Modal>
      </div>
    </PageTransition>
  )
}
