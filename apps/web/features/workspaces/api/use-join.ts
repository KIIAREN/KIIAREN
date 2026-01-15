/**
 * Join a workspace.
 *
 * @deprecated Use `useJoinWorkspace` from `@/lib/backend` instead.
 * This wrapper maintains backward compatibility with the existing API.
 */
import { useJoinWorkspace } from '@/lib/backend';
import type { Id } from '@/../convex/_generated/dataModel';

type RequestType = { workspaceId: Id<'workspaces'>; joinCode: string };
type ResponseType = Id<'workspaces'> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useJoin = () => {
  const { mutate: joinWorkspace, isPending } = useJoinWorkspace();

  return {
    mutate: async (values: RequestType, options?: Options) => {
      try {
        const response = await joinWorkspace(
          {
            workspaceId: values.workspaceId,
            joinCode: values.joinCode,
          },
          {
            onSuccess: (id) => options?.onSuccess?.(id as ResponseType),
            onError: options?.onError,
            onSettled: options?.onSettled,
          }
        );
        return response as ResponseType;
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
