import { githubClientId, githubClientSecret } from "../config/env.js";

type GithubProfileData = {
  id: number;
  name: string;
};

export async function getProfileData(code: string): Promise<GithubProfileData | null> {
  // confirm that the code is valid, exchange for access token
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: githubClientId,
      client_secret: githubClientSecret,
      code,
    }),
  });

  const data = await response.json();
  if (!data.access_token) {
    return null;
  }

  // get user's profile data from the API
  const profileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${data.access_token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const profileData = await profileResponse.json();
  if (!profileData.id || !profileData.name) {
    return null;
  }

  return {
    id: profileData.id,
    name: profileData.name,
  };
}
