import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminOrdersList = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrdersList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  return useQuery({
    queryKey: ["orders", { userId: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
