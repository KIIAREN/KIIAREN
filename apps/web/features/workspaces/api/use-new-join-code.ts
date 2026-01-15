/**
 * Regenerate join code for a workspace.
 *
 * @deprecated Use `useRegenerateJoinCode` from `@/lib/backend` instead.
 * This wrapper maintains backward compatibility with the existing API.
 */
import { useRegenerateJoinCode } from '@/lib/backend';
import type { Id } from '@/../convex/_generated/dataModel';

type RequestType = { workspaceId: Id<'workspaces'> };
type ResponseType = Id<'workspaces'> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useNewJoinCode = () => {
  const { mutate: regenerateJoinCode, isPending } = useRegenerateJoinCode();

  return {
    mutate: async (values: RequestType, options?: Options) => {
      try {
        await regenerateJoinCode(
          { workspaceId: values.workspaceId },
          {
            onSuccess: () => options?.onSuccess?.(values.workspaceId as ResponseType),
            onError: options?.onError,
            onSettled: options?.onSettled,
          }
        );
        return values.workspaceId as ResponseType;
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
