import { leetcodeQuery } from "@/lib/graphqlQuery";
import { CodeForceData } from "@/lib/type";

export async function GET(
  req: Request,
  context: { params: { username: string } }
) {
  const { username } = await context.params;

  let data: CodeForceData;

  try {
    const [ratingRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.rating?handle=${username}`),
      fetch(`https://codeforces.com/api/user.status?handle=${username}`),
    ]);

    if (!ratingRes.ok || !statusRes.ok) {
      throw new Error("Failed to fetch from CodeForce");
    }

    const ratingData = await ratingRes.json();
    const statusData = await statusRes.json();

    if (ratingData.status !== "OK" || statusData.status !== "OK") return null;

    const contests = ratingData.result.length;

    data = {
      username: username,
      lastActive: formatLastActive(statusData.lastOnlineTimeSeconds),
      rank: statusData.rank,
      maxRank: statusData.maxRank,
      rating: statusData.rating,
      maxRating: statusData.maxRating,
      contribution: statusData.contribution,
      contestAttended: contests,
      friend: statusData.friendOfCount,
    };
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

const formatLastActive = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
