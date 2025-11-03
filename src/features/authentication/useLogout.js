import { logout as logoutApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to logout");
    },
  });
  return { logout, isLoading };
}
