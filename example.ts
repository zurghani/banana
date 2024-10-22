import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from './store'; // Adjust to your store location

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // Retrieve the base URL from the Redux state
  const baseUrl = (api.getState() as RootState).config.apiBaseUrl; // Adjust this to your store structure

  // Now create the baseQuery with the dynamic baseUrl
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  // Call the rawBaseQuery with the arguments provided
  return rawBaseQuery(args, api, extraOptions);
};