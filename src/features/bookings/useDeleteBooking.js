import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking  } from "../../services/apiBookings";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: Delete } = useMutation({
        mutationFn: ({ bookingId }) => deleteBooking(bookingId),
        onSuccess: (data) => {
            toast.success(`Booking #${data?.id} successfully deleted`);
            queryClient.invalidateQueries({queryKey: ["bookings"] });
        },
        onError: () => toast.error("There was an error deleting the booking"),
    });
    return { Delete, isDeleting };
}
