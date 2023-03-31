import { createEffect, createSignal } from "solid-js";
import { Buffer } from 'buffer';
import { encode } from "querystring";

export type Post = {
  id: string;
  authorName: string;
  createdAtUTC: number;
  subreddit: string;
  score: number;
  title: string;
  ups: number;
  downs:number;
  url: string;
};

type RedditCredentials = {
  username: string,
  password: string,
  appId: string,
  appSecret: string,
};

type RedditApi = {
  get: (subreddit: string, url: string, data: Record<string, any>) => Promise<any>;
  isReady: () => boolean;
};

const useRedditApi = (redditCredentials: RedditCredentials): RedditApi => {
  const { appId, appSecret, password, username } = redditCredentials;
  const [token, setToken] = createSignal<string | undefined>(undefined);
  const [tokenExpireDate, setTokenExpireDate] = createSignal<string | undefined>(undefined);
  const [latestAfter, setLatestAfter] = createSignal<Record<string, string> | undefined>(undefined);

  const authHeader = () => `Basic ${Buffer.from(`${appId}:${appSecret}`).toString('base64')}`;

  createEffect(() => {
    const body = new FormData();
    body.append('grant_type', 'password');
    body.append('username', username);
    body.append('password', password);

    fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': authHeader(),
      },
      body,
    }).then(async response => {
      if (response.status !== 200) {
        console.error('AAAAA it failed to get token');
        return;
      }

      const {
        access_token: accessToken,
        expires_in: expiresIn,
        token_type: tokenType
      } = await response.json()

      setToken(`${tokenType} ${accessToken}`);
      // Shorten token expiration time by half to avoid race condition where
      // token is valid at request time, but server will reject it
      setTokenExpireDate(((Date.now() / 1000) + expiresIn) / 2);
    });
  });

  const getLatestAfter = (subredditName: string) => {
    console.log(subredditName, latestAfter());
    return !!latestAfter() ? latestAfter()![subredditName] : undefined;
  };

  const get = async (subreddit: string, url: string, data: Record<string, string>) => {

    if (!token()) {
      console.log('token not yet valid, skipping get request');
      return;
    }

    const requestData = {
      ...data,
      after: getLatestAfter(subreddit) ?? '',
      raw_json: 1,
    };

    const baseUrl = 'https://oauth.reddit.com';
    const queryString = encode(requestData);
    const urlWithQueryString = `${baseUrl}${url}?${queryString}`;

    const response = await fetch(urlWithQueryString, {
      method: 'GET',
      headers: {
        'Authorization': token()!,
      },
    });

    if (response.status !== 200) {
      console.error('AAAAA it failed to get reddit stuff');
      return;
    }

    const json = await response.json();
    setLatestAfter(prev => ({
      ...prev,
      [subreddit]: json.data.after,
    }));

    const responseJson = json.data.children as Array<any>;

    // filter by post type
    const onlyImages = post => 
      post.kind === 't3' &&
      post.data.post_hint === 'image' &&
      post.data.is_video === false;

    const onlySFW = post =>
      post.data.over_18 === false &&
      post.data.thumbnail !== 'nsfw';

    const linkPosts = responseJson.filter(onlyImages).filter(onlySFW);

    const posts: Post = linkPosts.map(post => {
      const postData = post.data;

      return {
        id: `${postData.subreddit}_${postData.id}`,
        authorName: postData.author,
        createdAtUTC: postData.created_utc,
        downs: postData.downs,
        subreddit: postData.subreddit,
        score: postData.score,
        title: postData.title,
        ups: postData.ups,
        url: postData.url,
      };
    })

    return posts;
  };

  return {
    get,
    isReady: () => token() !== undefined,
  }
};

export default useRedditApi;
