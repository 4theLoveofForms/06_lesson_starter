import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("uuid", 12345);
      return headers;
    },
  }),
  tagTypes: ["Todos", "bubbles"],
  endpoints: (builder) => ({
    getChildBubbles: builder.query({
      query: (args) =>
        `/topics/1/bubbles?parent_id=${args.parent_id}&workflow_state=${args.workflow_state}`,

      // transformResponse: (res) => res.body.bubbles.sort((a, b) => b.id - a.id),
      // providesTags: ["Todos"],
      // providesTags: (args) => [{ type: "bubbles", parent_id: args.parent_id }],
      providesTags: (args) => [{ type: "bubbles", parent_id: args.parent_id }],
    }),
    transformBubble: builder.mutation({
      query: (args) => ({
        url: `bubbles/${args.bubble.id}/transitions?transition=${args.transition}`,
        method: "PATCH",
      }),
      // invalidatesTags: ["Todos"],
      invalidatesTags: (result, error, args) => [
        { type: "bubbles", parent_id: args.bubble.parent_id },
      ],
    }),
    createDraftBubble: builder.mutation({
      query: (args) => ({
        url: `topics/1/bubbles/${args.parent_id}/create_draft`,
        method: "POST",
        body: { content: args.content },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "bubbles", parent_id: args.parent_id },
      ],
    }),
    // getTodos: builder.query({
    //   query: () => "/todos",
    //   transformResponse: (res) => res.sort((a, b) => b.id - a.id),
    //   providesTags: ["Todos"],
    // }),
    // addTodo: builder.mutation({
    //   query: (todo) => ({
    //     url: "todos",
    //     method: "POST",
    //     body: todo,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
    // updateTodo: builder.mutation({
    //   query: (todo) => ({
    //     url: `todos/${todo.id}`,
    //     method: "PATCH",
    //     body: todo,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
    // deleteTodo: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `todos/${id}`,
    //     method: "DELETE",
    //     body: id,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
  }),
});

export const {
  useGetChildBubblesQuery,
  useTransformBubbleMutation,
  useCreateDraftBubbleMutation,
  // useGetTodosQuery,
  // useAddTodoMutation,
  // useUpdateTodoMutation,
  // useDeleteTodoMutation,
} = apiSlice;
