import { login as loginApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success("Logged in successfully");
      queryClient.setQueriesData({ queryKey: ["user"], user: user.user });
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Invalid credentials");
    },
  });
  return { login, isLoading };
}

export default useLogin;
