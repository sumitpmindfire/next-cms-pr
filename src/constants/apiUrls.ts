const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const BLOGS_LIST_API = `${API_URL}/blogs`;
export const GET_BLOG_DETAILS_API = (blogId: string) =>
  `${API_URL}/blogs/${blogId}`;

export const LOGIN_API = `${API_URL}/login`;
