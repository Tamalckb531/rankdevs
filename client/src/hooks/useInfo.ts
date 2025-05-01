import { User } from "@/lib/type";
import useUserStore from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

type InfoPayload = {
  portfolio?: string;
  email?: string;
  twitterUsername?: string;
  peerlistLink?: string;
  leetcodeLink?: string;
  codeforcesLink?: string;
  linkedIn?: string;
};

const useInfo = () => {
  const setUser = useUserStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: async (infoPayload: InfoPayload) => {
      const res = await fetch(`${backendUrl}/api/dashboard/info`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(infoPayload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Update failed");
      }

      const data = await res.json();

      const newUser: User = {
        id: data.id,
        apiKey: data.apiKey,
        portfolio: data.portfolio,
        githubUserName: data.githubUserName,
        email: data.email,
        twitterUsername: data.twitterUsername,
        linkedIn: data.linkedIn,
        peerlistLink: data.peerlistLink,
        leetcodeLink: data.leetcodeLink,
        codeforcesLink: data.codeforcesLink,
      };

      setUser(newUser);
      return newUser;
    },
  });

  return mutation;
};

export default useInfo;
