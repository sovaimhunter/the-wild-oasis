import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../utils/constants";
function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  // const {
  //   isLoading,
  //   data: { bookings, count },
  //   error,
  // } = useQuery({
  //   queryKey: ["bookings", filter, sortBy],
  //   queryFn: () => getBookings({ filter, sortBy }),
  // });

  // return { bookings, isLoading, error, count };

  // Query
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  const bookings = data?.data || [];
  const count = data?.count || 0;

  // Pre-Fetching

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount){
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1){
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }
  


  return { bookings, isLoading, error, count };
  
}


export default useBookings;
