'use client'

import { useEffect, useState } from 'react'

interface UseFetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseFetchOptions {
  immediate?: boolean
  errorEndpoint?: boolean
}

export function useFetch<T>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchState<T> & { refetch: () => void } {
  const { immediate = true, errorEndpoint = false } = options
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const fetchUrl = errorEndpoint
        ? url.replace('/posts', '/invalid-posts')
        : url

      const response = await fetch(fetchUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      })
    }
  }

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [url, immediate, errorEndpoint])

  return {
    ...state,
    refetch: fetchData,
  }
}
