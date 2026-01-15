/**
 * Update workspace name.
 *
 * @deprecated Use `useUpdateWorkspace` from `@/lib/backend` instead.
 * This wrapper maintains backward compatibility with the existing API.
 */
import { useUpdateWorkspace as useUpdateWorkspaceCanonical } from '@/lib/backend';
import type { Id } from '@/../convex/_generated/dataModel';

type RequestType = { id: Id<'workspaces'>; name: string };
type ResponseType = Id<'workspaces'> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useUpdateWorkspace = () => {
  const { mutate: updateWorkspace, isPending } = useUpdateWorkspaceCanonical();

  return {
    mutate: async (values: RequestType, options?: Options) => {
      try {
        await updateWorkspace(
          { id: values.id, name: values.name },
          {
            onSuccess: () => options?.onSuccess?.(values.id as ResponseType),
            onError: options?.onError,
            onSettled: options?.onSettled,
          }
        );
        return values.id as ResponseType;
      } catch (error) {
        if (options?.throwError !== false) throw error;
        return null;
      }
    },
    data: null as ResponseType,
    error: null as Error | null,
    isPending,
    isError: false,
    isSuccess: false,
    isSettled: !isPending,
  };
};
