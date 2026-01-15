/**
 * Get a single workspace by ID.
 *
 * @deprecated Use `useGetWorkspace` from `@/lib/backend` instead.
 * This wrapper maintains backward compatibility with the object-based API.
 *
 * @example
 * ```tsx
 * import { useGetWorkspace } from '@/lib/backend';
 * const { data, isLoading } = useGetWorkspace(workspaceId);
 * ```
 */
import { useGetWorkspace as useGetWorkspaceCanonical } from '@/lib/backend';
import type { Id } from '@/../convex/_generated/dataModel';

interface useGetWorkspaceProps {
  id: Id<'workspaces'>;
}

export const useGetWorkspace = ({ id }: useGetWorkspaceProps) => {
  return useGetWorkspaceCanonical(id);
};
