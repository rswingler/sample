import {
  UpdateTwoDimensionChartFormatMutationHookResult,
  useUpdateTwoDimensionChartFormatMutation,
} from "~/graphql/Mutations/Chart/UpdateTwoDimensionChartFormat.mutation.generated";
import { useErrorToast } from "~/layout/hooks/hooks";
import { ToastService } from "~/layout/services/toast-service";
import {
  TwoDimensionChartFormat,
  TwoDimensionChartFormatUpdate,
} from "../../../../../types";

export interface UseUpdateChartFormatResult {
  updateChartFormat: (
    chartFormat: TwoDimensionChartFormat,
    update: TwoDimensionChartFormatUpdate,
    errorDescription: string
  ) => void;
  chartFormatIsLoading: boolean;
}

/**
 * Chart format update hook
 */
export function useUpdateChartFormat(): UseUpdateChartFormatResult {
  const [
    updateChartFormat,
    { loading: chartFormatIsLoading, error: chartFormatError },
  ]: UpdateTwoDimensionChartFormatMutationHookResult =
    useUpdateTwoDimensionChartFormatMutation();

  useErrorToast(chartFormatError);

  // Pass back properties that would be nullified if omitted
  const safeFormatUpdate = async (
    chartFormat: TwoDimensionChartFormat,
    update: TwoDimensionChartFormatUpdate,
    errorDescription: string
  ): Promise<void> => {
    try {
      await updateChartFormat({
        variables: {
          update: {
            leftAxisScale: chartFormat.leftAxisScale,
            rightAxisScale: chartFormat.rightAxisScale,
            leftAxisMinimum: chartFormat.leftAxisMinimum,
            leftAxisMaximum: chartFormat.leftAxisMaximum,
            rightAxisMinimum: chartFormat.rightAxisMinimum,
            rightAxisMaximum: chartFormat.rightAxisMaximum,
            ...update,
          },
        },
      });
    } catch (error) {
      ToastService.error(errorDescription, error.message);
    }
  };

  return {
    updateChartFormat: safeFormatUpdate,
    chartFormatIsLoading,
  };
}
