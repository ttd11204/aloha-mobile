import { baseQueryWithErrorHandling } from '@/lib/baseApi'
import { createApi } from '@reduxjs/toolkit/query/react'

export interface AddFriendRequest {
  userId: string
  targetEmail: string
}

export interface AddFriendResponse {
  message: string
}

export interface RespondFriendRequest {
  userId: string
  requestId: string
  accepted: boolean
}

export interface RespondFriendResponse {
  message: string
}

export interface FriendRequest {
  id: string
  fromUser: {
    id: string
    userName: string
    email: string
    avatar?: string
  }
  toUser: {
    id: string
    userName: string
    email: string
    avatar?: string
  }
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export interface ChatMessage {
  id: string
  senderId: string
  receiverId: string
  message: string
  timestamp: string
  read: boolean
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Friend', 'FriendRequest', 'Chat'],
  endpoints: (builder) => ({
    // Add friend by email
    addFriend: builder.mutation<AddFriendResponse, AddFriendRequest>({
      query: (body) => ({
        url: 'User/friend-request',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Friend', 'FriendRequest']
    }),

    // Get friend requests (incoming)
    getFriendRequests: builder.query<FriendRequest[], string>({
      query: (userId) => `User/friendrequests/${userId}`,
      providesTags: ['FriendRequest']
    }),

    // Accept/Reject friend request
    respondToFriendRequest: builder.mutation<RespondFriendResponse, RespondFriendRequest>({
      query: (body) => ({
        url: 'User/respond-friend-request',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Friend', 'FriendRequest']
    }),

    // Get friends list
    getFriends: builder.query<any[], string>({
      query: (userId) => `User/friends/${userId}`,
      providesTags: ['Friend']
    }),

    // Get chat messages (mock endpoint - chưa có backend)
    getChatMessages: builder.query<ChatMessage[], { userId: string; friendId: string }>({
      query: ({ userId, friendId }) => `Chat/messages/${userId}/${friendId}`,
      providesTags: ['Chat']
    }),

    // Send message (mock endpoint - chưa có backend)
    sendMessage: builder.mutation<
      { success: boolean },
      { senderId: string; receiverId: string; message: string }
    >({
      query: ({ senderId, receiverId, message }) => ({
        url: 'Chat/send',
        method: 'POST',
        body: { senderId, receiverId, message }
      }),
      invalidatesTags: ['Chat']
    })
  })
})

export const {
  useAddFriendMutation,
  useGetFriendRequestsQuery,
  useRespondToFriendRequestMutation,
  useGetFriendsQuery,
  useGetChatMessagesQuery,
  useSendMessageMutation
} = chatApi 