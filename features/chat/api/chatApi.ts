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
  requestId: string
  fromUserId: string
  fromUserEmail: string
  fromUserFullname?: string
  fromUserAvatarUrl?: string
  requestedAt: string
}

export interface Friend {
  friendUserId: string
  friendEmail: string
  friendFullname?: string
  friendAvatarUrl?: string
  friendsSince: string
}

export interface ChatRoom {
  Id: string
  Name: string
  IsGroup: boolean
  CreatedAt: string
}

export interface CreateChatRoomRequest {
  userId: string
  targetUserId: string
}

export interface SendMessageRequest {
  userId: string
  chatRoomId: string
  content: string
  messageType: string
}

export interface SendMessageResponse {
  id: string
  senderId: string
  senderFullname: string | null
  senderAvatarUrl: string
  content: string
  sentAt: string
  isRead: boolean
  messageType: string
}

export interface ChatMessage {
  id: string
  senderId: string
  senderFullname: string | null
  senderAvatarUrl: string
  content: string
  sentAt: string
  isRead: boolean
  messageType: string
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

    // Get incoming friend requests
    getFriendRequests: builder.query<FriendRequest[], string>({
      query: (userId) => `User/incoming-friend-requests?userId=${userId}`,
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
    getFriends: builder.query<Friend[], string>({
      query: (userId) => `User/friends?userId=${userId}`,
      providesTags: ['Friend']
    }),

    // Create chat room for 1-1 conversation
    createChatRoom: builder.mutation<ChatRoom, CreateChatRoomRequest>({
      query: (body) => ({
        url: 'chat/room',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      invalidatesTags: ['Chat']
    }),

    // Get user's chat rooms - TEMPORARILY COMMENTED OUT
    getChatRooms: builder.query<ChatRoom[], string>({
      query: (userId) => {
        // Temporarily comment out the API call
        // return `Chat/rooms?UserId=${userId}`
        throw new Error('Chat rooms API temporarily disabled')
      },
      providesTags: ['Chat']
    }),

    // Send message to chat room
    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: (body) => ({
        url: 'Chat/messages',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      invalidatesTags: ['Chat']
    }),

    // Get chat messages with pagination
    getChatMessages: builder.query<ChatMessage[], { page?: number; pageSize?: number; chatRoomId?: string }>({
      query: ({ page = 1, pageSize = 30, chatRoomId }) => {
        if (!chatRoomId) {
          throw new Error('chatRoomId is required')
        }
        return `Chat/messages?chatRoomId=${chatRoomId}&page=${page}&pageSize=${pageSize}`
      },
      providesTags: ['Chat']
    })
  })
})

export const {
  useAddFriendMutation,
  useGetFriendRequestsQuery,
  useRespondToFriendRequestMutation,
  useGetFriendsQuery,
  useCreateChatRoomMutation,
  useGetChatRoomsQuery,
  useGetChatMessagesQuery,
  useSendMessageMutation
} = chatApi 