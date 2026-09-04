import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInquiry,
  getBlogs,
  getProducts,
  getProjects,
  getServices,
  type InquiryInput,
} from "@/lib/api";

/**
 * React Query hooks for CMS-managed content (NEW public website).
 *
 * The QueryClient is created per app start (see src/router.tsx) with
 * staleTime 0, so every page mount refetches from Backend -> MongoDB.
 * No permanent caching, no polling, no WebSockets on the public site.
 */

export function useServices() {
  return useQuery({ queryKey: ["public", "services"], queryFn: getServices });
}

export function useProducts() {
  return useQuery({ queryKey: ["public", "products"], queryFn: getProducts });
}

export function useProjects() {
  return useQuery({ queryKey: ["public", "projects"], queryFn: getProjects });
}

export function useBlogs() {
  return useQuery({ queryKey: ["public", "blogs"], queryFn: getBlogs });
}

/** Submits the contact / demo form to the Backend (-> MongoDB -> Admin Inquiries). */
export function useCreateInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: InquiryInput) => createInquiry(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["public"] });
    },
  });
}
