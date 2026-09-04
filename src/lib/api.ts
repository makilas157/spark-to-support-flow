/**
 * Tevexxo public API client (NEW frontend / public website).
 *
 * The public website is a pure consumer of the Backend's PUBLIC read-only
 * endpoints (`/api/public/*`). MongoDB is the single source of truth:
 *   Admin Panel -> Backend API -> MongoDB -> these GET calls.
 *
 * The ONLY write the landing site may perform is the contact/inquiry form
 * (`POST /api/public/inquiries`).
 *
 * Never put admin tokens or secrets here — this module stays safe for browser
 * bundles.
 */

export const API_URL: string =
  (import.meta.env["VITE_API_URL"] as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:5000";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type ApiEnvelope<T> = { success: boolean; count?: number; data: T };

/** Fields shared by every entity built on buildEntitySchema() */
export type ApiEntity = {
  id: string;
  name: string;
  email?: string;
  category?: string;
  status?: string;
  detail?: string;
  amount?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiBlog = ApiEntity & { points?: string[]; image?: string };
export type ApiProject = ApiEntity & { submissions?: number; image?: string; body?: string; metric?: string; tag?: string };
export type ApiService = ApiEntity & { body?: string; points?: string[]; image?: string };
export type ApiProduct = ApiEntity & { body?: string; points?: string[]; image?: string; amount?: string };
export type ApiPublicSettings = {
  siteName: string;
  siteEmail: string;
  siteDescription: string;
  currency: string;
};

async function publicFetch<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/public${path}`, init);
  } catch {
    throw new ApiError(0, "Cannot reach the Tevexxo server.");
  }

  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON response */
  }

  if (!res.ok) {
    const message =
      (json as { message?: string } | null)?.message || `Request failed (${res.status})`;
    throw new ApiError(res.status, message);
  }

  return json as T;
}

async function listEntities<T>(path: string): Promise<T[]> {
  const json = await publicFetch<ApiEnvelope<T[]>>(path);
  return Array.isArray(json.data) ? json.data : [];
}

// ---------------------------------------------------------------------------
// Fetchers (read-only)
// ---------------------------------------------------------------------------

export function getServices(): Promise<ApiService[]> {
  return listEntities<ApiService>("/services");
}

export function getProducts(): Promise<ApiProduct[]> {
  return listEntities<ApiProduct>("/products");
}

export function getProductByIdOrSlug(idOrSlug: string): Promise<ApiProduct> {
  return publicFetch<ApiEnvelope<ApiProduct>>(`/products/${encodeURIComponent(idOrSlug)}`).then(
    (j) => j.data,
  );
}

export function getProjects(): Promise<ApiProject[]> {
  return listEntities<ApiProject>("/projects");
}

export function getProjectByIdOrSlug(idOrSlug: string): Promise<ApiProject> {
  return publicFetch<ApiEnvelope<ApiProject>>(`/projects/${encodeURIComponent(idOrSlug)}`).then(
    (j) => j.data,
  );
}

export function getBlogs(): Promise<ApiBlog[]> {
  return listEntities<ApiBlog>("/blogs");
}

export function getBlogById(id: string): Promise<ApiBlog> {
  return publicFetch<ApiEnvelope<ApiBlog>>(`/blogs/${encodeURIComponent(id)}`).then(
    (j) => j.data,
  );
}

export function getPublicSettings(): Promise<ApiPublicSettings> {
  return publicFetch<ApiEnvelope<ApiPublicSettings>>("/settings").then((j) => j.data);
}

// ---------------------------------------------------------------------------
// Public form submission (the ONLY write the landing site may perform)
// ---------------------------------------------------------------------------

export type InquiryInput = {
  name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
};

export async function createInquiry(input: InquiryInput): Promise<{ id: string }> {
  const json = await publicFetch<ApiEnvelope<{ id: string }>>("/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return json.data;
}

// ---------------------------------------------------------------------------
// Presentation helpers
// ---------------------------------------------------------------------------

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
