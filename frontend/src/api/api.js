import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosClient } from './axiosClient.js'

export const filesAPI = createApi({
  reducerPath: 'filesAPI',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['File'],
  endpoints: builder => ({
    getFilesList: builder.query({
      queryFn: async () => {
        const { data, error } = await axiosClient.get('/files/list')

        if (error) {
          return { error }
        }

        return { data }
      },
    }),
    getFiles: builder.query({
      queryFn: async () => {
        const { data, error } = await axiosClient.get('/files/data')

        if (error) {
          return { error }
        }

        return data
      },
    }),
  }),
})

export const { useGetFilesQuery, useGetFilesListQuery } = filesAPI
